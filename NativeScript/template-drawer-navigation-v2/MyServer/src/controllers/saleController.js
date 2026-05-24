const { getDatabase } = require('../database/database');

const createSale = async (req, res) => {
  try {
    const { scheduleId, showId, showTitle, scheduleDateTime, quantity, unitPrice, paymentMethod } = req.body;
    const db = await getDatabase();
    
    // Check ticket availability
    const schedule = await db.get(
      'SELECT availableTickets FROM show_schedules WHERE id = ?',
      [scheduleId]
    );
    
    if (!schedule || schedule.availableTickets < quantity) {
      return res.status(400).json({ 
        success: false, 
        error: 'Not enough tickets available' 
      });
    }
    
    // Update available tickets
    await db.run(
      'UPDATE show_schedules SET availableTickets = availableTickets - ? WHERE id = ?',
      [quantity, scheduleId]
    );
    
    // Create sale
    const saleId = `SALE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const totalAmount = quantity * unitPrice;
    
    await db.run(
      `INSERT INTO sales (id, userId, scheduleId, showId, showTitle, scheduleDateTime, quantity, unitPrice, totalAmount, paymentMethod)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [saleId, req.userId, scheduleId, showId, showTitle, scheduleDateTime, quantity, unitPrice, totalAmount, paymentMethod]
    );
    
    res.status(201).json({
      success: true,
      data: {
        id: saleId,
        showTitle,
        quantity,
        totalAmount,
        scheduleDateTime,
        saleDate: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getSalesHistory = async (req, res) => {
  try {
    const db = await getDatabase();
    const sales = await db.all(
      `SELECT * FROM sales 
       WHERE userId = ? 
       ORDER BY saleDate DESC`,
      [req.userId]
    );
    
    res.json({ success: true, data: sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getSalesAnalytics = async (req, res) => {
  try {
    const db = await getDatabase();
    const { period, startDate, endDate } = req.query;
    
    let groupBy = '';
    let dateFormat = '';
    
    switch(period) {
      case 'day':
        groupBy = 'date(saleDate)';
        dateFormat = '%Y-%m-%d';
        break;
      case 'week':
        groupBy = "strftime('%Y-%W', saleDate)";
        dateFormat = '%Y-W%W';
        break;
      case 'month':
        groupBy = "strftime('%Y-%m', saleDate)";
        dateFormat = '%Y-%m';
        break;
      default:
        groupBy = 'date(saleDate)';
        dateFormat = '%Y-%m-%d';
    }
    
    // Sales by time period
    const salesByPeriod = await db.all(
      `SELECT 
         strftime('${dateFormat}', saleDate) as period,
         COUNT(*) as transactionCount,
         SUM(quantity) as totalTickets,
         SUM(totalAmount) as totalSales
       FROM sales
       WHERE userId = ?
         AND saleDate >= date(?)
         AND saleDate <= date(?)
       GROUP BY ${groupBy}
       ORDER BY period`,
      [req.userId, startDate || '2000-01-01', endDate || '2100-12-31']
    );
    
    // Sales by show
    const salesByShow = await db.all(
      `SELECT 
         showTitle,
         SUM(quantity) as totalTickets,
         SUM(totalAmount) as totalSales,
         COUNT(*) as timesPurchased
       FROM sales
       WHERE userId = ?
       GROUP BY showId, showTitle
       ORDER BY totalSales DESC`,
      [req.userId]
    );
    
    // Summary statistics
    const summary = await db.get(
      `SELECT 
         COUNT(*) as totalTransactions,
         SUM(quantity) as totalTickets,
         SUM(totalAmount) as totalSpent,
         AVG(totalAmount) as averageTransaction,
         MIN(saleDate) as firstPurchase,
         MAX(saleDate) as lastPurchase
       FROM sales
       WHERE userId = ?`,
      [req.userId]
    );
    
    res.json({
      success: true,
      data: {
        summary,
        salesByPeriod,
        salesByShow
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { createSale, getSalesHistory, getSalesAnalytics };