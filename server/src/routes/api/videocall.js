import { Router } from 'express';
import pkg from 'peerjs';
const { Peer } = pkg;
const router = Router();

// Route for creating a new Peer (client-side PeerJS connection)
router.get('/create', (req, res) => {
    const peer = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/peerjs',
    });
  
    peer.on('open', (id) => {
      console.log('Peer ID: ', id);
      res.json({ peerId: id });
    });
  
    peer.on('error', (err) => {
      console.error('Error in peer creation:', err);
      res.status(500).json({ error: 'Peer creation failed' });
    });
  });

router.post('/call', (req, res) => {
    // PeerJS call handling logic can go here
    // For now, just a simple response for incoming calls
    const { peerId, callData } = req.body;
    console.log(`Call request from peer: ${peerId}`);
    res.status(200).json({ message: 'Call handled', callData });
  });

export default router;
