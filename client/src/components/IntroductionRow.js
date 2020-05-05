import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/IntroductionRow.css';
import store from 'store';
import { Redirect } from 'react-router-dom';

export default class IntroductionRow extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (store.get('loggedIn') !== true) {
			return <Redirect to='/Register' />
		}
		console.log(this.props.genre);
		return (
			<div className="introduction">
				<div className="genre" style={{ color: "white" }}><span style={{ color: "green" }}>Genre:</span> {this.props.genre}</div>
				<div className="release_year" style={{ color: "white" }}><span style={{ color: "green" }}>Release Year:</span> {this.props.release_year}</div>
				<div className="website_rating" style={{ color: "white" }}><span style={{ color: "green" }}>Website Rating:</span> {this.props.website_rating}</div>
				<div className="user_rating" style={{ color: "white" }}><span style={{ color: "green" }}>User Rating:</span> {this.props.user_rating}</div>
				<div className="platform" style={{ color: "white" }}><span style={{ color: "green" }}>Platform:</span> {this.props.platform}</div>
				<div className="class" style={{ color: "white" }}><span style={{ color: "green" }}>Classification:</span> {this.props.class_n}</div>
				<div id="storyline" style={{ color: "white" }}><span style={{ color: "green" }}>Storyline:</span> {this.props.storyline}</div>
			</div>
		);
	}
}
