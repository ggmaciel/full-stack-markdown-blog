import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadUserArticles } from "../actions/authActions";
import { logout } from "../actions/authActions";
import { newUserArticle } from "../actions/authActions";
import { deleteArticle } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function UserPage() {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const [preview, setPreview] = useState("");
    const articles = useSelector((state) => state.auth.articles);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadUserArticles());
    }, []);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onPreviewChange = (event) => {
        setPreview(event.target.value);
    };

    const postNewArticle = (e) => {
        e.preventDefault();
        const newArticle = {
            title: title,
            body: body,
            author: user.name,
            preview: preview,
        };

        if (!title || !body || !user.name || !preview) {
            setError("Please enter all fields");
        } else {
            dispatch(newUserArticle(newArticle));
            setError("");
        }
    };

    const userArticles = articles.map((article) => {
        return (
            <div key={article._id} className="user-article-container">
                {" "}
                <div
                    className="trash-icon"
                    onClick={() => dispatch(deleteArticle(article._id))}
                ></div>
                <Link
                    to={`/article/${article._id}`}
                    className="router-link-user-page"
                >
                    <div className="user-article">
                        <h1 className="user-article-title">{article.title}</h1>
                        <h3 className="user-article-body">
                            {article.preview.substring(0, 120)}...
                        </h3>
                        <div className="user-footer">
                            <h3 className="user-author">
                                Author: {article.author}
                            </h3>
                            <div className="user-comments">
                                <h3>{article.comments.length}</h3>
                            </div>
                            <div className="user-likes">
                                <h3>{article.likes.length}</h3>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <div>
            <div className="user-page-header">
                <Link to="/" className="router-link">
                    <div className="user-page-icon">M</div>
                </Link>
                <div className="user-info">
                    <h1>{user.name}</h1>
                    <h2>Articles published: {articles.length}</h2>
                    <button
                        className="user-btn"
                        onClick={() => setModal(!modal)}
                    >
                        New article
                    </button>
                    <div className={modal ? "open-modal" : "closed-modal    "}>
                        <div
                            className={
                                modal ? "modal-form" : "modal-form-closed"
                            }
                        >
                            <button
                                className="modal-btn"
                                onClick={() => setModal(!modal)}
                            >
                                X
                            </button>
                            <form
                                className="new-article-form"
                                onSubmit={postNewArticle}
                            >
                                <input
                                    type="title"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    className="title-modal"
                                    onChange={onTitleChange}
                                />
                                <input
                                    type="title"
                                    name="title"
                                    id="title"
                                    placeholder="Preview your story"
                                    className="preview-modal"
                                    onChange={onPreviewChange}
                                />
                                <div className="editor-container">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data="Write your story"
                                        onInit={(editor) => {
                                            // You can store the "editor" and use when it is needed.
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setBody(data);
                                        }}
                                        onBlur={(event, editor) => {}}
                                        onFocus={(event, editor) => {}}
                                        className="editor"
                                    />
                                </div>
                                <strong className="error-modal">{error}</strong>
                                <button className="modal-post-btn">Post</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="user-page-header-detail"></div>
                <div
                    className="logout"
                    onClick={() => (dispatch(logout()), history.push("/"))}
                >
                    <h5>Logout</h5>
                </div>
            </div>
            <div className="user-bottom-row">
                <div className="user-articles-container">
                    <div className="user-articles-header">Articles</div>
                    {userArticles}
                </div>
            </div>
        </div>
    );
}
