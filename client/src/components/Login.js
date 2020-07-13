import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/authActions";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const error = useSelector((state) => state.error);
    const loggedIn = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (loggedIn) {
            history.push("/");
            window.location.reload();
        }
    }, [loggedIn]);

    const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const validEmail = regEx.test(email);

        const user = {
            email,
            password,
        };

        if (validEmail) {
            dispatch(login(user));
            setLoginError("");
        } else {
            setLoginError("Invalid email");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left-col">
                <Link to="/" className="router-link">
                    <div className="login-icon">M</div>
                </Link>
                <div className="login-vector">
                    <div className="login-left-col-info">
                        Sign in now to start creating
                    </div>
                </div>
            </div>
            <div className="login-right-col">
                <div>
                    <form onSubmit={onSubmit} className="login-form-container">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={onChangeEmail}
                            className="login-email"
                        />
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={onChangePassword}
                            className="login-password"
                        />
                        <div className="login-errors">
                            <p>{loginError}</p>
                            <p>{error.message}</p>
                        </div>
                        <button className="signin-btn">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
