const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

async function initializeDatabase() {
  try {
    const db = await open({
      filename: path.join(__dirname, '../../database.sqlite'),
      driver: sqlite3.Database
    });

    // Enable foreign keys
    await db.exec('PRAGMA foreign_keys = ON');

    await db.exec(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        deviceId TEXT UNIQUE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Shows table
      CREATE TABLE IF NOT EXISTS shows (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        genre TEXT NOT NULL,
        title TEXT NOT NULL UNIQUE,
        image TEXT,
        url TEXT,
        description TEXT,
        ticketPrice REAL NOT NULL,
        duration INTEGER DEFAULT 120,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Show details table
      CREATE TABLE IF NOT EXISTS show_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        showId INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        displayOrder INTEGER DEFAULT 0,
        FOREIGN KEY (showId) REFERENCES shows(id) ON DELETE CASCADE
      );

      -- Show schedules table (date and time specific)
      CREATE TABLE IF NOT EXISTS show_schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        showId INTEGER NOT NULL,
        scheduleDateTime DATETIME NOT NULL,
        availableTickets INTEGER NOT NULL,
        totalTickets INTEGER NOT NULL,
        isActive INTEGER DEFAULT 1,
        FOREIGN KEY (showId) REFERENCES shows(id) ON DELETE CASCADE,
        UNIQUE(showId, scheduleDateTime)
      );

      -- User favorites table
      CREATE TABLE IF NOT EXISTS user_favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        showId INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (showId) REFERENCES shows(id) ON DELETE CASCADE,
        UNIQUE(userId, showId)
      );

      -- Sales table
      CREATE TABLE IF NOT EXISTS sales (
        id TEXT PRIMARY KEY,
        userId INTEGER NOT NULL,
        scheduleId INTEGER NOT NULL,
        showId INTEGER NOT NULL,
        showTitle TEXT NOT NULL,
        scheduleDateTime DATETIME NOT NULL,
        quantity INTEGER NOT NULL,
        unitPrice REAL NOT NULL,
        totalAmount REAL NOT NULL,
        paymentMethod TEXT NOT NULL,
        saleDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (scheduleId) REFERENCES show_schedules(id)
      );

      -- Sync queue for offline operations
      CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        operation TEXT NOT NULL,
        data TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        syncedAt DATETIME,
        status TEXT DEFAULT 'pending',
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      -- Indexes for performance
      CREATE INDEX IF NOT EXISTS idx_schedules_date ON show_schedules(scheduleDateTime);
      CREATE INDEX IF NOT EXISTS idx_schedules_show ON show_schedules(showId);
      CREATE INDEX IF NOT EXISTS idx_sales_user ON sales(userId);
      CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(saleDate);
      CREATE INDEX IF NOT EXISTS idx_sales_schedule ON sales(scheduleId);
      CREATE INDEX IF NOT EXISTS idx_favorites_user ON user_favorites(userId);
      CREATE INDEX IF NOT EXISTS idx_sync_queue_user ON sync_queue(userId);
      CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status);
    `);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await initializeDatabase();
  }
  return dbInstance;
}

module.exports = { getDatabase, initializeDatabase };