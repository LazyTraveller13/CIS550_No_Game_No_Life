import React from 'react';
import PageNavbar from './PageNavbar';
import ImageBox from './ImageBox';
import IntroductionRow from './IntroductionRow';
import axios from 'axios';
import '../style/Comparison.css';
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
} from "../style/pstyle1.js";

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);
		// State maintained by this React component is the selected game name,
		// and the list of recommended games.
		this.state = {
			gameName1: "",
			gameReleaseYear1: "",
			gameUserRating1: "",
			gameWebsiteRating1: "",
			gameClass1: "",
			gameGenre1: "",
			gamePlatform1: "",
			game_img1: "",
			game_url1: "",
			poster1: "",
			introduction1: "",
			storyline1: "",
			exist1: "",

			gameName2: "",
			gameReleaseYear2: "",
			gameUserRating2: "",
			gameWebsiteRating2: "",
			gameClass2: "",
			gameGenre2: "",
			gamePlatform2: "",
			game_img2: "",
			game_url2: "",
			poster2: "",
			introduction2: "",
			storyline2: "",
			exist2: ""
		}
		this.handleGameNameChange = this.handleGameNameChange.bind(this);
		this.submitGame = this.submitGame.bind(this);
	}
	handleGameNameChange(e, i) {
		if (i == 1) {
			this.setState({
				gameName1: e.target.value
			});
			console.log(this.state.gameName1);
		}
		else {
			this.setState({
				gameName2: e.target.value
			});
		}
	}
	resetState(i) {
		if (i == 1) {
			this.setState({
				gameName1: "",
				gameReleaseYear1: "",
				gameUserRating1: "",
				gameWebsiteRating1: "",
				gameClass1: "",
				gameGenre1: "",
				gamePlatform1: "",
				game_img1: "",
				game_url1: "",
				poster1: "",
				introduction1: "",
				storyline1: "",
				exist1: "This game does not exist in the database."
			});
		}
		else {
			this.setState({
				gameName2: "",
				gameReleaseYear2: "",
				gameUserRating2: "",
				gameWebsiteRating2: "",
				gameClass2: "",
				gameGenre2: "",
				gamePlatform2: "",
				game_img2: "",
				game_url2: "",
				poster2: "",
				introduction2: "",
				storyline2: "",
				exist2: "This game does not exist in the database."
			});
		}
	}
	// Hint: Name of game submitted is contained in `this.state.gameName`.
	submitGame(i, e) {
		e.preventDefault();
		var gameName = "";
		if (i == 1) {
			gameName = this.state.gameName1;
		}
		else {
			gameName = this.state.gameName2;
		}
		// Find the recommendation games based on genre 
		fetch("http://localhost:8081/getGameInfo/" + gameName,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				console.log(res);
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(gameInfo => {
				if (!gameInfo) {
					return;
				}
				console.log(gameInfo);

				var base_url = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";
				var split_name = gameName.split(" ");
				var query_name = "";
				for (var x = 0; x < split_name.length; x++) {
					if (x != 0) {
						query_name += "%20" + split_name[x];
					}
					else {
						query_name += split_name[x];
					}
				}
				// get the storyline through igdb api
				var storyline;
				axios({
					url: base_url + "?search=" + query_name + "&fields=id,name,url,summary,storyline,websites",
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'user-key': "9d8d771cbbf2fd2b61f9920057a21a36"
					},
					data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
				})
					.then(response => {
						if (response.data[0]) {
							storyline = response.data[0].storyline;
						}
						else {
							this.resetState(i);
						}
					})
					.then(() => {
						console.log(storyline);

						// convert the data to each variable
						if (gameInfo[1][0]) {
							var releaseYear = gameInfo[1][0].release_year;
							var userRating = gameInfo[2][0].user_rating;
							var websiteRating = gameInfo[2][0].website_rating;
							var platform = "";
							for (var x = 0; x < gameInfo[3].length; x++) {
								if (x == gameInfo[3].length - 1) {
									platform += gameInfo[3][x].plat_name;
								}
								else {
									platform += gameInfo[3][x].plat_name + ", ";
								}
							}
							var class_n = gameInfo[4][0].class_name;
							var genre = "";
							for (var x = 0; x < gameInfo[5].length; x++) {
								if (x == gameInfo[5].length - 1) {
									genre += gameInfo[5][x].genre_name;
								}
								else {
									genre += gameInfo[5][x].genre_name + ", ";
								}
							}
							var img_url = 'imgNotFound.jpg';
							var url;
							if (gameInfo[6][0]) {
								img_url = gameInfo[6][0].photo_url;
								url = gameInfo[6][0].vg_url;
							}
							if (i == 1) {
								this.setState({
									exist1: "",
									gameReleaseYear1: releaseYear,
									gameUserRating1: userRating,
									gameWebsiteRating1: websiteRating,
									gamePlatform1: platform,
									gameClass1: class_n,
									gameGenre1: genre,
									game_img1: img_url,
									game_url1: url,
									storyline1: storyline,
									poster1: <ImageBox name={this.state.gameName1} website_rating={websiteRating} user_rating={userRating}
										release_year={releaseYear} vg_url={url} photo_url={img_url} />,
									introduction1: <IntroductionRow release_year={releaseYear} website_rating={websiteRating}
										user_rating={userRating} genre={genre} platform={platform} class_n={class_n} storyline={storyline}></IntroductionRow>
								});
							}
							else {
								this.setState({
									exist2: "",
									gameReleaseYear2: releaseYear,
									gameUserRating2: userRating,
									gameWebsiteRating2: websiteRating,
									gamePlatform2: platform,
									gameClass2: class_n,
									gameGenre2: genre,
									game_img2: img_url,
									game_url2: url,
									poster2: <ImageBox name={this.state.gameName2} website_rating={websiteRating} user_rating={userRating}
										release_year={releaseYear} vg_url={url} photo_url={img_url} />,
									introduction2: <IntroductionRow release_year={releaseYear} website_rating={websiteRating}
										user_rating={userRating} genre={genre} platform={platform} class_n={class_n} storyline={storyline}></IntroductionRow>
								});
							}
						}
					})
					.catch(err => {
						console.error(err);
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
				<PageNavbar active="comparison" />
				<div className="container recommendations-container">
					<div className="compar">Game Comparison</div>
					<br></br>
					<div className="whole-container"></div>
					<div className="search-bar-container" id="left">
						<SearchForm onSubmit={(e) => this.submitGame(1, e)}>
							<SearchDiv>
								<MagnifyingGlass type="submit">

									<FontAwesomeIcon icon={faSearch} aria-hidden="true" />
								</MagnifyingGlass>
								<SearchBar onChange={(e) => this.handleGameNameChange(e, 1)} value={this.state.gameName1} placeholder="Enter Game Name"></SearchBar>
							</SearchDiv>
						</SearchForm>
						<br></br>
						{this.state.poster1}
						{this.state.introduction1}
					</div>
					<div className="search-bar-container" id="right">
						<SearchForm onSubmit={(e) => this.submitGame(2, e)}>
							<SearchDiv>
								<MagnifyingGlass type="submit">
									<FontAwesomeIcon icon={faSearch} aria-hidden="true" />
								</MagnifyingGlass>
								<SearchBar onChange={(e) => this.handleGameNameChange(e, 2)} value={this.state.gameName2} placeholder="Enter Game Name"></SearchBar>
							</SearchDiv>
						</SearchForm>
						<br></br>
						{this.state.poster2}
						{this.state.introduction2}
					</div>
				</div>
			</div>
		);
	}
}
