const router = require('express').Router();
const {
    getUsers,
    getUserById,
    newUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

router.route('/').get(getUsers).post(newUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// router.route("/userId/friends").post(addFriend);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports=router;