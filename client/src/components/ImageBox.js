import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';
import { Redirect } from 'react-router-dom';

export default class ImageBox extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (store.get('loggedIn') !== true) {
			return <Redirect to='/Register' />
		}
		return (
			<figure>
				<a href={this.props.vg_url} target="_blank">
					<img src={this.props.photo_url} alt={this.props.name} />
					<figcaption>{this.props.name}</figcaption>
				</a>
			</figure>
		);
	}
}
