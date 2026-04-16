require('dotenv').config();
const db = require('./src/models');

async function seedHadiah() {
  try {
    setTimeout(async () => {
      console.log('Menghapus data hadiah lama...');

      await db.Prizes.deleteMany({});

      const daftarHadiah = [
        { name: 'Emas 10 gram', quota: 1 },
        { name: 'Smartphone X', quota: 5 },
        { name: 'Smartwatch Y', quota: 10 },
        { name: 'Voucher Rp100.000', quota: 100 },
        { name: 'Pulsa Rp50.000', quota: 500 },
      ];

      console.log('Memasukkan data hadiah baru...');

      await db.Prizes.insertMany(daftarHadiah);

      console.log('Database berhasil diisi!');
      process.exit();
    }, 2000);
  } catch (error) {
    console.error('Gagal melakukan seeding:', error);
    process.exit(1);
  }
}

seedHadiah();
