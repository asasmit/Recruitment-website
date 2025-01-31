import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Peer from 'peerjs';

const VideoChat = () => {
  const [peerId, setPeerId] = useState('');
  const [isCallInitiated, setIsCallInitiated] = useState(false);
  const myVideo = useRef(null);
  const peerVideo = useRef(null);
  const localStream = useRef(null);
  const peer = useRef(null);

  useEffect(() => {
    // Create PeerJS peer when the component is mounted
    axios.get('/api/peer/create')
      .then((response) => {
        setPeerId(response.data.peerId);
        initializePeer(response.data.peerId);
      })
      .catch((error) => {
        console.error('Error creating peer:', error);
      });
  }, []);

  const initializePeer = (id) => {
    peer.current = new Peer(id, {
      host: 'localhost',
      port: 9000,
      path: '/peerjs',  // Matches the path of the PeerServer
    });

    peer.current.on('open', (peerId) => {
      console.log('Peer created with ID:', peerId);
    });

    peer.current.on('call', (call) => {
      console.log('Incoming call from peer:', call.peer);
      call.answer(localStream.current);
      call.on('stream', (stream) => {
        peerVideo.current.srcObject = stream;
      });
    });

    // Get local media (video + audio)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        if (myVideo.current) myVideo.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing media devices:', err));
  };

  const handleCall = () => {
    const peerIdToCall = prompt('Enter Peer ID to call');
    if (peerIdToCall) {
      setIsCallInitiated(true);
      const call = peer.current.call(peerIdToCall, localStream.current);
      call.on('stream', (stream) => {
        peerVideo.current.srcObject = stream;
      });
    }
  };

  return (
    <div>
      <h2>Video Chat</h2>
      <div style={{ display: 'flex' }}>
        <video ref={myVideo} autoPlay muted style={{ width: '300px', margin: '10px' }} />
        <video ref={peerVideo} autoPlay style={{ width: '300px', margin: '10px' }} />
      </div>
      <p>Your Peer ID: {peerId}</p>
      {!isCallInitiated && (
        <button onClick={handleCall}>Call a Peer</button>
      )}
    </div>
  );
};

export default VideoChat;