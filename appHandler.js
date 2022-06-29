var db = require('../models')
var bCrypt = require('bcrypt')
const exec = require('child_process').exec;
var mathjs = require('mathjs')
var libxmljs = require("libxmljs");
var serialize = require("node-serialize")
const Op = db.Sequelize.Op

module.exports.userSearch = function (req, res) {
	var query = "SELECT name,id FROM Users WHERE login='" + req.body.login + "'";
	db.sequelize.query(query, {
		model: db.User
	}).then(user => {
		if (user.length) {
			var output = {
				user: {
					name: user[0].name,
					id: user[0].id
				}
			}
			res.render('app/usersearch', {
				output: output
			})
		} else {
			req.flash('warning', 'User not found')
			res.render('app/usersearch', {
				output: null
			})
		}
	}).catch(err => {
		req.flash('danger', 'Internal Error')
		res.render('app/usersearch', {
			output: null
		})
	})
}
