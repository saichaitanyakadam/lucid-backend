import { Router } from "express";
import {
  changeResourceRecords,
  getDomain,
} from "../controllers/domain.controller.js";

const router = Router();

router.route("/:hostedZoneId").get(getDomain);
router.route("/action/:hostedZoneId").post(changeResourceRecords);

export default router;
