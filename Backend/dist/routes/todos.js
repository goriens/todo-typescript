"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("../models/todo");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.Todo.find();
        res.send(todos);
    }
    catch (err) {
        res.status(500).send({ message: "Error getting Todos", err });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = new todo_1.Todo(req.body);
        yield newTodo.save();
        res.send({ message: "Todo created successfully", data: newTodo });
    }
    catch (err) {
        res.status(500).send({ message: "Error creating Todo", err });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUpdate = {
        title: req.body.title,
        task: req.body.task,
    };
    try {
        const updatedTodo = yield todo_1.Todo.findOneAndUpdate(req.body.id, newUpdate, {
            new: true,
        });
        if (!updatedTodo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        res.send({ message: "Todo updated successfully", data: updatedTodo });
    }
    catch (err) {
        res.status(500).send({ message: "Error updating Todo", err });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTodo = yield todo_1.Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        res.send({ message: "Todo deleted successfully" });
    }
    catch (err) {
        res.status(500).send({ message: "Error deleting Todo", err });
    }
}));
exports.default = router;
