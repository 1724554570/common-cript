var indexRouter = require('./index');
var usersRouter = require('./users');
var filesRouter = require('./files');

var MainRouter = (application) => {
    application.use('/', indexRouter);
    application.use('/', filesRouter);
    application.use('/users', usersRouter);    
};

module.exports = MainRouter;