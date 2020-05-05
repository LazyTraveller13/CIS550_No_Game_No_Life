import React from 'react';
import PageNavbar from './PageNavbar';
import ImageBox from './ImageBox';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
	Container1,
	SearchForm,
	SearchDiv,
	SearchBar,
	MagnifyingGlass
} from "../style/pstyle.js";

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);
		// State maintained by this React component is the selected game name,
		// and the list of recommended games.
		this.state = {
			gameName: "",
			rec1Text: "",
			rec2Text: "",
			recGenreDevGames: [],
			recPlatGames: []
		}
		this.handleGameNameChange = this.handleGameNameChange.bind(this);
		this.submitGame = this.submitGame.bind(this);
	}
	handleGameNameChange(e) {
		this.setState({
			gameName: e.target.value
		});
	}
	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of game submitted is contained in `this.state.gameName`.
	submitGame(e) {
		// Find the recommendation games based on genre
		e.preventDefault();
		fetch("http://localhost:8081/recommendations/" + this.state.gameName,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(recommendedGameList => {
				if (!recommendedGameList) return;
				// Map each gameObj in recommendedMovieList to an HTML element:
				// genres recommendation
				let recommendedGenreGameDivs = recommendedGameList[0].map((gameObj, i) =>
					<ImageBox key={i} name={gameObj.name} id={gameObj.id}
						website_rating={gameObj.website_rating} user_rating={gameObj.user_rating}
						release_year={gameObj.release_year} vg_url={gameObj.vg_url} photo_url={gameObj.photo_url} />
				);
				console.log(recommendedGenreGameDivs);
				this.setState({
					rec1Text: "",
					rec2Text: ""
				});
				// platforms recommendation
				let recommendedPlatGameDivs = recommendedGameList[1].map((gameObj, i) =>
					<ImageBox name={gameObj.name} id={gameObj.id}
						website_rating={gameObj.website_rating} user_rating={gameObj.user_rating}
						release_year={gameObj.release_year} vg_url={gameObj.vg_url} photo_url={gameObj.photo_url} />
				);
				console.log(recommendedPlatGameDivs);
				if (recommendedPlatGameDivs.length) {
					this.setState({
						rec2Text: "Games under the same developers: "
					});
				}
				// Set the state of the genres list to the value returned by the HTTP response from the server.
				if (recommendedGenreGameDivs.length) {
					this.setState({
						rec1Text: "Recommendation for " + '"' + this.state.gameName + '"' + " :"
					});
				}
				if (!recommendedPlatGameDivs.length & !recommendedGenreGameDivs.length) {
					this.setState({
						rec1Text: "Game " + '"' + this.state.gameName + '"' + " doesn't exist in the database" +
							" or no recommendation for this game.",
						rec2Text: ""
					});
				}
				this.setState({
					recGenreDevGames: recommendedGenreGameDivs,
					recPlatGames: recommendedPlatGameDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	}
	render() {
		if (store.get('loggedIn') !== true) {
			return <Redirect to='/Register' />
		}
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />
				<div className="container recommendations-container">
					<div className="Intro">Find Your Own Game!</div>
					<SearchForm onSubmit={this.submitGame}>
						<SearchDiv>
							<MagnifyingGlass type="submit">
								<FontAwesomeIcon icon={faSearch} aria-hidden="true" />
							</MagnifyingGlass>
							<SearchBar onChange={this.handleGameNameChange} value={this.state.gameName} placeholder="Enter Game Name"></SearchBar>
						</SearchDiv>
					</SearchForm>
					<br></br>
					<span className="h5" style={{ color: "white" }}>{this.state.rec1Text}</span>
					<div className="results-container" id="results">
						{this.state.recGenreDevGames}
					</div>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<span className="h5" style={{ color: "white" }}>{this.state.rec2Text}</span>
					<div className="results-container" id="results">
						{this.state.recPlatGames}
					</div>
				</div>
			</div>
		);
	}
}
