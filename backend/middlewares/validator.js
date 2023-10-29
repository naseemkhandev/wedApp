// Middleware

function validator(ajvCheck) {
    return (req, res, next) => {
        const validData = ajvCheck(req.body);
        if (!validData) {
            const message = ajvCheck.errors;
            res.status(400).json(message);
        }else{
            next();
        }
    };
}

module.exports = validator;
