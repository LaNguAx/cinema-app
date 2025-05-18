export default function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('send-message', ({ message }) => {
      console.log(`💬 Message from ${socket.id}: ${message}`);

      io.emit('receive-message', {
        user: socket.id,
        message,
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
}
