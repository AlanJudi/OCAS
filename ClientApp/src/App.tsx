import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Activities from './components/Activities';
import Users from './components/Users';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/activities' component={Activities} />
        <Route path='/users' component={Users} />
    </Layout>
);
