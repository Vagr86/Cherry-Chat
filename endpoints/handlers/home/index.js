const UsersService = require('./../../../data/model/users');
const config = require('../../../common/config/env');
const meta = require('../../../common/meta');
const _assign = require('lodash').assign;

module.exports = (req, res) => {
    req.session.body = req.body;
    res.render('home', _assign({
        title: config.title,
        meta: meta.home,
        baseUrl: config.baseUrl,
        user: req.session.body
    }, req.locals));

    UsersService.createUser(
        req.session.email = req.body.email,
        req.session.password = req.body.password,
        {
            fullName: req.body.fullName,
            gender: req.body.gender,
            date: {
                year: req.body.year,
                month: req.body.month,
                day: req.body.day
            }
        })
        .then((user) => {
            return res.send(user);
        })
        .catch((err) => {
            return res.send(err);
        });

};
