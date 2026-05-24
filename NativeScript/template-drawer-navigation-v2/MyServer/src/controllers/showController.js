const { getDatabase } = require('../database/database');

const getAllShows = async (req, res) => {
  try {
    const db = await getDatabase();
    const shows = await db.all('SELECT * FROM shows ORDER BY title');
    
    // Get details and schedules for each show
    for (const show of shows) {
      show.details = await db.all(
        'SELECT title, body FROM show_details WHERE showId = ? ORDER BY displayOrder',
        [show.id]
      );
      
      // Get future schedules only
      show.schedules = await db.all(
        `SELECT id, scheduleDateTime, availableTickets, totalTickets 
         FROM show_schedules 
         WHERE showId = ? 
         AND scheduleDateTime >= datetime('now')
         AND isActive = 1
         ORDER BY scheduleDateTime`,
        [show.id]
      );
    }
    
    res.json({ success: true, data: shows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getShowById = async (req, res) => {
  try {
    const db = await getDatabase();
    const show = await db.get('SELECT * FROM shows WHERE id = ?', [req.params.id]);
    
    if (!show) {
      return res.status(404).json({ success: false, error: 'Show not found' });
    }
    
    show.details = await db.all(
      'SELECT title, body FROM show_details WHERE showId = ? ORDER BY displayOrder',
      [show.id]
    );
    
    show.schedules = await db.all(
      `SELECT id, scheduleDateTime, availableTickets, totalTickets 
       FROM show_schedules 
       WHERE showId = ? 
       AND scheduleDateTime >= datetime('now')
       AND isActive = 1
       ORDER BY scheduleDateTime`,
      [show.id]
    );
    
    res.json({ success: true, data: show });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getFavorites = async (req, res) => {
  try {
    const db = await getDatabase();
    const favorites = await db.all(
      `SELECT s.* FROM shows s
       INNER JOIN user_favorites uf ON uf.showId = s.id
       WHERE uf.userId = ?
       ORDER BY s.title`,
      [req.userId]
    );
    
    for (const show of favorites) {
      show.schedules = await db.all(
        `SELECT id, scheduleDateTime, availableTickets, totalTickets 
         FROM show_schedules 
         WHERE showId = ? 
         AND scheduleDateTime >= datetime('now')
         AND isActive = 1
         ORDER BY scheduleDateTime`,
        [show.id]
      );
    }
    
    res.json({ success: true, data: favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;
    
    const existing = await db.get(
      'SELECT id FROM user_favorites WHERE userId = ? AND showId = ?',
      [req.userId, id]
    );
    
    if (existing) {
      await db.run(
        'DELETE FROM user_favorites WHERE userId = ? AND showId = ?',
        [req.userId, id]
      );
      res.json({ success: true, data: { isFavorite: false } });
    } else {
      await db.run(
        'INSERT INTO user_favorites (userId, showId) VALUES (?, ?)',
        [req.userId, id]
      );
      res.json({ success: true, data: { isFavorite: true } });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { getAllShows, getShowById, getFavorites, toggleFavorite };