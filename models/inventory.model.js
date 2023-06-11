const mongoose = require('mongoose');


module.exports = {
    InventoryModel: mongoose.model('inventories', mongoose.Schema({
        itemName: String,
        description: String,
        quantity: Number,
        unitPrice: Number
    }, {
        versionKey: false
    }))
}