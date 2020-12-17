import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/", (req, res) => {
	res.render("sign-up", { layout: "sign-up-layout" });
});
