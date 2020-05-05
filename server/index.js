const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */
/* ---- (Dashboard) ---- */
app.get('/ShowGame/gameId', routes.getRandomGames);

app.get('/:gvid', routes.getPosters);

app.get('/Dashboard/:search', routes.getSearch);

/* ---- (Recommendations) ---- */
app.get('/recommendations/:gameName', routes.getRecs);

/* ---- (comparison) ---- */
app.get('/getGameInfo/:gameName', routes.getGameInfo);

/* ---- (discover) ---- */
app.get('/decades/decade', routes.getDecades);

app.get('/showGenre/Genres', routes.getGenre);

app.get('/showPlat/plat', routes.getplat);

app.get('/Class/class', routes.getclass);

app.get('/bestAtrribute/attris/:l1&:l2&:l3&:l4', routes.discover);
/* ---- (user) ---- */

app.post('/register', routes.registerResponse);
app.post('/login', routes.loginResponse);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});