module.exports = (db) =>
  db.model(
    'GachaHistory',
    db.Schema({
      userId: String,
      prizeName: String,
      createdAt: { type: Date, default: Date.now },
    })
  );
