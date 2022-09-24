import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.URI_MONGODB);
        console.log('MongoDb Connected');
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1);
    }
};

export default connectDatabase;
