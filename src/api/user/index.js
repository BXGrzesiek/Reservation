const { Router } = require('express')
const { token, password } = require('../../services/passport')
const {index, showMe, show, create, update, destroy, auth} = require('./controller')

const router = new Router()


router.get('/',  index)

router.get('/me',  token({ required: true }),  showMe)

router.get('/:id',  token({ required: true, roles: ['VIP'] }),  show)

router.post('/',  create) //http://127.0.0.1:9001/api/users/ POST {}

router.post('/auth',    password(),    auth)

router.put('/',  token({ required: true }),  update)

router.delete('/:id',  token({ required: true, roles: ['VIP'] }),  destroy)

module.exports = router
