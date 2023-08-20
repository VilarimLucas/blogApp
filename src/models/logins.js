require('./db');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Logins = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
mongoose.model("logins", Logins);