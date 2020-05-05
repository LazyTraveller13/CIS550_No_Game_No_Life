import React, { Component } from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import DashboardButton from './DashboardButton';
import '../style/Dashboard.css';
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import store from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import ImageBox from './ImageBox';

import {
	Container1,
	SearchForm,
	SearchDiv,
	SearchBar,
	MagnifyingGlass
} from "../style/pstyle.js";

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Rgame: [],
			search: "",
			rec1Text: "",
		}
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.searchBar = this.searchBar.bind(this);
	}
	// Get Random game which have url and photo.
	componentDidMount() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/ShowGame/gameId",
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();

			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(RandomGameList => {
				if (!RandomGameList) return;
				let rgameDivs = [];
				for (var i = 0; i < RandomGameList.length; i++) {
					fetch("http://localhost:8081/" + RandomGameList[i].id, {
						method: 'GET'
					}).then(res => {
						return res.json();
					}, err => {
						console.log(err);
					}).then(RandomGame => {
						if (!RandomGame) return;
						console.log(RandomGame)
						console.log(RandomGame[0].photo_url);
						let rgameDiv = <ImageBox name={RandomGame[0].name} photo_url={RandomGame[0].photo_url} vg_url={RandomGame[0].vg_url} />;
						rgameDivs.push(rgameDiv);
						this.setState({
							Rgame: rgameDivs
						});

					});
				}
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	}
	openLink(url) {
		if (url != "N/A" && url != undefined) {
			var win = window.open(url);
			win.focus();
		}

	}
	// Search bar for the game you want to know with url
	searchBar(e) {
		e.preventDefault();
		fetch("http://localhost:8081/Dashboard/" + this.state.search, {
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(SearchElement => {
			if (!SearchElement) return;
			console.log(this.state.search);
			console.log(SearchElement);
			let SearchDivs = SearchElement.map((searchObj, i) =>
				<ImageBox key={i} name={searchObj.name2} photo_url={searchObj.photo2_url} vg_url={searchObj.vg2_url} />);
			this.setState({
				rec1Text: ""
			});
			if (SearchDivs.length == 0) {
				this.setState({
					rec1Text: "The Game You Entered Does Not Exist !"
				});
			}
			this.setState({
				searchG: SearchDivs
			});
		}, err => {
			// Print the error if there is one.
			console.log(err);
		});
	}
	// change the value when after you submit
	handleSearchChange(e) {
		this.setState({
			search: e.target.value
		});
	}
	render() {
		if (store.get('loggedIn') !== true) {
			return <Redirect to='/Register' />
		}
		return (
			<div className="Dashboard">
				<PageNavbar active="dashboard" />
				<br></br>
				<div className="container">
					<div className="jumbotron bg-transparent">
						<div className="input-container">
							<div className="Searchbar">Googame</div>
							<SearchForm onSubmit={this.searchBar}>
								<SearchDiv>
									<MagnifyingGlass type="submit">
										<FontAwesomeIcon icon={faSearch} aria-hidden="true" />
									</MagnifyingGlass>
									<SearchBar onChange={this.handleSearchChange} value={this.state.search} placeholder="Enter Game Name"></SearchBar>
								</SearchDiv>
							</SearchForm>
						</div>
						<span className="Warning">{this.state.rec1Text}</span>
						<div className="Dashboard-container">
							{this.state.searchG}
						</div>
					</div>
				</div>
				<br></br>
				<div className="container">
					<div className="jumbotron bg-transparent">
						<div className="GameKingdom">
							Game Kingdom
                    </div>
						<div className="Dashboard-container">
							{this.state.Rgame}
						</div>
					</div>
				</div>
			</div>
		);
	}
}