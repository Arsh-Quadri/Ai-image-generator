import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('mongoDB connected'))
        .catch((error) => console.log(error))
}

export default connectDB;