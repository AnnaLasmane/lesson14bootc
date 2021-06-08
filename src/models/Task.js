import mongoose from 'mongoose';
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        deafault: false,
    },
    labels: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const task = mongoose.model('Tasks', taskSchema);

export default task;