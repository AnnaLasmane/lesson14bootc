import express from 'express';
import Task from '../models/Task.js';


const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const query = Task.find({});
        const tasks = await query.exec();

        res.json(tasks);
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

router.post('/', async(req, res) => {
    const newTaskData = {
        title: req.body.title,
        labels: req.body.labels,
    };

    const task = new Task(newTaskData);
    try {
        const taskEntity = await task.save();
        res.json(taskEntity);
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const query = Task.findById(id);
        const task = await query.exec();
        if (!task) {
            res.status(404).json({ notFound: true });
            return;
        }
        //update the object
        task.title = req.body.title;
        task.labels = req.body.labels;
        task.isCompleted = req.body.isCompleted;

        await task.save(); // trigger save in database
        res.json(task);
    } catch (e) {
        res.json({ error: true, message: e });
    }



});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const query = Task.deleteOne({
            _id: id
        });
        await query.exec();


        res.json({ sucess: true });
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

export default router;