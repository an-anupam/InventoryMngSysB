import passport from "passport";
import Response from "../common/response.js"

export const handelAdminAuthLogin = (req, res, next) => {

    let response = new Response();

    passport.authenticate(
        'userStrategy',
        function (error, user, info) {
            if (error) {
                response.setError(
                    "SE-AU-001",
                    "Internal server error",
                    null
                )
                return res.status(401).json(response);
            }
            if (!user) {
                response.setError(
                    "SE-AU-002",
                    info,
                    null
                )
                return res.status(401).json(response);
            }
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err)
                    response.setError(
                        "SE-AU-003",
                        "Internal server error",
                        null
                    )
                    return res.status(401).json(response);
                }
                response.setSuccess("Successfully signed-in.")
                res.header('Content-Type', 'application/json;charset=UTF-8')
                res.header('Access-Control-Allow-Credentials', true)
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept'
                )
                return res.status(200).json(response);
            });
        })(req, res, next);
}


export const handleAdminAuthLogout = async (req, res) => {
    let response = new Response();
    req.logout();
    req.session.destroy((err) => {
        console.log(err)
        if (err) {
            response.setError(
                "SE-AU-004",
                "Failed to sign-out.",
                null
            );
            res.status(400);
        }
        else {
            res.clearCookie('connect.sid');
            response.setSuccess("Successfully signed-out.");
        }
        res.json(response);
    })
}