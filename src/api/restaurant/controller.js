const {success, notFound} = require('../../services/response/')
const Restaurant = require('./model').model

const create = ({body}, res, next) =>{
    Restaurant.create(body)
        .then((restaurant) => restaurant.view(true))
        .then(success(res, 201))
        .catch(next)
}
const index = (req, res, next) =>{
    Restaurant.find()
        .then((restaurants) => restaurants.map((restaurant) => restaurant.view()))
        .then(success(res))
        .catch(next)
}
const show = ({params}, res, next) =>{
    Restaurant.findById(params.id)
        .then(notFound(res))
        .then((restaurant) => restaurant ? restaurant.view(true) : null)
        .then(success(res))
        .catch(next)
}
const update = ({body, params}, res, next) =>{
    Restaurant.findById(params.id)
        .then(notFound(res))
        .then((restaurant) => restaurant ? Object.assign(restaurant, body).save() : null)
        .then((restaurant) => restaurant ? restaurant.view(true) : null)
        .then(success(res))
        .catch(next)
}
const destroy = ({params}, res, next) => {
    Restaurant.findById(params.id)
        .then(notFound(res))
        .then((restaurant) => restaurant ? restaurant.remove() : null)
        .then(success(res, 204))
        .catch(next)
}
const search = ({query}, res, next) => {
    let dbquery = []
    for (const key in query) {
        switch (key) {
            case 'model':
                dbquery.push({"model": {$regex: new RegExp(`${query['model']}`), $options: 'i'}})
                break;
            case 'yearmin':
                dbquery.push({"year": {$gte: parseInt(query['yearmin'])}})
                break;
            case 'yearmax':
                dbquery.push({"year": {$lte: parseInt(query['yearmax'])}})
                break;
        }
    }

    if (dbquery.length === 0) return res.json([])

    return Restaurant.find({$and: dbquery}).sort({year: -1}).limit(10)
        .then(notFound(res))
        .then((restaurant) => restaurant ? restaurant.map(restaurant => restaurant.view(true)) : null)
        .then(success(res))
        .catch(next)
}

module.exports = {
    create, index, show, update, destroy, search
}
