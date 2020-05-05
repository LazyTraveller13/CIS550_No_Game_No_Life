import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';

export default class GenreButton extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="game-box">
				<img src={this.props.photo_url} height="200" width="150" onClick={this.props.onClick} />
				<center>{this.props.name}</center>
			</div>
		);
	}
}
