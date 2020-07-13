import React from "react";
import { Link } from "react-router-dom";

export default function Default() {
    return (
        <div>
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
        </div>
    );
}
