const {Product} = require('../database/models')
module.exports = {
    home: async (req, res) => {
        try {
            const products = await Product.findAll()
            res.render('index', {
                title: 'Home',
                products
        })
           } catch (error){
        }
    }
}