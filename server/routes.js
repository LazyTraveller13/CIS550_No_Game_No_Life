var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- (Dashboard) ---- */

function getRandomGames(req, res) {
  var numsGame = 12;
  var query = "SELECT Website.id FROM Game, Website WHERE Game.id = Website.id ORDER BY rand() Limit " + numsGame;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getPosters(req, res) {

  var http = require('http');
  var gvid = req.params.gvid;
  var query = `select DISTINCT Game.name AS name, Website.vg_url AS vg_url, Website.photo_url AS photo_url From Game, Website Where '${gvid}' = Website.id AND Game.id ='${gvid}'`

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getSearch(req, res) {
  var gname = req.params.search;
  var query = `select Game.name AS name2, Website.vg_url AS vg2_url, Website.photo_url AS photo2_url From Game, Website Where Game.id = Website.id AND Game.name LIKE'${gname}'`
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- (Recommendations) ---- */
function getRecs(req, res) {
  var inputTitle = req.params.gameName;
  var query = `
   (select * from (
    (select t6.id, name, release_year, user_rating, website_rating, vg_url, photo_url from (
    select Game.id, name, release_year from Game, (
    select t4.id from (
    select id, count(genre_name) as gen_count from (
    select t2.id, t2.genre_name from
    (select genre_name from Game_genre
    where game_id = (select id from Game
    where lower(name) = lower("${inputTitle}"))) t1,
    (select * from Game join Game_genre on id = game_id) t2
    where t1.genre_name = t2.genre_name and t2.name != lower("${inputTitle}")
    ) t3 group by id
    ) t4 where t4.gen_count >=
    (select count(genre_name) as gen_count from (
    select genre_name from Game_genre
    where game_id = (select id from Game
    where lower(name) = lower("${inputTitle}"))
    ) t1)
    ) t5 where Game.id = t5.id
    ) t6 join Rating on t6.id = Rating.id
    join Website on t6.id = Website.id
    order by user_rating DESC, website_rating DESC, release_year DESC
    LIMIT 10)) t7 where sqrt(power((user_rating - (select user_rating from Rating
    where id = (select id from Game where lower(name) = lower('${inputTitle}')))), 2)) <= 1)
    union
    (select * from (
    (select t6.id, name, release_year, user_rating, website_rating, vg_url, photo_url from (
    select Game.id, name, release_year from Game, (
    select t4.id from (
    select id, count(plat_name) as plat_count from (
    select t2.id, t2.plat_name from
    (select plat_name from Game_plat
    where game_id = (select id from Game where lower(name) = lower('${inputTitle}'))) t1,
    (select * from Game join Game_plat on id = game_id) t2
    where t1.plat_name = t2.plat_name and t2.name != lower('${inputTitle}')) t3
    group by id) t4
    where t4.plat_count >=
    (select count(plat_name) as plat_count from (
    select plat_name from Game_plat
    where game_id = (select id from Game
    where lower(name) = lower('${inputTitle}'))
    ) t1)) t5 where Game.id = t5.id) t6
    join Rating on t6.id = Rating.id
    join Website on t6.id = Website.id
    order by user_rating desc, website_rating desc, release_year desc
    limit 10)) t7 where sqrt(power((user_rating - (select user_rating from Rating
    where id = (select id from Game where lower(name) = lower('${inputTitle}')))), 2)) <= 1)
    order by user_rating DESC, website_rating DESC, release_year DESC;

    select t2.id, t2.name, t2.release_year, vg_url, photo_url from Website, (
    select Game.id, Game.name, Game.release_year from Game, (
    select * from Game where lower(Game.name) = lower('${inputTitle}')) t1
    where find_in_set(substring_index(t1.developer, ',', 1), Game.developer)
    or find_in_set(substring_index(t1.developer, ',', -1), Game.developer)) t2
    where t2.name != lower('${inputTitle}') and t2.id = Website.id
    order by release_year desc limit 20;
   `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (comparison) ---- */
function getGameInfo(req, res) {
  var inputTitle = req.params.gameName;
  var query = `
    select name from Game where lower(name) = lower('${inputTitle}');
    select release_year from Game where lower(name) = lower('${inputTitle}');
    select user_rating, website_rating from Rating where id = (select id from Game where lower(name) = lower('${inputTitle}'));
    select plat_name from Game_plat where game_id = (select id from Game where lower(name) = lower('${inputTitle}'));
    select class_name from Game_class where game_id = (select id from Game where lower(name) = lower('${inputTitle}'));
    select genre_name from Game_genre where game_id = (select id from Game where lower(name) = lower('${inputTitle}'));
    select vg_url, photo_url from Website where id = (select id from Game where lower(name) = lower('${inputTitle}'))
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- (discover) ---- */
function getDecades(req, res) {
  var query = `
    select distinct (floor(year/10)*10) as decade
		from (select distinct release_year
		as year from Game
		where release_year <> 0 and
		release_year <> 50
		order by release_year) y
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getGenre(req, res) {
  var query = `
    SELECT DISTINCT name
    FROM Genre
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getplat(req, res) {
  var query = `
    SELECT DISTINCT name
    FROM Platform
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getclass(req, res) {
  var query = `
    SELECT DISTINCT name
    FROM Classification
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function discover(req, res) {
  var genre1 = req.param('l2');
  var plat1 = req.param('l3');
  var releaseYear = req.param('l1');
  var class1 = req.param('l4');
  var query = `
      select G.name AS Name, R.user_rating AS user_rating, R.website_rating AS website_rating
      FROM Game G
      JOIN Game_plat GP ON G.id = GP.game_id
      JOIN Game_genre GG ON G.id = GG.game_id
      JOIN Game_class GC ON G.id = GC.game_id
      JOIN Rating R ON R.id = G.id
      WHERE G.release_year = '${releaseYear}' AND GG.genre_name = '${genre1}' AND GP.plat_name = '${plat1}' AND GC.class_name = '${class1}'
      ORDER BY R.user_rating DESC, R.website_rating DESC
      LIMIT 10
  `
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

};
/* ---- (user) ---- */
function registerResponse(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var check = 'select password from user_info where username = "' + username + '"';
  var register = "insert into user_info (username, password) values (\"" + username + "\",\"" + password + "\");";
  connection.query(check, function (err, result) {
    var message = JSON.stringify(result);
    if (message.length == 2) {
      connection.query(register, function (err) {
        if (err) console.log("Insert error: ", err);
        else {
          res.json({
            name: username,
            status: 'success'
          });
        }
      });
    } else {
      res.json({
        status: 'fail'
      });
      console.log("The user already exist!");
    }
  });
};

function loginResponse(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var check = 'select password from user_info where username = "' + username + '"';
  connection.query(check, function (err, result) {
    var message = JSON.stringify(result);
    if (message.length == 2) {
      res.json({
        status: 'unexist'
      });
    } else {
      message = JSON.parse(message);
      if (err) {
        res.json({
          status: 'error'
        });
      }
      if (message[0].password == password) {
        res.json({
          name: username,
          status: 'success'
        });
      } else {
        res.json({
          status: 'fail'
        });
      }
    }
  });
};
// The exported functions, which can be accessed in index.js.
module.exports = {
  getGameInfo: getGameInfo,
  getRecs: getRecs,
  getDecades: getDecades,
  discover: discover,
  getPosters: getPosters,
  getRandomGames: getRandomGames,
  getSearch: getSearch,
  getGenre: getGenre,
  getclass: getclass,
  getplat: getplat,
  registerResponse: registerResponse,
  loginResponse: loginResponse
}