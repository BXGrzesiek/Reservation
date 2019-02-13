const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Dimensions = require('./model-dimensions').dimensionsSchema

const restaurantSchema = new Schema({
  stoliki: {
      type: Schema.ObjectId,
      ref: 'Manufacturer',
      required: false
  },
  id_stolika: String,
  il_miejsc: String,
  stolik_type: {
    enum: ["normal", "VIP"]
  },
  available: Boolean
}, {
  timestamps: true,
})

restaurantSchema.methods = {
  view (full) {
      const view = {
          // simple view
          id: this._id,
          stoliki: this.stoliki,
          model: this.model,
          year: this.year
      }

      return full ? {
          ...view,
          doors: this.doors,
          dimensions: this.dimensions.view(),
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
      } : view
  }
}

const model = mongoose.model('Restaurant', restaurantSchema)

module.exports = {model, restaurantSchema}
