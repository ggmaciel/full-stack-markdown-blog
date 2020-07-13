import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LandingPage() {
    const auth = useSelector((state) => state.auth.isAuthenticated);

    const history = useHistory();

    const onLogin = () => {
        history.push("/login");
    };

    const onRegister = () => {
        history.push("/register");
    };

    return (
        <div className="landing-page">
            <div className="landing-col-left">
                <div className="logo">
                    M
                    <Link className="router-link" to="/posts">
                        <div className="posts-link">Posts</div>
                    </Link>
                    {auth ? (
                        <div
                            className="user-icon"
                            onClick={() => history.push("/user")}
                        ></div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="landing-page-info">
                    <div className="blog-text">Blogging made easy</div>
                    <div className="landing-page-buttons">
                        <button className="login-btn" onClick={onLogin}>
                            Login
                        </button>
                        <button className="register-btn" onClick={onRegister}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
            <div className="landing-col-right"></div>
        </div>
    );
}
