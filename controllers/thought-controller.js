const { Thought, User } = require("../models");

//ask about this at office hours
module.exports = {
    getThoughts(req, res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getThoughtById(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    newThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: (thought._id) } },
          { runValidators: true, new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Posted thought")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        ).then((user) =>
          !user
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { runValidators: true, new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought deleted but no user with ID',
                })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },
};

//for thoughts update the user
// for reactions, update the thought.  add whole reaction too set of reaction
// (see add tags for more)

// just put username in req.body
