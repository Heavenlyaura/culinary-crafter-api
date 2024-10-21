const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const { createUser, findById } = require("../model/users");
// const { createUser } = require("../model/createUser");

async function googleAuth(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        let user = await createUser(newUser);
        done(null, user);
      }
    )
  );
  // Serialize and deserialize user (required for session)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findById(id);
      done(null, user);
    } catch (err) {
      done(err, null); // Handling errors gracefully
    }
  });
}

async function githubAuth(passport) {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },

      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          displayName: profile.username,
          firstName: profile.name?.givenName || null,
          lastName: profile.name?.familyName || null,
          profile: profile.profileUrl,
          image: profile.photos?.[0]?.value || null,
        };

        console.log(profile);

        let user = await createUser(newUser);
        done(null, user);

        console.log(profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findById(id);
      done(null, user);
    } catch (err) {
      done(err, null); // Handling errors gracefully
    }
  });
}
module.exports = { googleAuth, githubAuth };
