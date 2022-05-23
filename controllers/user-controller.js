const mongoose = require("mongoose");
const { User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  newUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    ).catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(() => res.json({ message: "User deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res){
      User.findOneAndUpdate(
          {_id: req.params.userId},
          {$push: {friends: req.params.friendId}},
          {runValidators: true, new: true}
      )
      .then((user)=>
        !user
            ? res.status(404).json({message: "No user found with that ID"})
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res){
      User.findOneAndUpdate(
          {_id: req.params.userId},
          {$pull: {friends: req.params.friendId}},
          {runValidators: true, new: true}
      ) .then((friend) =>
      !friend
        ? res
            .status(404)
            .json({ message: "No friend found with that ID" })
        : res.json(friend)
    )
    .catch((err) => res.status(500).json(err));
  }
};
//still have to do:
//fix delete friend by ID
