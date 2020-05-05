import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';
import { Redirect } from 'react-router-dom';

export default class DiscoverRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (store.get('loggedIn') !== true) {
			return <Redirect to='/Register' />
		}
		return (
			<div className="game1Results">
				<div className="Name">{this.props.Name}</div>
				<div className="user_rating">{this.props.user_rating}</div>
				<div className="website_rating">{this.props.website_rating}</div>
			</div>
		);
	}
}
