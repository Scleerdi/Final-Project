import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import authMiddleware from "../middleware/advancedAuth.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { name } = req.query;
    const amenities = getAmenities(name);
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting list of amenities!");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const amenity = getAmenityById(id);

    if (!amenity) {
      res.status(404).send(`Amenity with id ${id} was not found!`);
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting amenity by id!");
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
    res.status(500).send("Something went wrong while updating amenity by id!");
  }
});

router.post("/", authMiddleware, (req, res) => {
  const { id, name } = req.body;
  const newAmenity = createAmenity(id, name);
  res.status(201).json(newAmenity);
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedAmenityId = deleteAmenity(id);

    if (!deletedAmenityId) {
      res.status(404).send(`Amenity with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Amenity with id ${deletedAmenityId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting booking by id!");
  }
});

export default router;
