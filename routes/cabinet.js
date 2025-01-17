const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const passport = require("passport");

const router = express.Router();

const Users = require("../helpers/sequelizeInit").Users;

require("../helpers/passport");

const authenticate = passport.authenticate("jwt", {
  session: true
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/cabinet.html"));
});

router.post("/", authenticate, (req, res) => {
  const publicKey = fs.readFileSync("./public.pem");

  const token = JSON.parse(req.body.token);
  console.log(req.user);

  jwt.verify(
    token,
    publicKey,
    {
      algorithms: ["RS256"]
    },
    (err, decoded) => {
      if (err || !decoded.id) return res.status(422).send("Wrong login or password");
      if (Math.floor(Date.now() / 1000) > decoded.iat) {
        return res.status(419).send("Token lifecycling end");
      }
      Users.findAll({
        where: {
          id: decoded.id
        }
      }).then(user => {
        if (user.length) {
          res.send(JSON.stringify(user[0]));
        } else {
          res.status(422).send("Wrong login or password");
        }
      });
    }
  );
  //if (req.body === null) return res.status(400).end();
});

module.exports = router;
