import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCoffee, faSearch, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from 'store';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/NavStyle.css';
import {
	NavBar,
	Link,
	Title,
	UserDiv
} from "../style/pageStyle.js";

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}
	componentDidMount() {
		const pageList = ['dashboard', 'recommendations', 'discover', 'comparison', 'logout'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})
		this.setState({
			navDivs: navbarDivs
		});
	}
	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-dark bg-black">
					<FontAwesomeIcon icon={faGamepad} aria-hidden="true" />
					<span className="navbar-brand center">
						<Title> NO GAME NO LIFE</Title>
					</span>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							{this.state.navDivs}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}