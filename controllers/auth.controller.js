const User = require("../models/user");
const bcrypt = require("bcryptjs");
const _jwt = require("jsonwebtoken");

const jwt = process.env.JWT;

exports.createUser = async (req, res) => {
  /* 	#swagger.tags = ['Admin']
        #swagger.description = 'creates a new user, the phone number field should not begin with zero' 

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/user' }
        } */

  /* #swagger.responses[201] = {
                    schema: { $ref: '#/definitions/userRes' }
            } */
  try {
    const { user_name, password: plainTextPassword, phone } = req.body;
    const salt = Math.floor(Math.random() * 10);
    const password = await bcrypt.hash(plainTextPassword, salt);

    await User.findOne({ user_name: user_name }, (err, data) => {
      if (err) return res.status(500).send({ error: err });
      if (data) {
        console.log(data);
        return res.status(400).send({ error: "user already exists" });
      }
      const name = user_name.toLowerCase();
      const newUser = User({ user_name: name, password, phone });
      newUser
        .save()
        .then((data) => {
          console.log(data);
          res.status(201).send(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: err });
        });
    })
      .lean()
      .clone();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

const verifyLogin = async (username, password) => {

  try {
    const user = await User.findOne({ user_name: username }).lean();
    if (!user) {
      console.log(user);
      return { status: "error", error: "user not found" };
    }

    console.log(jwt);

    if (await bcrypt.compare(password, user.password)) {
      //   creating a JWT token
      const token = _jwt.sign({ id: user._id, username: user.user_name }, jwt, {
        expiresIn: "24h",
      });
      console.log(jwt);
      return { status: "ok", data: token, isAdmin: user.isAdmin };
    }

    return { status: "error", error: "invalid password" };
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
      /* 	#swagger.tags = ['User']
        #swagger.description = 'login' 

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/login' }
        } */

        /* #swagger.responses[200] = {
                    schema: { $ref: '#/definitions/otherLogin' }
            } */

  
  try {
    const { user_name, password } = req.body;
    const resp = await verifyLogin(user_name, password);

    if (resp.status === "error")
      return res.status(404).send({ error: resp.error });

    if (resp.status === "ok")
      return res.status(200).send({ token: resp.data, isAdmin: resp.isAdmin });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};
