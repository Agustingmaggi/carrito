const {Product} = require('../database/models')
const axios = require('axios')
module.exports = {
    home: async (req, res) => {
        try {
            const products = await Product.findAll()
            res.render('index', {
                title: 'Home',
                products
        })
           } catch (error){
            res.send(error)
        }
    },
    addCart: async (req, res) => {
        try {
            const {id,quantity} = req.body
            const product = await Product.findByPk(id)
            if(!req.session.cart){
                req.session.cart = []
            }
            const cart = req.session.cart
            const productExist = cart.find(item => item.id == id)
            if(productExist){
                req.session.cart = cart.map(item => {
                    if(item.id ==id){
                        item.quantity += parseInt(quantity)
                        item.subtotal = product.price * item.quantity
                    }
                    return item
                })
            }else{
            req.session.cart.push({
                id:product.id,
                name:product.name,
                price:product.price,
                quantity:quantity,
                subtotal:product.price * quantity
            })
        }
            res.redirect('/')
        } catch (error){
            res.send(error)
        }
    },
    deleteCart: async(req,res) => {
        try {
            const {id} = req.body
            const cart = req.session.cart
            req.session.cart = cart.filter(item => item.id != id)
            res.redirect('/')
        } catch (error){
            res.send(error)
        }
    },
    //estos metodos son para mercado pago
    checkout: async (req, res) => {
        try{

           let response = await axios.post('https://api.mercadopago.com/checkout/preferences',{
                items: req.session.cart.map(item => {
                    return {
                        title: item.name,
                        quantity: item.quantity,
                        currency_id: 'ARS',
                        unit_price: item.price
                    }
                }),
                back_urls: {
                    success: 'http://localhost:3030/feedback',
                    failure: 'http://localhost:3030/feedback',
                    pending: 'http://localhost:3030/feedback'
                },
                auto_return: 'approved',
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN || 'TEST-1249931130347559-042118-5f199316521dd8ea2c71dc45cfa1d6a2-173356790'}`,
                    'Content-Type': 'application/json'
                }
                
        })
        return res.redirect(response.data.init_point)

        } catch (error) {
            res.send(error)
        }
    },
    feedback: async (req, res) => {
        req.session.destroy()
        res.send(req.query)
    }

}