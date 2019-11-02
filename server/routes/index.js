const passport = require('passport');
const usersController = require('../controllers').users;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the OpenRank API!',
    }));

    app.post('/api/login', usersController.login);

    app.post('/api/users', usersController.create);
    app.get('/api/users', usersController.list);
    app.get('/api/user', passport.authenticate('jwt', { session: false }), usersController.get);


    app.patch('/api/users/:id/roles', usersController.addUserRole);
    app.delete('/api/users/:id/roles', usersController.removeUserRole);



};
