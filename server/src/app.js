import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import authRouter from './routes/api/auth.js';
import companiesRouter from './routes/api/companies.js';
import studentsRouter from './routes/api/students.js';
import jobsRouter from './routes/api/jobs.js';
import profileRouter from './routes/api/profile.js';
import uploadRes from './routes/api/uploadRoute.js';

connect('mongodb+srv://asasmit:2AeBB7VO5dc9iXTV@cluster0.pjcjr.mongodb.net/')
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

const app = express();
 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE,PATCH',  
  credentials: true,         
}));

app.use(session({
  secret: "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",
  resave: false,
  saveUninitialized: true,
}));


app.get('/api/peer/create', (req, res) => {
  const peer = new peer({
    host: 'localhost',
    port: 9000,
    path: '/peerjs', // Matches the path for PeerJS server
    secure: true, // Ensures the connection is secure if using SSL
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'turn:your_turn_server', username: 'username', credential: 'password' }, // Optional TURN server
      ],
    },
  });

  peer.on('open', (id) => {
    console.log('Peer created with ID:', id);
    res.json({ peerId: id }); // Send the peer ID back to the frontend
  });

  peer.on('error', (err) => {
    console.error('Error creating peer:', err);
    res.status(500).json({ error: 'Peer creation failed' });
  });
});

app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/user', authRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/', uploadRes );
// app.use('/api/peer',videoCall);

app.use((req, res) => res.status(404).send('404 - Not Found'));

export default app;
