const jwt = require('jsonwebtoken');

const User = require('../models').User;
const Role = require('../models').Role;
const UserRole = require('../models').UserRole;

module.exports = {
    create(req, res) {
        const { email, name, password } = req.body;
        return User
            .create({
                username: email,
                email,
                name,
                password,
            })
            .then(user => res.status(201).json({ data: user , message: 'User successfully got registered!'}))
            .catch(error => res.status(400).json({ data: error }));
    },
    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).json({ data: users }))
            .catch(error => res.status(400).json({ data: error }));
    },
    get(req, res) {
        return res.status(200).json({data: req.user});
    },
    login(req, res) {
        const { email, password } = req.body;
        return User
            .findOne({ where: { email } })
            .then(user => {
                if (user.password === password) {
                    const payload = {id: user.id};
                    const token = jwt.sign(payload, process.env.JWT_SECRET);
                    return res.json({ message: "ok", data: { token } });
                } else {
                    return res.status(401).json({ message: "Passwords did not match" });
                }
            })
            .catch(error => res.status(400).json({ data: error, message: 'No such user found' }));
    },

    addUserRole(req,res){
        const { value } = req.body;
        const id = req.params.id;
        return User
        .findOne({ where: { id } })
        .then(user => {
            Role
            .findOne({ where: { value } })
            .then(role => {
                  UserRole.create({
                    UserId:id,
                    RoleId:role.id,
                  });
                  res.status(200).json({message:'Role added to user' });
            } )
        } )
        .catch(error => res.status(400).json({ data: error, message: 'No such user found' }));
    },

    removeUserRole(req,res){
        const { value } = req.body;
        const id = req.params.id;
        return User
        .findOne({ where: { id } })
        .then(user => {
            Role
            .findOne({ where: { value } })
            .then(role => {
                  UserRole.destroy ({ where: { UserId:id,
                        RoleId:role.id }
                    
                  });
                  res.status(200).json({message:'Role removed from user' });
            } )
        } )
        .catch(error => res.status(400).json({ data: error, message: 'No such user found' }));
    },
}
