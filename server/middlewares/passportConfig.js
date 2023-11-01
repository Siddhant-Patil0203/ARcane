import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import * as dotenv from "dotenv";
dotenv.config();
import userModel from '../models/userModel.js';
import session from 'express-session';


const initializePassport = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());



  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.BASE_URL+'/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // Handle user data and pass it to the 'done' callback
    // Typically, you would save user data to your database here
    try {

      console.log("reched")
      
      let User = await userModel.findOne({ googleId: profile.id });
  
      // If user already exists, return the user
      if (User) {
        return done(null, User);
      }

      console.log(profile);
  
      // If user does not exist, create a new user record
      const result = await userModel.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
     });
    //  if(result){
    //   console.log("user created"+ result)
    //  }

     let newUser = await userModel.findOne({ googleId: profile.id })

     return done(null, newUser);
    }
    catch(err){
      return done(err);
    }
  }
));

passport.serializeUser((user, done )=>{
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
}

export default initializePassport;
