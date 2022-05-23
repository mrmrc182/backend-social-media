const router = require('express').Router();

const {
    getThoughts,
    newThought,
    getThoughtById,
    updateThought,
    deleteThought
} = require("../../controllers/thought-controller");

router.route('/').get(getThoughts).post(newThought);

router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports=router;