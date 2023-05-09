import mongoose from 'mongoose';
import Schema from 'mongoose';

const fiveWordsSchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        arr: [],
    },
    {timestamps: true},
);

const FiveWord = mongoose.model('FiveWord', fiveWordsSchema);

export default FiveWord;
