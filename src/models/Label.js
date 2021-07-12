import mongoose from 'mongoose';

// {"title": "foo", "isCompleted": true, "labels": [123, 321]}
const labelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const label = mongoose.model('Labels', labelSchema);

export default label;