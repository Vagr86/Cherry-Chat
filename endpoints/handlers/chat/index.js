const config = require('../../../common/config/env');
const meta = require('../../../common/meta');
const _assign = require('lodash').assign;

module.exports = (req, res) => {
  res.render('chat', _assign({
    title: config.title,
    meta: meta.signUp,
    baseUrl: config.baseUrl + '/messages'
  }, req.locals));
};
