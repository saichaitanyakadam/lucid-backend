import { Router } from "express";
import {
  addHostedZone,
  deleteHostedZone,
  getHostedZones,
} from "../controllers/dns.controller.js";
const router = Router();

router.route("/get").get(getHostedZones);
router.route("/add").post(addHostedZone);
router.route("/:hostedZoneId").delete(deleteHostedZone);
export default router;
