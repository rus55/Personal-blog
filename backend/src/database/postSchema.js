import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,
        default: uuid.v4,
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    text: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    visible: {
        type: mongoose.Schema.Types.Boolean,
        default: true,
    },
    authorId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    authorName: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
},
{
    timestamps: true
})
export default schema;