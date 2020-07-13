const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");

//Models
const User = require("../../models/User");
const Articles = require("../../models/Articles");

////////////////////////////////
//Post Article
//route ---- /api/articles/newArticle

router.post("/newArticle", auth, (req, res) => {
    const { title, body, author, preview } = req.body;

    if (!title || !body || !author || !preview) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    const newArticle = new Articles({
        owner: req.user.id,
        author,
        title,
        body,
        preview,
    });

    newArticle
        .save()
        .then((article) => {
            res.json("New article posted");
        })
        .catch((err) => {
            res.json("Something went wrong");
        });
});

////////////////////////////////
//Delete Article
//route ---- /api/articles/deleteArticle

router.post("/deleteArticle", auth, (req, res) => {
    const { articleId } = req.body;

    Articles.findOne({ _id: articleId })
        .then((article) => {
            if (article.owner == req.user.id) {
                article.deleteOne({ _id: articleId });
                res.json("Article deleted");
            } else {
                res.json("Not your article");
            }
        })
        .catch((err) => {
            res.json({ message: "Something went wrong" });
        });
});

////////////////////////////////
//Like Article
//route ---- /api/articles/likeArticle

router.put("/likeArticle", auth, (req, res) => {
    const { articleId, name } = req.body;

    Articles.findOne({ _id: articleId })
        .then((articles) => {
            const like = { name, likeOwner: req.user.id };
            articles.likes.push(like);
            articles.save();
            res.json(`You endorsed ${articles.author}'s article`);
        })
        .catch((err) => {
            res.status(404).json({ message: "Article was not found" });
        });
});

////////////////////////////////
//Dislike Article
//route ---- /api/articles/dislikeArticle
/////////////////////////////////////////Deprecated/////////////////////////////////////////

router.put("/dislikeArticle", auth, (req, res) => {
    const { articleId } = req.body;

    Articles.findOne({ _id: articleId })
        .then((articles) => {
            //Check if user liked article
            let likedArticle = articles.likes.some((like) =>
                like.likeOwner.includes(req.user.id)
            );
            if (!likedArticle) {
                res.status(404).json({
                    message: "You have not liked this article",
                });
            } else {
                const dislike = articles.likes.filter((likes) => {
                    return likes.likeOwner !== req.user.id;
                });
                articles.likes = dislike;
                articles.save();
                res.json(`You disliked ${articles.author}'s article`);
            }
        })
        .catch((err) => {
            res.status(404).json({ message: "Article was not found" });
        });
});

////////////////////////////////
//Comment Article
//route ---- /api/articles/comment

router.post("/comment", auth, (req, res) => {
    const { articleId, commentBody, name } = req.body;

    if (!articleId || !commentBody || !name) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    //Check if article exists
    Articles.findOne({ _id: articleId })
        .then((article) => {
            const comment = {
                _id: new mongoose.mongo.ObjectId(),
                commentOwner: req.user.id,
                body: commentBody,
                name: name,
                comment_date: new Date(),
            };
            article.comments.push(comment);
            article.save();
            res.json(comment);
        })
        .catch((err) => {
            res.status(404).json({ message: "Article was not found" });
        });
});

////////////////////////////////
//Delete comment
//route ---- /api/articles/deleteComment

router.put("/deleteComment", auth, (req, res) => {
    const { articleId, commentId, commentOwner } = req.body;

    //Check if article exists
    Articles.findOne({ _id: articleId })
        .then((article) => {
            //Check if comment exist
            let commentInArticle = article.comments.some(
                (comment) => comment._id == commentId
            );

            if (!commentInArticle) {
                return res.status(404).json({ message: "Comment not found" });
            }

            //Check if the user requesting the delete is the same as the one who commented
            if (commentOwner !== req.user.id) {
                return res
                    .status(400)
                    .json({ message: "This is not your comment" });
            } else {
                //If it is delete comment
                const deleteComment = article.comments.filter((comment) => {
                    return comment._id != commentId;
                });
                article.comments = deleteComment;
                article.save();
                res.json("Comment deleted");
            }
        })
        .catch((err) => {
            res.status(404).json({ message: "Comment was not found" });
        });
});

////////////////////////////////
//Get user articles
//route ----/api/articles/userArticles

router.get("/userArticles", auth, (req, res) => {
    Articles.find({ owner: req.user.id }).then((articles) => {
        res.json(articles);
    });
});

////////////////////////////////
//Get one article
//route ----/api/articles/article

router.post("/article", (req, res) => {
    const { articleId } = req.body;
    Articles.findOne({ _id: articleId })
        .then((article) => {
            res.json(article);
        })
        .catch((err) => {
            res.status(404).json({ message: "Article not found" });
        });
});

////////////////////////////////
//Get all articles
//route ----/api/articles/allArticles

router.get("/allarticles", (req, res) => {
    Articles.find({}, { likes: 0, comments: 0 })
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            res.status(500).json({ message: "Something went wrong on server" });
        });
});

module.exports = router;
