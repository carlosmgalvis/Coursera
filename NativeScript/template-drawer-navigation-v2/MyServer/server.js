const app = require('./src/app');
const { initializeDatabase } = require('./src/database/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Shows API: http://localhost:${PORT}/api/shows`);
      console.log(`Sales API: http://localhost:${PORT}/api/sales`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();