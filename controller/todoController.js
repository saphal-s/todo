const { validationResult } = require("express-validator");
const ToDo = require("../model/todo");

// create task

module.exports.create = async (req, res) => {
  const { title } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const task = await ToDo.create({
      title,
    });
    task.save();
    res.status(200).json({ msg: "Your task has been added." });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

// list all tasks

exports.listAll = async (req, res) => {
  let tasks = await ToDo.find({})
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(tasks);
};

// list all completed tasks

exports.listAllCompletedTask = async (req, res) => {
  let tasks = await ToDo.aggregate([
    {
      $match: {
        completed: true,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]).exec();
  res.json(tasks);
};

// update completed status

exports.update = async (req, res) => {
  const { completed } = req.body;

  try {
    const updatedTask = await ToDo.findByIdAndUpdate(
      { _id: req.params.id },
      { completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(400).send("Task update failed !");
  }
};

// Listing of completion rate per day using MongoDB aggregation

exports.reateCompleted = async (req, res) => {
  try {
    const completionRates = await ToDo.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$completionDate" },
          },
          completionRate: { $avg: { $cond: ["$completed", 1, 0] } },
        },
      },
    ]);
    res.json(completionRates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch completion rates" });
  }
};
