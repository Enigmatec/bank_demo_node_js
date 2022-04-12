const { unauthorized } = require("../status/Status");

const verify_role = (...role) => {
    return (req, res, next) => {
        const auth_role = req.user.role;

        console.log(auth_role);
        const allowed_role = [...role];
        console.log(`allowed role:${allowed_role}`);
        if(allowed_role.includes(auth_role)) {
            return next();
        }
        return res.status(403).json(unauthorized())
    }
}


module.exports = verify_role;