require('./db');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Autor = new Schema({
    nameAutor: {
        type: String,
        required: true
    },
    training: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
});

mongoose.model("autors", Autor);