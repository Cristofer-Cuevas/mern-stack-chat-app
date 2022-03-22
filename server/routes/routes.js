import express from "express";
import controllers from "../controllers/controllers.js";
import passport from "passport";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-route" }), controllers.validationGet);

router.get("/failure-route", controllers.failureRouteGet);

router.post("/", controllers.loginPost);

router.post("/sign-up", controllers.signupPost);

router.get("/chat/contacts", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-route" }), controllers.getContacts);

router.get("/chat/messages/:recipient/:days", passport.authenticate("jwt", { session: false }), controllers.getMessages);

export default router;
