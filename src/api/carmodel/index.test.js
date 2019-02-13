import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Carmodel } from '.'

const app = () => express(apiRoot, routes)

let carmodel

beforeEach(async () => {
  carmodel = await Carmodel.create({})
})

test('POST /carmodels 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ manufacturer: 'test', model: 'test', year: 'test', doors: 'test', dimensions: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.manufacturer).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.doors).toEqual('test')
  expect(body.dimensions).toEqual('test')
})

test('GET /carmodels 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /carmodels/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${carmodel.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(carmodel.id)
})

test('GET /carmodels/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /carmodels/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${carmodel.id}`)
    .send({ manufacturer: 'test', model: 'test', year: 'test', doors: 'test', dimensions: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(carmodel.id)
  expect(body.manufacturer).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.doors).toEqual('test')
  expect(body.dimensions).toEqual('test')
})

test('PUT /carmodels/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ manufacturer: 'test', model: 'test', year: 'test', doors: 'test', dimensions: 'test' })
  expect(status).toBe(404)
})

test('DELETE /carmodels/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${carmodel.id}`)
  expect(status).toBe(204)
})

test('DELETE /carmodels/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
