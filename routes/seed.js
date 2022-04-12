const { Router } = require('express')
const router = Router();
const User = require('../models/user');
const { created } = require('../status/Status');


router.post('/seed', async (req, res) => {
    try {
        const seed_admin = User.create({
            firstname: 'admin',
            lastname: 'admin',
            email: 'admin@admin.com',
            role: 'admin',
            password: 'password'
        });
        res.status(201).json(created({message: "admin data seeded successfully"}));
    } catch (error) {
        console.log(error);
    }
})

module.exports = router