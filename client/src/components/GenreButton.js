import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GenreButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="genre" id={this.props.id} onClick={this.props.onClick}>
				{this.props.genre}
			</div>
		);
	}
}
