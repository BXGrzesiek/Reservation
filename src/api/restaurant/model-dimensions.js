const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const dimensionsSchema = new Schema({
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    length: {
        type: Number
    },
})

dimensionsSchema.methods = {
    view() {
        return {
            // simple view
            id: this._id,
            width: this.width,
            height: this.height,
            length: this.length
        }
    }
}


const model = mongoose.model('Dimensions', dimensionsSchema)

module.exports = {model, dimensionsSchema}
