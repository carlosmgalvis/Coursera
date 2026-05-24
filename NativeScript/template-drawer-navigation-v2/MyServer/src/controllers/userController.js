const { getDatabase } = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, name, phone, deviceId } = req.body;
    const db = await getDatabase();

    // Check if user exists
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      `INSERT INTO users (email, password, name, phone, deviceId)
       VALUES (?, ?, ?, ?, ?)`,
      [email, hashedPassword, name, phone, deviceId]
    );

    const token = jwt.sign(
      { userId: result.lastID, email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      data: {
        userId: result.lastID,
        email,
        name,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, deviceId } = req.body;
    const db = await getDatabase();

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Update device ID
    if (deviceId) {
      await db.run('UPDATE users SET deviceId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [deviceId, user.id]);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const loginWithDevice = async (req, res) => {
  try {
    const { deviceId } = req.body;
    const db = await getDatabase();

    const user = await db.get('SELECT * FROM users WHERE deviceId = ?', [deviceId]);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Device not recognized. Please login first.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getUserData = async (req, res) => {
  try {
    const db = await getDatabase();
    const user = await db.get(
      'SELECT id, email, name, phone, deviceId, createdAt FROM users WHERE id = ?',
      [req.userId]
    );
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const syncUserData = async (req, res) => {
  try {
    const db = await getDatabase();
    const { favorites, sales, lastSync } = req.body;
    
    // Sync favorites
    if (favorites && favorites.length > 0) {
      await db.run('DELETE FROM user_favorites WHERE userId = ?', [req.userId]);
      for (const showId of favorites) {
        await db.run(
          'INSERT INTO user_favorites (userId, showId) VALUES (?, ?)',
          [req.userId, showId]
        );
      }
    }
    
    // Get updated data
    const userFavorites = await db.all(
      'SELECT showId FROM user_favorites WHERE userId = ?',
      [req.userId]
    );
    
    const userSales = await db.all(
      `SELECT * FROM sales WHERE userId = ? AND saleDate > ? ORDER BY saleDate DESC`,
      [req.userId, lastSync || new Date(0).toISOString()]
    );
    
    res.json({
      success: true,
      data: {
        favorites: userFavorites.map(f => f.showId),
        sales: userSales,
        syncDate: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { register, login, loginWithDevice, getUserData, syncUserData };