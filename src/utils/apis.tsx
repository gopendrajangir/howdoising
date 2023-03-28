export const api =
  process.env.NODE_ENV === 'production'
    ? 'https://howdoising-server.onrender.com/'
    : 'http://localhost:8000/api/v1';

export const socketApi =
  process.env.NODE_ENV === 'production'
    ? 'https://howdoising-socket.onrender.com/'
    : 'http://localhost:8080';
