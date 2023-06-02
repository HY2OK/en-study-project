import mongoose from 'mongoose';
import Schema from 'mongoose';

const diarySchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        diary: {
            type: String,
        },
        updated: [],
    },
    {timestamps: true},
);

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;
