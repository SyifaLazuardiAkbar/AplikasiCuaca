const express = require('express') 

const app = express() 

//ini halaman/page bantuan 

app.get('', (req, res) => { 
    res.send('<h1> Selamat datang di halaman utama gaiss</h1>') 
}) 
//ini halaman bantuan 
app.get('/bantuan', (req, res) => { 
    res.render('tentang', { 
    judul: 'Tentang Saya', 
    nama: 'iif',
    teksBantuan: 'ini adalah teks bantuan'
    }) 
}) 

app.listen(5000, () => { 
    console.log('Server berjalan pada port 5000.') 
}) 

const path = require('path')

const direktoriPublic =path.join(__dirname, '../public')

app.use(express.static(direktoriPublic))