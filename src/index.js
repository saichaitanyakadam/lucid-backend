import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { connect } from "./db/index.js";
// import {
//   ListHostedZonesCommand,
//   ListResourceRecordSetsCommand,
//   Route53Client,
// } from "@aws-sdk/client-route-53";

connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server running on localhost:${process.env.PORT}`);
  });
});

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: AWS.config.region,
// });

// const getdata = async () => {
//   // const params = new ListResourceRecordSetsCommand({
//   //   HostedZoneId: "Z08637402WICTO08HBTOW",
//   // });
//   // console.log(params);
//   // const data = await route53.send(params);
//   const params = new ListHostedZonesCommand({});
//   const data = await route53.send(params);
//   console.log(data);
// };
// getdata();
