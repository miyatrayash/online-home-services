const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
require("dotenv").config()
var router = require("express").Router();


router.post("/register", async (req,res) => {
    const user = req.body;
    if(user)
    {
        const isTaken = await User.findOne({username: user.username})
        || await User.findOne({email: user.email})
            
        
        if(isTaken)
            res.json({error: "Username or email is already taken"})
        else {
            user.password = await bcrypt.hash(req.body.password,10)
    

            User.create({
                username: user.username.toLowerCase(),
                email: user.email.toLowerCase(),
                password: user.password
            })
            .then((data) => {
					localStorage.setItem("token", data.token);
                
                res.json(data)})
            .catch((err) => {
                 console.log(err);
                res.json(err)})
    console.log("here");

        }
    } else {
        res.json({error: "Empty Request"})
    }
     
})

router.post("/login", (req, res)=> {

    const userLoggingIn = req.body;
    console.log(userLoggingIn.username)
    if(userLoggingIn)
    {
        User.findOne({username: userLoggingIn.username})
        .then(dbUser => {
            if(!dbUser) {
                return res.json({
                    error: "Invalid Username or Password"
                })
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {

                if(isCorrect)
                {
                    const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                }

                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            if(err) return res.json({message: err})
                            // localStorage.setItem("token", token);

                            return res.json({
                                message: "Success",
                                token: "Bearer " + token
                            })
                        }
                    )
                } else {
                    return res.json({message: "Invalid Username or Password"})
                }
            })
        })
    }
})



function verifyJWT(req,res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    // console.log(token);
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}



router.get("/isUserAuth", verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})


module.exports = router;