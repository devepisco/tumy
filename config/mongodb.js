const mongoose = require('mongoose');
const db_url = process.env.MONGO_URI;

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            db_url,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            },
            (err) => {
                let status = '';
                if(err) {
                    status = `*    Error connecting to DB: ${err}\n****************************\n`
                };
                status = `*    DB Connection: OK\n****************************\n`
                if (process.env.NODE_ENV === 'development') {
                  // Prints initialization
                  console.log(status)
                };
            }
        )
    };
    
    connect();

    mongoose.connection.on('error', console.log)
    mongoose.connection.on('disconnected', connect)
}