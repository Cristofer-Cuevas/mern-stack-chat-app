import passport from "passport";
import fs from "fs";
import {ExtractJwt, Strategy} from "passport-jwt";
import User from "../models/User.js";

const JwtStrategy = Strategy;

const PUB_KEY = fs.readFileSync("id_rsa_pub.pem", {encoding: "utf8"}, import.meta.url);

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {

        const user = await User.findOne({_id: payload.sub});
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
);
