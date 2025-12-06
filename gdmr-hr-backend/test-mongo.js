import mongoose from 'mongoose';

const uri = "mongodb+srv://akshaymohan907410_db_user:akshaymohan907410@cluster0.xduqjdb.mongodb.net/?appName=Cluster0";

console.log("Testing connection...");

mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESS: Connection established!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("FAILURE:", err.message);
        process.exit(1);
    });
