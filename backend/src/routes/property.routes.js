import { Router } from "express";
import {
  addProperties,
  deleteSingleProperties,
  getAgentProperties,
  getBuyProperties,
  getProperties,
  getRentProperties,
  getSearchProperties,
  getSingleProperties,
} from "../controllers/property.controllers.js";
import { verifyAgentJWT } from "../middlewares/agent.auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router
  .route("/add-properties")
  .post(verifyAgentJWT, upload.array("propertyImages"), addProperties);

router.route("/get-properties").get(getProperties);
router.route("/get-buy-properties").get(getBuyProperties);
router.route("/get-rent-properties").get(getRentProperties);
router.route("/get-search-properties").get(getSearchProperties);
router.route("/get-agentProperties").get(verifyAgentJWT, getAgentProperties);
router.route("/get-singleProperty/:id").get(getSingleProperties);
router
  .route("/delete-singleProperty/:id")
  .delete(verifyAgentJWT, deleteSingleProperties);


export default router;
