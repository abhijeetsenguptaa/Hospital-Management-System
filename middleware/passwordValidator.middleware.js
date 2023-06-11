module.exports = {
    passwordValidator: async (req, res, next) => {
        try {
            const { password } = req.body;
            const smallPattern = /[a-z]/;
            const capitalPattern = /[A-Z]/;
            const digitPattern = /\d/;
            const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

            if (smallPattern.test(password) && capitalPattern.test(password) && digitPattern.test(password) && specialCharPattern.test(password) && password.length >= 8) {
                next()
            } else {
                res.status(403).send({
                    status: false,
                    msg: "Please Enter a Strong Password."
                })
            }
        } catch {
            res.status(404).send({
                status: false,
                msg: "Error occurred in password validation."
            })
        }
    }
}