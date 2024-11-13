const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 5000
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

// Tentukan direktori untuk file statis dan views
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views')
app.set('views', direktoriViews);
const direktoriPartials = path.join(__dirname, '../templates/partials');

// Setup handlebars (hbs) dan lokasi folder views
app.set('view engine', 'hbs');
hbs.registerPartials(direktoriPartials);

// Middleware untuk melayani file statis
app.use(express.static(direktoriPublic));

// Halaman utama dengan template hbs
app.get('/', (req, res) => { 
    res.render('index', { 
        judul: 'Aplikasi Cek Cuaca', 
        nama: 'Syifa Lazuardi Akbar' 
    });
});

// Rute untuk info cuaca
app.get('/infoCuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukan lokasi yang ingin dicari'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            });
        });
    });
});

// Halaman 404 untuk rute bantuan yang tidak ditemukan
app.get('/bantuan/', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Syifa Lazuardi Akbar',
        teksBantuan: 'Ini adalah teks bantuan.'
    })
});

// Halaman 404 untuk semua rute lainnya
app.get('/tentang/', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Syifa Lazuardi Akbar'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Syifa Lazuardi Akbar',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    });
});

// Rute untuk halaman penjelasan
app.get('/penjelasan', (req, res) => {
    res.render('penjelasan', {
        judul: 'Penjelasan Aplikasi Cek Cuaca'
    });
});

// Jalankan server di port 5000
app.listen(port, () => { 
    console.log('Server berjalan pada port' + port);
});
