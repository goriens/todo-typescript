import express from "express";
import { Todo } from "../models/todo";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send({ message: "Error getting Todos", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.send({ message: "Todo created successfully", data: newTodo });
  } catch (err) {
    res.status(500).send({ message: "Error creating Todo", err });
  }
});

router.patch("/:id", async (req, res) => {
  const newUpdate = {
    title: req.body.title,
    task: req.body.task,
  };
  try {
    const updatedTodo = await Todo.findOneAndUpdate(req.body.id, newUpdate, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    res.send({ message: "Todo updated successfully", data: updatedTodo });
  } catch (err) {
    res.status(500).send({ message: "Error updating Todo", err });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.send({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting Todo", err });
  }
});

export default router;
