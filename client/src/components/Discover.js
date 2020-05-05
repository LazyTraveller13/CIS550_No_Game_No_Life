import React from 'react';
import PageNavbar from './PageNavbar';
import DiscoverRow from './DiscoverRow';
import '../style/Discover.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';
import { Redirect } from 'react-router-dom';

export default class Discover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDecade: "",
			selectedGenres: "",
			selectedPaltform: "",
			selectedClassification: "",
			decades: [],
			attributes: [],
			Genres: [],
			platform: [],
			class: []
		};
		this.submitAttri = this.submitAttri.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handlePlatChange = this.handlePlatChange.bind(this);
		this.handleClassChange = this.handleClassChange.bind(this);
	}
	// when page loading, call those function
	componentDidMount() {
		this.componentYear();
		this.componentGenre();
		this.componentPlatform();
		this.componetClass();
	}
	// choose the year when game release
	componentYear() {
		fetch("http://localhost:8081/decades/decade",
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(decadeList => {
				if (!decadeList) return;
				let decadeDivs = decadeList.map((decadeObj, i) =>
					<option value={decadeObj.decade}>{decadeObj.decade}</option>);
				this.setState({
					decades: decadeDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	}
	// Choose the classification which game belongs to
	componetClass() {
		fetch("http://localhost:8081/Class/class",
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(classList => {
				if (!classList) return;

				let classDivs = classList.map((classObj, i) =>
					<option value={classObj.name}>{classObj.name}</option>);
				this.setState({
					class: classDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	}
	// Choose the genre which game belongs to
	componentGenre() {
		fetch("http://localhost:8081/showGenre/Genres",
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(GenreList => {
				if (!GenreList) return;
				let GenreDivs = GenreList.map((genreObj, i) =>
					<option value={genreObj.name}>{genreObj.name}</option>);
				this.setState({
					Genres: GenreDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	}
	// Choose the platform which game belongs to
	componentPlatform() {
		console.log("1");
		fetch("http://localhost:8081/showPlat/plat",
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(PlatList => {
				if (!PlatList) return;
				console.log(PlatList);
				let PlatDivs = PlatList.map((platObj, i) =>
					<option value={platObj.name}>{platObj.name}</option>);
				this.setState({
					platform: PlatDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});

	}
	handleGenreChange(e) {
		this.setState({
			selectedGenres: e.target.value,
		});
	}
	handleYearChange(e) {
		this.setState({
			selectedDecade: e.target.value,
		});
	}
	handlePlatChange(e) {
		this.setState({
			selectedPaltform: e.target.value
		});
	}
	handleClassChange(e) {
		this.setState({
			selectedClassification: e.target.value
		});
	}
	// Filter the game which belongs to the attributes you choose
	submitAttri(e) {
		e.preventDefault();
		console.log(this.state.selectedClassification);
		fetch("http://localhost:8081/bestAtrribute/attris/" + this.state.selectedDecade + "&" + this.state.selectedGenres + "&" + this.state.selectedPaltform + "&" + this.state.selectedClassification,
			{
				method: 'GET'// The type of HTTP request.

			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(attrList => {
				if (!attrList) return;
				let attrDivs = attrList.map((attrObj, i) =>
					<DiscoverRow user_rating={attrObj.user_rating} Name={attrObj.Name} website_rating={attrObj.website_rating} />
				);
				this.setState({
					attributes: attrDivs
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
			<div className="Discover">
				<PageNavbar active="discover" />
				<div className="container bestgenres-container">
					<div className="jumbotron bg-transparent">
						<div className="GF">Game filter</div>
						<div className="years-container">
							<div className="dropdown-container">
								<form>
									<select value={this.state.selectedDecade} onChange={this.handleYearChange} className="dropdown" id="decadesDropdown">
										<option> -- select an option -- </option>
										{this.state.decades}
									</select>
									<select value={this.state.selectedGenres} onChange={this.handleGenreChange} className="dropdown" id="decadesDropdown">
										<option> -- select an option -- </option>
										{this.state.Genres}
									</select>
									<select value={this.state.selectedPaltform} onChange={this.handlePlatChange} className="dropdown" id="decadesDropdown">
										<option> -- select an option -- </option>
										{this.state.platform}
									</select>
									<select value={this.state.selectedClassification} onChange={this.handleClassChange} className="dropdown" id="decadesDropdown">
										<option> -- select an option -- </option>
										{this.state.class}
									</select>
									<button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitAttri}>Submit</button>
								</form>
							</div>
						</div>
					</div>
					<div class="jumbotron bg-transparent" >
						<div className="discover-container">
							<div className="attri">
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>User_rating</strong></div>
								<div className="header"><strong>Website_rating</strong></div>
							</div>
							<div className="res-container" id="results">
								{this.state.attributes}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}