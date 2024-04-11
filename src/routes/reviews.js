import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import deleteReview from "../services/reviews/deleteReview.js";
import updateReview from "../services/reviews/updateReview.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { comment } = req.query;
    const reviews = getReviews(comment);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting reviews");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const review = getReviewById(id);

    if (!review) {
      res.status(404).send(`Review ${id} not found`);
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Review not found by Id");
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const updatedReview = updateReview(id, userId, propertyId, rating, comment);
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating property by id!");
  }
});

router.post("/", (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletedReviewId = deleteReview(id);

    if (!deletedReviewId) {
      res.status(404).send(`Review ${id} not found`);
    } else {
      res.status(200).json({
        message: `Review with id ${deletedReviewId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Deleting review ${id} failed`);
  }
});

export default router;
