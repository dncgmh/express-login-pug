var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.authenticated) return res.render('index', { title: req.session.name });
  return res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  if (req.session.authenticated == true) return res.redirect('/');
  return res.render('login', { title: 'Login page' });
});
router.post('/login', function(req, res, next) {
  let user = fs.readFileSync('./routes/user.json', 'utf8');
  user = JSON.parse(user);
  const { username, password } = req.body;
  if (user.username === username && user.password === password) {
    req.session.authenticated = true;
    req.session.name = user.username;
    return res.redirect('/');
  } else return res.render('login', { message: 'Login failed' });
});

module.exports = router;
