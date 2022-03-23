import { MongoClient } from "mongodb";

// db credentials
// username anupam
// password Odnh7NJvreuxljxC
export let mongoClient = null;

export const initMongoDB = async () => {

    let uri = "mongodb+srv://anupam:Odnh7NJvreuxljxC@cluster0.gcyb5.mongodb.net/myFirstDatabse?retryWrites=true&w=majority"
    try {

        const client = new MongoClient(uri, {
            connectTimeoutMS: 5000,
            useUnifiedTopology: true
        });

        mongoClient = await client.connect();

    } catch (e) {
        process.kill(process.pid, 'SIGTERM');
    }

}