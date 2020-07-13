import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { useHistory } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
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

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
        };
        const validEmail = regEx.test(email);
        if (!name || !email || !password || !confirmPassword) {
            setRegisterError("Please enter all fields");
        } else if (!validEmail) {
            setRegisterError("Please enter valid email");
        } else if (password != confirmPassword) {
            setRegisterError("Passwords must match");
        } else {
            dispatch(register(newUser));
            setRegisterError("");
        }
    };
    return (
        <div>
            <div className="register-left-col">
                <Link to="/" className="router-link">
                    <div className="register-icon">M</div>
                </Link>
                <div className="register-container">
                    <form
                        onSubmit={onSubmit}
                        className="register-form-container"
                    >
                        <label>Name</label>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={onChangeName}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={onChangeEmail}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={onChangePassword}
                        />
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={onChangeConfirmPassword}
                        />
                        <div className="login-errors">
                            <p>{registerError}</p>
                            <p>{error.message}</p>
                        </div>
                        <button className="signup-btn">Sign up</button>
                    </form>
                </div>
            </div>
            <div className="register-right-col">
                <div className="register-vector"></div>
                <div className="register-right-col-info">
                    Sign up to publish your work
                </div>
            </div>
        </div>
    );
}
