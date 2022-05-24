const router = require('express').Router();

const {
    getThoughts,
    newThought,
    getThoughtById,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

router.route('/').get(getThoughts).post(newThought);

router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(newReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports=router;