const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const session = require('express-session');
const KnexStore = require('connect-session-knex')(session); // remember to curry & pass session

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');


const knex = require('../database/dbConfig.js');
const userRouter = require('../users-router')

const server = express();

const sessionConfig = {
	name: 'monster',
	secret: 'keep it secret, keep it safe!',
	resave: false,
	saveUninitialized: true, // GDPR compliance
	cookie: {
		maxAge: 1000 * 60 * 10,
		secure: false, // should be true in production
		httpOnly: true // true = can't touch cookie
	},
	store: new KnexStore({
		knex,
		tablename: 'sessions',
		createtable: true,
		sidfieldname: 'sid',
		clearInterval: 1000 * 60 * 15
	})
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig)) // turn on session middleware
server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
	res.json({ api: 'up'});
})

module.exports = server;
