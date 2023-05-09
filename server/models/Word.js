import mongoose from 'mongoose';
import Schema from 'mongoose';

const wordSchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        word: {
            type: String,
        },
        mean: {
            type: String,
        },
    },
    {timestamps: true},
);

const Word = mongoose.model('Word', wordSchema);

export default Word;
