import { Strategy as LocalStrategy } from 'passport-local';
import {mongoClient} from "../../utils/database/mongo.databse.js";

const options = {
    usernameField: "emailID",
    passwordField: "password",
}

const userAuthServiceForLocalStrategy = async (emailID, password, done) => {

    try {

        let user = await mongoClient.db().collection("users").findOne({ emailID: emailID });

        if (user === null) {
            return done(null, false, "emailID is invalid.");
        }

        if (user.password !== password) {
            return done(null, false, "Password is invalid.");
        }

        return done(null, user);

    } catch (e) {
        return done(e);
    }
}

const userStrategy = new LocalStrategy(options, userAuthServiceForLocalStrategy);

export default userStrategy