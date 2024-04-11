import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";
import authMiddleware from "../middleware/advancedAuth.js";

export const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { aboutMe } = req.query;
    const hosts = getHosts(aboutMe);
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting hosts");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const host = getHostById(id);

    if (!host) {
      res.status(404).send(`Host ${id} not found`);
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Host not found by Id");
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const updatedHost = updateHostById(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(200).json(updatedHost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Host failed to update by Id");
  }
});

router.post("/", authMiddleware, (req, res) => {
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;
  const newHost = createHost(
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe
  );
  res.status(201).json(newHost);
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedHost = deleteHost(id);

    if (!deletedHost) {
      res.status(404).send(`Host ${id} not found`);
    } else {
      res.status(200).json({
        message: `Host with id ${deletedHost} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Deleting Host ${id} failed`);
  }
});
