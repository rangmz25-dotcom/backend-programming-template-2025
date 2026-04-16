Nama : Randy Nicholas Wu
NIM : 535250048

Endpoint yang dapat diakses :

1. `POST /api/gacha/pull` , buat gacha
2. `GET /api/gacha/history/:userId` - cek history gacha player sesuai dengan idnya masing2
3. `GET /api/gacha/prizes` cek daftar hadiah sama sisa kuota masing2 hadihanya

Parameter/input untuk mengakses endpoint :

1. `POST /api/gacha/pull` = kirimkan user id di tab body dalam format JSON , contoh : {"userId": "mahasiswa_01"}
2. `GET /api/gacha/history/:userId` = masukkan id player di akhir url , contoh , ganti userId dengan mahsiswa_01 maka jadi `/api/gacha/history/mahasiswa_01`
3. `GET /api/gacha/prizes` = langsung get dengan url aja untuk akses tanpa ada tambahan
