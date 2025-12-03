const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  console.log("login user");
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  console.log("logged out user");
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUserToken('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};


apiRouter.get('/excuses', verifyAuth, async (_req, res) => {
  try {
    const excuses = await DB.getExcuses();
    res.send(excuses);
  } catch (err) {
    console.error('Error in GET /excuses:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRouter.post('/excuse', verifyAuth, (req, res) => {
  try {
    console.log('Incoming excuse:', req.body); // log the payload

    if (!req.body || !req.body.text) {
      return res.status(400).json({ error: 'Missing excuse text' });
    }

    excuses = updateExcuses(req.body, req.user.email); // pass user email
    res.json(excuses);
  } catch (err) {
    console.error('Error in /excuse:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function updateExcuses(newExcuse, userEmail) {
  DB.addExcuse(newExcuse,userEmail);
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return DB.getUser(value)
}

async function findUserToken(field, value) {
  if (!value) return null;

  return DB.getUserByToken(value)
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: isProd, // only secure in production
    httpOnly: true,
    sameSite: 'strict',
  });
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
