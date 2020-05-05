import React from 'react';
import store from 'store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from 'react-router-dom';

export default class Logout extends React.Component {
    componentDidMount() {
        store.set('loggedIn', false);
        console.log("Logout!");
    }
    render() {
        return <Redirect to='/register' />
    }
}
