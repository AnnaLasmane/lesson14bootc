import express from 'express';
import Task from '../models/Task.js';


const router = express.Router();


router.get('/', (req, res) => {
    //return list of all tasks
    res.json([]);
});

router.post('/', async(req, res) => {
    const newTaskData = {
        title: req.body.title,
        labels: req.body.labels,
    };

    const task = new Task(newTaskData);
    const taskEntity = await task.save();

    res.json(taskEntity);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    //update the task
    res.json({ success: true });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    //delete the task
    res.json({ success: true });
});
export default router;