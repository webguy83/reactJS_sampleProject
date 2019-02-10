import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import BookView from './components/Books';
import Login from './containers/Admin/login';
import Layout from './hoc/layout';
import AuthenticationCheck from './hoc/auth';

import AddReview from './containers/Admin/add';
import UserPosts from './components/Admin/userPosts';
import EditReview from './containers/Admin/edit';

import User from './components/Admin';
import Register from './containers/Admin/register';
import Logout from './components/Admin/logout';

const Routes = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path='/' exact component={AuthenticationCheck(Home, null)} />
                    <Route path='/books/:id' exact component={AuthenticationCheck(BookView, null)} />
                    <Route path='/user/' exact component={AuthenticationCheck(User, true)} />
                    <Route path='/user/add' exact component={AuthenticationCheck(AddReview, true)} />
                    <Route path='/user/register' exact component={AuthenticationCheck(Register, true)} />
                    <Route path='/user/edit-post/:id' exact component={AuthenticationCheck(EditReview, true)} />
                    <Route path='/login/' exact component={AuthenticationCheck(Login, false)} />
                    <Route path='/user/logout' exact component={AuthenticationCheck(Logout, true)} />
                    <Route path='/user/user-reviews' exact component={AuthenticationCheck(UserPosts, true)} />
                </Switch>
            </Layout>
        </div>
    );
};

export default Routes;