const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Note", NoteSchema);