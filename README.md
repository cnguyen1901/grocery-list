# Simple Grocery List App

This app explores the following tech stack: Next.js, tRPC, Prisma and Tailwind CSS

![image](https://res.cloudinary.com/dj5iihhqv/image/upload/v1654636896/Kapture_2022-06-07_at_22.19.07-min_vsi8p5.gif)

This project follows this tutorial to set up Cloud SQL with a private IP and Cloud Run. [learn more](https://codelabs.developers.google.com/connecting-to-private-cloudsql-from-cloud-run#0)

A github actions pipeline has been included to deploy the app to GCP.

## Setup
1.
```
gcloud services enable \
    sqladmin.googleapis.com \
    run.googleapis.com \
    vpcaccess.googleapis.com \
    servicenetworking.googleapis.com
```

2.
```
export PROJECT_ID=$(gcloud config get-value project)
export SERVERLESS_VPC_CONNECTOR=grocery-list-connector
export DB_INSTANCE_NAME=grocery-list
export DB_INSTANCE_PASSWORD=password123
export DB_DATABASE=mydb
export DB_USER=postgres
export DB_PASSWORD=password123
export REGION=us-central1
```

3.
```
gcloud compute addresses create google-managed-services-default \
    --global \
    --purpose=VPC_PEERING \
    --prefix-length=20 \
    --network=projects/$PROJECT_ID/global/networks/default
```

4.
```
gcloud services vpc-peerings connect \
    --service=servicenetworking.googleapis.com \
    --ranges=google-managed-services-default \
    --network=default \
    --project=$PROJECT_ID
```

5.
```
gcloud sql instances create $DB_INSTANCE_NAME \
    --project=$PROJECT_ID \
    --network=projects/$PROJECT_ID/global/networks/default \
    --no-assign-ip \
    --database-version=POSTGRES_12 \
    --cpu=2 \
    --memory=4GB \
    --region=$REGION \
    --root-password=${DB_INSTANCE_PASSWORD}
```

6.
```
gcloud sql databases create $DB_DATABASE --instance=$DB_INSTANCE_NAME
```

7.
```
gcloud sql users create ${DB_USER} \
    --password=$DB_PASSWORD \
    --instance=$DB_INSTANCE_NAME
```

8.
```
gcloud compute networks vpc-access connectors create ${SERVERLESS_VPC_CONNECTOR} \
    --region=${REGION} \
    --range=10.8.0.0/28
```


Below secrets need to be set in github for the pipeline to be fully functional.

```
CLOUD_RUN_PROJECT_NAME: the project id
SERVERLESS_VPC_CONNECTOR: the name of the vpc connector
DB_URL: postgresql://<username>:<password>@localhost/<db_name>?host=/cloudsql/<instance-connection-name>
CLOUDSQL_INSTANCE_ID
```
## TODO
- figure out how to run npx prisma deploy with Docker non-root user. Right now if we try running it using
non-root user, we'd get hit by the following error
```
[Your cache folder contains root-owned files, due to a bug in previous versions of npm which has since been addressed sudo chown -R 1001:65533 "/home/.npm"]
```