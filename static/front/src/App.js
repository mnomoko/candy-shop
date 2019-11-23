import React, {Component} from 'react';
import './App.css';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

import {getCurrentUser} from './common/util/APIUtils';
import {ACCESS_TOKEN} from './common/constants';

import ProductList from './component/shop/product/ProductList';
import NewProduct from './component/shop/product/NewProduct';
import Login from './component/user/login/Login';
import Signup from './component/user/signup/Signup';
import Profile from './component/user/profile/Profile';
import AppHeader from './common/AppHeader';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import PrivateRoute from './common/PrivateRoute';

import {Layout, notification} from 'antd';
import ProductEdit from "./component/shop/product/ProductEdit";

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadCurrentUser();
    }

    // Handle Logout, Set currentUser and isAuthenticated state which will be passed to other components
    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Candy Shop',
            description: description,
        });
    }

    /*
     This method is called by the Login component after successful login
     so that we can load the logged-in user details and set the currentUser &
     isAuthenticated state, which other components will use to render their JSX
    */
    handleLogin() {
        notification.success({
            message: 'Candy Shop',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        if (this._isMounted) {
            if (this.state.isLoading) {
                return <LoadingIndicator/>
            }
            return (
                <Layout className="app-container">
                    <AppHeader isAuthenticated={this.state.isAuthenticated}
                               currentUser={this.state.currentUser}
                               onLogout={this.handleLogout}/>

                    <Content className="app-content">
                        <div className="container">
                            <Switch>
                                <Route exact path="/"
                                       render={(props) => <ProductList isAuthenticated={this.state.isAuthenticated}
                                                                       currentUser={this.state.currentUser}
                                                                       handleLogout={this.handleLogout} {...props} />}>
                                </Route>
                                <Route path="/login"
                                       render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                                <Route path="/signup" component={Signup}></Route>
                                <Route path="/users/:username"
                                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                                   currentUser={this.state.currentUser} {...props}  />}>
                                </Route>
                                <Route path="/products/:id"
                                       render={(props) => <ProductEdit isAuthenticated={this.state.isAuthenticated}
                                                                       currentUser={this.state.currentUser} {...props}  />}>
                                </Route>
                                <PrivateRoute authenticated={this.state.isAuthenticated} path="/product/new"
                                              component={NewProduct}
                                              handleLogout={this.handleLogout}></PrivateRoute>
                                <Route component={NotFound}></Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            );
        } else
            return null;
    }
}

export default withRouter(App);
