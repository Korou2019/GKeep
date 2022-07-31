require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(console.log('Connected to mongoDB'))
    .catch(err => {
        console.log(err);
    })

app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port: 5000`);
});