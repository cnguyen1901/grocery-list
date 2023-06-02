# Simple Grocery List App

This app explores the following tech stack: Next.js, tRPC, Prisma and Tailwind CSS

![image](https://res.cloudinary.com/dj5iihhqv/image/upload/v1654636896/Kapture_2022-06-07_at_22.19.07-min_vsi8p5.gif)

This project follows this tutorial to set up Cloud SQL with a private IP and Cloud Run. [learn more](https://codelabs.developers.google.com/connecting-to-private-cloudsql-from-cloud-run#0)

A github actions pipeline has been included to deploy the app to GCP.

Below secrets need to be set in github for the pipeline to be fully functional.

```
CLOUD_RUN_PROJECT_NAME: the project id
SERVERLESS_VPC_CONNECTOR: the name of the vpc connector
DB_URL: postgresql://<username>:<password>@localhost/<db_name>?host=/cloudsql/<instance-connection-name>
CLOUDSQL_INSTANCE_ID
```