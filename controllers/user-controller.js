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
};
//still have to do:
//put user to update by ID
//delete user by ID
