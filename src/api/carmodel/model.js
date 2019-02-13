const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Dimensions = require('./model-dimensions').dimensionsSchema

const carmodelSchema = new Schema({
  manufacturer: {
      type: Schema.ObjectId,
      ref: 'Manufacturer',
      required: false
  },
  model: {
    type: String,
      required: true
  },
  year: {
    type: Number
  },
  doors: {
    type: [Number]
  },
  dimensions: {
    type: Dimensions
  }
}, {
  timestamps: true,
})

carmodelSchema.methods = {
  view (full) {
      const view = {
          // simple view
          id: this._id,
          manufacturer: this.manufacturer,
          model: this.model,
          year: this.year
      }

      return full ? {
          ...view,
          doors: this.doors,
          //dimensions: this.dimensions.view(),
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
      } : view
  }
}

const model = mongoose.model('Carmodel', carmodelSchema)

module.exports = {model, carmodelSchema}
