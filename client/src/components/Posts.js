import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Posts() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        axios.get("/api/articles/allArticles").then((res) => {
            setArticles(res.data);
        });
    }, []);

    let data = articles.map((article) => {
        return (
            <Link
                to={`/article/${article._id}`}
                className="router-link"
                key={article._id}
            >
                <div className="posts-article">
                    <h1>{article.title}</h1>
                    <h3>{article.preview}</h3>
                    <h4>
                        {article.author + "   |   "}
                        {article.post_date.substring(0, 10)}
                    </h4>
                </div>
            </Link>
        );
    });
    return (
        <div>
            <div className="posts-icon-container">
                <Link to="/" className="router-link">
                    <div className="posts-icon">M</div>
                </Link>
            </div>
            <div className="posts-banner">markdown</div>
            <div className="posts-gustavo">by Gustavo Maciel</div>
            <div className="posts-container">{data}</div>
        </div>
    );
}
