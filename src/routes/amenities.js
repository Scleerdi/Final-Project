import express from "express";
import createAmenity from "../services/amenities/getAmenities";
import deleteAmenity from "../services/amenities/getAmenities";
import getAmenities from "../services/amenities/createAmenity";
import getAmenityById from "../services/amenities/getAmenityById";
import updateAmenityById from "../services/amenities/updateAmenityById";
import authMiddleware from "../middleware/advancedAuth.js";

export const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { name } = req.query;
    const amenities = getAmenities(name);
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error getting Amenities`);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.param;
    const amenity = getAmenityById(id);

    if (!amenity) {
      res.status(404).send(`Amenity ${id} not found`);
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Amenity not found by Id`);
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedAmenity = updateAmenityById(id, name);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Amenity failed to update by Id`);
  }
});

router.post("/", authMiddleware, (req, res) => {
  const { id, name } = req.body;
  const newAmenity = createAmenity(id, name);
  res.status(201).json(newAmenity);
});

router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const deleteAmenityId = deleteAmenity(id);

  if (!deleteAmenityId) {
    res.status(404).send(`Amenity ${id} not found`);
  } else {
    res.status(200).json({
      message: `Amenity with id ${deletedAmenityId} was deleted!`,
    });
  }
});
