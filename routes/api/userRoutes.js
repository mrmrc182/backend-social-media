const router = require('express').Router();
const {
    getUsers,
    getUserById,
    newUser,
    deleteUser,
    updateUser
} = require("../../controllers/user-controller");

router.route('/').get(getUsers).post(newUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports=router;