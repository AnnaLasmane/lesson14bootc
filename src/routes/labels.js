import express from 'express';
import Label from '../models/Label.js';


const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const query = Label.find({});
        const labels = await query.exec();

        res.json(labels);
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

router.post('/', async(req, res) => {
    const newLabelData = {
        title: req.body.title,
        color: req.body.color,
    };

    const label = new Label(newLabelData);
    try {
        const labelEntity = await label.save();
        res.json(labelEntity);
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const query = Label.findById(id);
        const label = await query.exec();
        if (!label) {
            res.status(404).json({ notFound: true });
            return;
        }
        //update the object
        label.title = req.body.title;
        label.color = req.body.color;

        await label.save(); // trigger save in database
        res.json(label);
    } catch (e) {
        res.json({ error: true, message: e });
    }



});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const query = Label.deleteOne({
            _id: id
        });
        await query.exec();


        res.json({ sucess: true });
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

export default router;