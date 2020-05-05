import React from 'react';
import Axios from 'axios'  // additional package for http post request
import store from 'store'  // additional package for setting login token
import { Redirect } from 'react-router-dom';  // redirect to desired pages
import { GoogleLogin } from 'react-google-login-component';

import '../style/Register.css';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isLoggedIn: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
		store.set('loggedIn', false);
	}
	handleChange(event) {
		let name = event.target.name;
		let value = event.target.value;
		let data = {};
		data[name] = value;
		this.setState(data);
		console.log(name, value);
	}
	//  backend routers are defined seperately
	register(event) {  // handle register request
		Axios.post('http://localhost:8081/register', { username: this.state.username, password: this.state.password }).then(
			res => {
				if (res.data.status === 'success') {
					store.set('loggedIn', true);  // on success, set this value to true, redirect to other pages
					console.log("Register Success!");
					this.setState({ isLoggedIn: true });  // this order is important, make sure setState is the last thing, or
				} else if (res.data.status === 'fail') {  // it will not redirect !
					alert("User Already Exist!");
				}
			}, err => {
				console.log("Add User Error: ", err);
			}
		);
	};
	login(event) {
		event.preventDefault();
		Axios.post('http://localhost:8081/login', { username: this.state.username, password: this.state.password }).then(
			res => {
				if (res.data.status === 'success') {
					console.log("Login Success!");
					store.set('loggedIn', true);
					this.setState({ isLoggedIn: true });
				} else if (res.data.status === 'unexist') {
					alert("User Does Not Exist!");
				} else if (res.data.status === 'error') {
					alert("Error! Please Try Again!");
				} else if (res.data.status === 'fail') {
					alert("Password Incorrect! Please Try Again!");
				}
			}, err => {
				console.log("Login Error: ", err);
			}
		);
	};
	responseGoogle(googleUser) {
		var id_token = googleUser.getAuthResponse().id_token;
		var googleId = googleUser.getId();
		console.log({ googleId });
		console.log({ accessToken: id_token });
		store.set('loggedIn', true);
		console.log("Google Login Success!");
		this.setState({ isLoggedIn: true });
	}
	render() {
		if (store.get('loggedIn')) {  // check this value before every other pages begin, so user have to login first
			console.log("Redirecting to dashboard!");
			return <Redirect to='/' />
		}
		return (
			<div className='Login'>
				<h1 style={{ textAlign: 'center' }}>No Game, No Life - a Game Database Web App</h1>
				<form>
					<h3 style={{ textAlign: 'center' }}>Register or Sign in</h3>
					<div>
						<input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange} />
					</div>
					<div>
						<input type='password' name='password' value={this.state.password} placeholder='password' onChange={this.handleChange} />
					</div>
					<button className = "Sign" onClick={this.register}>Register</button>
					<h5 style={{ textAlign: 'center' }}>Or</h5>
					<button className = "Sign" onClick={this.login}>Sign in</button>
				</form>
				<div className='GoogleLogin'>
					<GoogleLogin
						socialId="524887506547-kqtf5dltt7h3bn454gogje1i1p12aa5v.apps.googleusercontent.com"
						className="google-login"
						scope="profile"
						prompt="select_account"
						fetchBasicProfile={false}
						responseHandler={this.responseGoogle}
						buttonText="Login with Google" />
				</div>
			</div>
		);
	}
}