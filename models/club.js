const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    clubname: String,
    address: String,
    phonenumber: String,
    website: String,
    // weed: String,
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});
clubSchema.index({
    location: '2dsphere'
});
const Club = mongoose.model("Club", clubSchema);

module.exports = Club;