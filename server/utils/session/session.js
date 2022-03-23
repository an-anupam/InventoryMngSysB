import MongoStore from "connect-mongo";

export const generateSessionOptions = async () => {

    let uri = "mongodb+srv://anupam:Odnh7NJvreuxljxC@cluster0.gcyb5.mongodb.net/myFirstDatabse?retryWrites=true&w=majority"

    const sessionStore = await MongoStore.create({
        mongoUrl : uri,
        secret: 'keyboard cat'
    });

    return {
        secret: "secret" ,
        saveUninitialized: false,
        store: sessionStore,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 60, // Valid till 1 hours
            sameSite: "none",
            secure: false
        }
    }
}