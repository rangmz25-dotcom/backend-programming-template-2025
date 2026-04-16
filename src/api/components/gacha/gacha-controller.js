const db = require('../../../models');

module.exports = {
  pullGacha: async (request, response) => {
    try {
      const { userId } = request.body;

      if (!userId) {
        return response
          .status(400)
          .json({ success: false, message: 'userId is required' });
      }

      const hariIni = new Date();
      hariIni.setHours(0, 0, 0, 0);

      const totalGachaHariIni = await db.GachaHistory.countDocuments({
        userId,
        createdAt: { $gte: hariIni },
      });

      if (totalGachaHariIni >= 5) {
        return response.status(403).json({
          success: false,
          message: 'Error! : User hanya bisa gacha 5 kali sehari.',
        });
      }

      const isMenang = Math.random() < 0.3;
      let hadiahDidapat = null;

      if (isMenang) {
        const hadiahTersedia = await db.Prizes.find({ quota: { $gt: 0 } });

        if (hadiahTersedia.length > 0) {
          const indexAcak = Math.floor(Math.random() * hadiahTersedia.length);
          hadiahDidapat = hadiahTersedia[indexAcak];

          hadiahDidapat.quota -= 1;
          await hadiahDidapat.save();
        }
      }

      const riwayatGacha = new db.GachaHistory({
        userId,
        prizeName: hadiahDidapat ? hadiahDidapat.name : 'Zonk',
      });
      await riwayatGacha.save();

      if (hadiahDidapat) {
        return response.status(200).json({
          success: true,
          message: `Congrats <3,  Kamu menang: ${hadiahDidapat.name}`,
        });
      }

      return response.status(200).json({
        success: true,
        message: 'Zonk! Kamu tidak memenangkan hadiah apapun kali ini!',
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  getHistory: async (request, response) => {
    try {
      const { userId } = request.params;

      const riwayat = await db.GachaHistory.find({ userId }).sort({
        createdAt: -1,
      });

      return response.status(200).json({ success: true, data: riwayat });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ success: false, message: 'Error!!!' });
    }
  },

  getPrizes: async (request, response) => {
    try {
      const sisaHadiah = await db.Prizes.find({});

      return response.status(200).json({ success: true, data: sisaHadiah });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },
};
