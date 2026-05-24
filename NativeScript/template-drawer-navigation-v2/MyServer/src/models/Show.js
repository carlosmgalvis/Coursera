const { getDatabase } = require('../database/database');

class Show {
  static async findAll(favoritesOnly = false) {
    const db = await getDatabase();
    let query = 'SELECT * FROM shows';
    const params = [];
    
    if (favoritesOnly) {
      query += ' WHERE isFavorite = 1';
    }
    
    query += ' ORDER BY title';
    
    const shows = await db.all(query, params);
    
    // Get details for each show
    for (const show of shows) {
      show.details = await db.all(
        'SELECT title, body FROM show_details WHERE showId = ? ORDER BY displayOrder',
        [show.id]
      );
    }
    
    return shows;
  }

  static async findById(id) {
    const db = await getDatabase();
    const show = await db.get('SELECT * FROM shows WHERE id = ?', [id]);
    
    if (show) {
      show.details = await db.all(
        'SELECT title, body FROM show_details WHERE showId = ? ORDER BY displayOrder',
        [id]
      );
    }
    
    return show;
  }

  static async toggleFavorite(id) {
    const db = await getDatabase();
    const show = await this.findById(id);
    
    if (!show) return null;
    
    const newFavoriteStatus = show.isFavorite ? 0 : 1;
    await db.run(
      'UPDATE shows SET isFavorite = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [newFavoriteStatus, id]
    );
    
    return { id, isFavorite: newFavoriteStatus === 1 };
  }

  static async updateTicketAvailability(id, quantity) {
    const db = await getDatabase();
    const show = await this.findById(id);
    
    if (!show || show.availableTickets < quantity) return false;
    
    await db.run(
      'UPDATE shows SET availableTickets = availableTickets - ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [quantity, id]
    );
    
    return true;
  }
}

module.exports = Show;