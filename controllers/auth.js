var express = require('express');
var router = express.Router();
var passport = require('../config/ppConfig');

var db = require('../models');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  db.user.findOrCreate({
    where:{email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created){
    if(created){
      password.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and loggin in'
      })(req, res);
    }else{
      req.flash('error', 'emaill alreasy exist');
      res.redirect('/auth/signup');
    }
  }).catch(function(error){
    req.flash('error', 'an error occurred: ' + error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'invalid username and / or password',
  sucessFlash: 'you ligge in'
});


router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'logged out');
  res.redirect('/');
});








module.exports = router;
