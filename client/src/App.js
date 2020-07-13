import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
//Components
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserPage from "./components/UserPage";
import ArticlePage from "./components/ArticlePage";
import Posts from "./components/Posts";
import Default from "./components/Default";
//Protected Route
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    });
    return (
        <div>
            <Provider store={store}>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/user" component={UserPage} />
                    <Route path="/article/:id" component={ArticlePage} />
                    <Route path="/posts" component={Posts} />
                    <Route component={Default} />
                </Switch>
            </Provider>
        </div>
    );
}

export default App;
