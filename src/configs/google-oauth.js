const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");
const Cart = require("../models/cart.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const email = profile._json.email;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: email,
        });
        const createdCart = await Cart.create({
          userID: user["_id"],
          meals: [],
        });
        const updatedUser = await User.findByIdAndUpdate(
          user["_id"],
          { cart: createdCart["_id"] },
          {
            new: true,
          }
        );
      }
      request.user = user;
      // check if user exists
      // if not create one

      // callback with num and hte user object
      return done(null, user);
    }
  )
);

module.exports = passport;
