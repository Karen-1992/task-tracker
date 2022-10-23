const express = require("express");
const Task = require("../models/Task");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
    try {
        const { orderBy, equalTo } = req.query;
        const path = "updatedAt";
        const order = "desc";
        const list = await Task.find({ [orderBy]: equalTo }).sort({ [path]: order });
        // const list = await Task.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.put("/", auth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body
        });
        res.status(201).send(newTask);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.delete("/:taskId", auth, async (req, res) => {
    try {
        const { taskId } = req.params;
        const removedTask = await Task.findById(taskId);
        if (removedTask.userId.toString() === req.user._id) {
            await removedTask.remove();
            return res.send(null);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.patch("/:taskId", auth, async (req, res) => {
    try {
        const { taskId } = req.params;
        if (req.body.userId === req.user._id) {
            const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
                new: true
            });
            res.send(updatedTask);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;
