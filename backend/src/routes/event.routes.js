import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller.js";
import upload from "../utils/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createEvent").post(verifyJWT,upload.fields([
    { name: "eventImage", maxCount: 1 }, 
  ]),createEvent);

router.route("/getAllEvents").get(verifyJWT,getAllEvents);
router.route("/getEvent/:id").get(verifyJWT,getEventById);
router.route("/updateEvent/:id").put(verifyJWT,updateEvent);
router.route("/:id").delete(verifyJWT,deleteEvent);

export default router;