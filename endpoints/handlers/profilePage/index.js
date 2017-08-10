const UsersService = require('./../../../data/model/users');
const config = require('../../../common/config/env');
const meta = require('../../../common/meta');

const _assign = require('lodash').assign;

module.exports = (req, res) => {

    UsersService.getUserData(req.body.email, req.body.password)
        .then((user) => {
            res.render('profilePage', _assign({
                title: config.title + ' | My profile',
                baseUrl: config.baseUrl + '/myProfile',
                meta: meta.signUp,
                user: user
            }, req.locals));
            return res.send(user);
        })
        .catch((err) => {
            return res.send(err);
        });
};
