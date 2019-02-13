const { Router } = require('express')
const carmodel = require('./carmodel')
const manufacturer = require('./manufacturer')
const user = require('./user')
const _ = require('lodash')

const router = new Router()

router.use('/carmodels', carmodel)//http://127.0.0.1:9001/api/carmodels
router.use('/manufacturers', manufacturer)//http://127.0.0.1:9001/api/manufacturers
router.use('/users', user) //http://127.0.0.1:9001/api/users

// 404 Error handler
router.use((req, res, next) =>  res.status(404).send({errors: ['Routing not found']}))

// Error handler
router.use((err, req, res, next) =>  {
    if(err.name === 'ValidationError'){
        const errors = _.map(err.errors, (v) => v.message )
        return res.status(400).send({errors})
    }

    console.error(err)
    res.status(500).send({errors: ['Application error']})
})


module.exports = router
