const router = require('express').Router();
const {
    getUsers,
    getUserById,
    newUser
} = require("../../controllers/user-controller");

router.route('/').get(getUsers).post(newUser);

router.route("/:userId").get(getUserById)

module.exports=router;