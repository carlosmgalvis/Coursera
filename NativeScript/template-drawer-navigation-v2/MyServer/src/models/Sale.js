const { getDatabase } = require('../database/database');

class Sale {
  static async create(saleData) {
    const db = await getDatabase();
    
    const saleId = `SALE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await db.run(
      `INSERT INTO sales (id, userId, totalAmount, paymentMethod)
       VALUES (?, ?, ?, ?)`,
      [saleId, saleData.userId || null, saleData.totalAmount, saleData.paymentMethod]
    );
    
    // Insert sale items
    for (const item of saleData.items) {
      await db.run(
        `INSERT INTO sale_items (saleId, showId, title, quantity, price, subtotal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [saleId, item.showId, item.title, item.quantity, item.price, item.subtotal]
      );
    }
    
    return await this.findById(saleId);
  }

  static async findById(saleId) {
    const db = await getDatabase();
    const sale = await db.get('SELECT * FROM sales WHERE id = ?', [saleId]);
    
    if (sale) {
      sale.items = await db.all(
        'SELECT showId, title, quantity, price, subtotal FROM sale_items WHERE saleId = ?',
        [saleId]
      );
    }
    
    return sale;
  }

  static async findAll(limit = 50, offset = 0) {
    const db = await getDatabase();
    const sales = await db.all(
      'SELECT * FROM sales ORDER BY saleDate DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    
    for (const sale of sales) {
      sale.items = await db.all(
        'SELECT showId, title, quantity, price, subtotal FROM sale_items WHERE saleId = ?',
        [sale.id]
      );
    }
    
    return sales;
  }

  static async getUserSales(userId) {
    const db = await getDatabase();
    const sales = await db.all(
      'SELECT * FROM sales WHERE userId = ? ORDER BY saleDate DESC',
      [userId]
    );
    
    for (const sale of sales) {
      sale.items = await db.all(
        'SELECT showId, title, quantity, price, subtotal FROM sale_items WHERE saleId = ?',
        [sale.id]
      );
    }
    
    return sales;
  }

  static async getTotalSales() {
    const db = await getDatabase();
    const result = await db.get('SELECT SUM(totalAmount) as total FROM sales');
    return result.total || 0;
  }
}

module.exports = Sale;