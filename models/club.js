const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    clubname: String,
    location: String,
    phonenumber: String,

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;