const express = require('express')
const router = express.Router()
const dbConn = require('../db')

router.get('/', (req, res, next) => {
    dbConn.query('select * from produk', (err, result) => {
        if(err) {
            req.flash('error', err);
            res.render('index',{data:''});
        } else {
            res.render('index',{data:result});
        }
    })
})

router.get('/add', (req, res, next) => {
    res.render('create', {
        nama_produk: '',
        jumlah: 0,
        harga: 0,
        keterangan: ''
    })
})

router.post('/add', (req, res, next) => {
    let {nama, jumlah, harga, keterangan} = req.body;
    var form_data = {
        nama_produk: nama,
        jumlah: jumlah,
        harga: harga,
        keterangan: keterangan
    }
    try {
        dbConn.query('insert into produk set ?', form_data, (err, result) => {
            if(err) throw new Error
            else {
                req.flash('success', 'Produk berhasil ditambahkan')
                res.redirect('/')
            }
        })
    } catch (error) {
        req.flash('error', error);
    }
})

router.get('/edit/(:id)', (req, res, next) => {
    let {id} = req.params;
    try {
        dbConn.query('select * from produk where id = ' + id, (err, result) => {
            if(err) throw new Error
            else {
                res.render('update', {
                    title: 'Edit Produk', 
                    id: result[0].id,
                    nama: result[0].nama_produk,
                    jumlah: result[0].jumlah,
                    harga: result[0].harga,
                    keterangan: result[0].keterangan
                })
            }
        })
    } catch (error) {
        req.flash('error', error);        
    }
})

router.post('/edit/(:id)', (req, res, next) => {
    let {id} = req.params;
    let {nama,jumlah,harga,keterangan} = req.body;
    var form_data = {
        nama_produk: nama,
        jumlah: jumlah,
        harga: harga,
        keterangan: keterangan
    }
    try {
        dbConn.query('update produk set ? where id = ' + id, form_data, (err, result) => {
            if(err) throw new Error
            else {
                req.flash('success', 'Produk berhasil diupdate')
                res.redirect('/')
            }
        })
    } catch (error) {
        req.flash('error', error);
    }
})

router.get('/delete/(:id)', (req, res, next) => {
    let {id} = req.params;
    try {
        dbConn.query('delete from produk where id = ' + id, (err, result) => {
            if(err) throw new Error
            else {
                req.flash('success', 'Produk berhasil dihapus')
                res.redirect('/')
            }
        })
    } catch (error) {
        req.flash('error', error);        
    }
})

module.exports = router;