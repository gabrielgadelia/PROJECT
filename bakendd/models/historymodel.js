import mongoose from 'mongoose';

const history_schema = new mongoose.Schema({
    name : {type: String, required: true, unique: true},
    description : {type: String, required: true},
    year : {type: Number, required: true},
    imagelink : {type: String, required: true},
    wikilink: {type: String, required: true}
})

export const HistoryModule = mongoose.model("History", history_schema)