
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error("Please define the mongoDB url in your .env file");
};

let cached = global.mongooseConn;
if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null };
}
export async function mongoConnection() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoUrl).then((mongoose) => (mongoose))
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
