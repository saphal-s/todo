const express = require("express");
const {
  create,
  listAll,
  update,
  reateCompleted,
  listAllCompletedTask,
} = require("../controller/todoController");
const router = express.Router();

router.post("/task", create);
router.get("/tasks", listAll);
router.get("/all-completed-tasks", listAllCompletedTask);
router.get("/completion-rate", reateCompleted);
router.put("/task/:id", update);

module.exports = router;
