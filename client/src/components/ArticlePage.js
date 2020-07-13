import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadArticle } from "../actions/articleActions";
import { likeArticle } from "../actions/authActions";
import { commentArticle } from "../actions/authActions";
import { deleteComment } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export default function ArticlePage({ match }) {
    const [load, setLoad] = useState(false);
    const [likeCount, setLikeCount] = useState(false);
    const [updateComment, setUpdateComment] = useState(false);
    const [comment, setComment] = useState("");
    const article = useSelector((state) => state.article.oneArticle);
    const user = useSelector((state) => state.auth.user);
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.error.status);
    const dispatch = useDispatch();

    const id = match.params.id;

    useEffect(() => {
        dispatch(loadArticle(id));
        setTimeout(() => {
            setLoad(true);
        }, 2500);
    }, []);

    //Convert Database date to user local date
    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60 * 1000
        );

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }

    var date = convertUTCDateToLocalDate(new Date(article.post_date));

    const like = () => {
        const like = {
            articleId: article._id,
            name: user.name,
        };

        dispatch(likeArticle(like));
        article.likes.length++;
        setLikeCount(!likeCount);
    };

    var data = "";

    if (article.comments) {
        data = article.comments.map((comment) => {
            const onDeleteComment = () => {
                const deleteUserComment = {
                    articleId: id,
                    commentId: comment._id,
                    commentOwner: comment.commentOwner,
                };

                dispatch(deleteComment(deleteUserComment));
                let filter = article.comments.filter((commentFilter) => {
                    return comment._id !== commentFilter._id;
                });

                article.comments = filter;
                setUpdateComment(!updateComment);
            };

            return (
                <div key={comment._id}>
                    {comment.commentOwner == user._id ? (
                        <div
                            className="trash-icon"
                            onClick={onDeleteComment}
                        ></div>
                    ) : (
                        ""
                    )}

                    <div className="individual-comment">
                        <h3>{comment.name}</h3>
                        <h5>{comment.comment_date.substring(0, 10)}</h5>
                        <h4 className="comment-body">{comment.body}</h4>
                    </div>
                </div>
            );
        });
    }

    const onComment = (e) => {
        setComment(e.target.value);
    };

    const onSendComment = (event) => {
        event.preventDefault();

        const newComment = {
            articleId: article._id,
            commentBody: comment,
            name: user.name,
        };

        if (newComment) {
            dispatch(commentArticle(newComment));
            setUpdateComment(!updateComment);
        }
    };

    return (
        <div>
            {error == "404" ? (
                <div>
                    <Link to="/" className="router-link">
                        <div className="article-page-icon">M</div>
                    </Link>
                    <div className="article-error-container">
                        <div className="error-404">
                            <h1 className="error-404-number">Error 404</h1>
                            <h1 className="error-404-info">
                                {" "}
                                Couldn’t find this page.
                            </h1>
                        </div>
                    </div>
                </div>
            ) : load ? (
                <div>
                    <div className="article-page-logo">
                        <Link to="/" className="router-link">
                            <div className="article-page-icon">M</div>
                        </Link>
                        <Link className="router-link" to="/posts">
                            <div className="article-page-link">Posts</div>
                        </Link>
                    </div>
                    {auth ? (
                        <div className="article-like">
                            <button className="article-like-btn" onClick={like}>
                                {article.likes ? article.likes.length : ""}
                            </button>
                            <span>Endorse</span>
                        </div>
                    ) : (
                        <div className="article-like">
                            <span>Sign up to Endorse</span>

                            <button className="article-like-btn">
                                {article.likes ? article.likes.length : ""}
                            </button>
                        </div>
                    )}

                    <div className="article-page-container">
                        <div className="article-container">
                            <h1 className="article-page-title">
                                {article.title}
                            </h1>
                            <h2 className="article-page-preview">
                                {article.preview}
                            </h2>
                            <h3 className="article-page-author">
                                {article.author}
                            </h3>
                            <h4 className="article-page-post-date">
                                {date.toLocaleString() == "Invalid Date"
                                    ? ""
                                    : date.toLocaleString()}
                            </h4>
                            <span
                                className="article-page-body"
                                dangerouslySetInnerHTML={{
                                    __html: article.body,
                                }}
                            ></span>
                            <div className="article-comments-container">
                                {auth ? (
                                    <form
                                        className="new-comment"
                                        onSubmit={onSendComment}
                                        id="body"
                                    >
                                        New comment
                                        <input
                                            className="comment-input"
                                            type="body"
                                            id="commentBody"
                                            placeholder="Write something"
                                            onChange={onComment}
                                        />
                                        <button className="comment-btn">
                                            Send
                                        </button>
                                    </form>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="article-comments">
                                <p>Comments</p>
                                {data}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
