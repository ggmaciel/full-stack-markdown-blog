const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ArticlesSchema = new Schema({
    owner: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    preview: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
    likes: [
        {
            likeOwner: { type: String, required: true },
            name: { type: String, required: true },
            like_date: { type: Date, default: Date.now },
        },
    ],
    comments: [
        {
            commentOwner: { type: String, required: true },
            body: { type: String, required: true },
            name: { type: String, required: true },
            comment_date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = Articles = mongoose.model("articles", ArticlesSchema);
