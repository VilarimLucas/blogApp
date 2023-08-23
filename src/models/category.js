require('./db');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
    nameCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});
mongoose.model("categorys", Category);