import {
  ListHostedZonesCommand,
  Route53Client,
  CreateHostedZoneCommand,
  DeleteHostedZoneCommand,
} from "@aws-sdk/client-route-53";

const getHostedZones = async (req, res) => {
  try {
    const route53 = new Route53Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const command = new ListHostedZonesCommand({});
    const data = await route53.send(command);
    res.status(200).json({
      hostedZones: data.HostedZones,
    });
  } catch (error) {
    console.log(error);
  }
};

const addHostedZone = async (req, res) => {
  try {
    const { name, comment = "", privateZone = false } = req.body;

    const route53 = new Route53Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const options = {
      Name: name,
      CallerReference: `${Date.now()}`,
      HostedZoneConfig: {
        Comment: comment,
        PrivateZone: privateZone,
      },
    };
    const command = new CreateHostedZoneCommand(options);
    const data = await route53.send(command);
    if (data)
      res.status(201).json({ message: "HostedZone Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const deleteHostedZone = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const route53 = new Route53Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const command = new DeleteHostedZoneCommand({ Id: hostedZoneId });
    const data = await route53.send(command);
    res.status(200).json({
      message: "HostedZone Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { getHostedZones, addHostedZone, deleteHostedZone };
