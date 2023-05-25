const passport = require("passport");
const local = require("passport-local");
const userModel = require("../../dao/model/user.model.js");
const bcrypt = require("bcrypt");

const GitHubStrategy = require("passport-github2");

const LocalStrategy = local.Strategy;

const { clientID, clientSecret, callbackUrl } = require("../../config.js");

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
            };
            let result = await userModel.create(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;

          let user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: bcrypt.hashSync(req.body.password, 10),
          };

          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("Error User not Found" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) return done(null, false);
          const comparePassword = bcrypt.compareSync(password, user.password);

          if (!comparePassword) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

module.exports = initializePassport;
