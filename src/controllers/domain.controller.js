import {
  Route53Client,
  ListResourceRecordSetsCommand,
  ChangeResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";

const getDomain = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const route53 = new Route53Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const command = new ListResourceRecordSetsCommand({
      HostedZoneId: hostedZoneId,
    });
    const data = await route53.send(command);
    res.status(200).json({
      resourceRecordSets: data.ResourceRecordSets,
    });
  } catch (error) {
    console.log(error);
  }
};

const changeResourceRecords = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const { type, recordName, recordType, recordValue, ttl = 300 } = req.body;
    console.log(recordName, recordType);
    const route53 = new Route53Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const params = {
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: type,
            ResourceRecordSet: {
              Name: recordName,
              Type: recordType,
              TTL: Number(ttl),
              ResourceRecords: [{ Value: recordValue }],
            },
          },
        ],
      },
    };
    const command = new ChangeResourceRecordSetsCommand(params);
    const data = await route53.send(command);
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.json({ message: error.message.slice(1, -1) }).status(400);
  }
};

export { getDomain, changeResourceRecords };
