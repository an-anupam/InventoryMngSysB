import userService from "../user/user.service.js";

export const serializeUser = (user, done) => {
    done(null, {
        userID: user._id,
        userType: 'USER',
    });
};

export const deserializeUser = async (userObject, done) => {
    try {
        let user = await userService.getAdminByAdminID(userObject.userID);

        if (user === null) {
            return done(null, false, {
                message: 'No user with this id found.',
            });
        }

        return done(null, user);
    } catch (e) {
        return done(e);
    }
};