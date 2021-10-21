const jwt = require('jsonwebtoken')



function Verify(req, res, next) {
    //getting auth header
    const bearerHeader = req.headers['authorization']
    //console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        //getting auth token
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        VerifyToken(req.token, (err, userData) => {
            //setting userdetail in `req.user` to use it in other files
            if (!err) {
                req.user = userData.user;
                next();
            }
            else{
                res.json({success:false})
            }
            
        })
    } else {
        console.log("no token req received.Logging out...")
        res.send({
            error: {
                logout: true
            }
        });
    }
}

function VerifyToken(token, callback) {
    //verifying token
    console.log(token)
    jwt.verify(token, process.env.SECRET_KEY, {
        algorithm: 'RS256'
    }, async (err, authData) => {
        //console.log("authdata",authData);
        if (err != null) {
            console.log(err)
            callback({
                logout: true
            }, null);
        } else {
            callback(null, authData);
        }
    })
}

function AssignToken(user, callback) {
    //assigning token
    jwt.sign({
        user: user
    }, process.env.SECRET_KEY, (err, token) => {
        if (err != null) {
            console.log(err)
            callback(err, null)
        } else {
            //console.log("Token assigned", token)
            callback(null, token)
        }
    })
}

function InputVerification(req, res,next) {
    console.log(req.body)
    const { email, password } = req.body.data;
    //check if email is valid
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !re.test(String(email).toLowerCase())) {
        return res.json({
            error: "Please add a valid email address"
        })
    }
    //check if password is valid
    if (!password) {
        res.json({
            error: "Please enter your password"
        })
    }
    next();

}
module.exports = {
    Verify,
    AssignToken,
    InputVerification
}
