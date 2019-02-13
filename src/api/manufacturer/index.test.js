import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Manufacturer } from '.'

const app = () => express(apiRoot, routes)

let manufacturer

beforeEach(async () => {
  manufacturer = await Manufacturer.create({})
})

test('POST /manufacturers 201', async () =>
{
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', origin: 'test', founded: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.origin).toEqual('test')
  expect(body.founded).toEqual('test')
})

test('GET /manufacturers 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /manufacturers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${manufacturer.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(manufacturer.id)
})

test('GET /manufacturers/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /manufacturers/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${manufacturer.id}`)
    .send({ name: 'test', origin: 'test', founded: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(manufacturer.id)
  expect(body.name).toEqual('test')
  expect(body.origin).toEqual('test')
  expect(body.founded).toEqual('test')
})

test('PUT /manufacturers/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', origin: 'test', founded: 'test' })
  expect(status).toBe(404)
})

test('DELETE /manufacturers/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${manufacturer.id}`)
  expect(status).toBe(204)
})

test('DELETE /manufacturers/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
