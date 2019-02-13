import { Carmodel } from '.'

let carmodel

beforeEach(async () => {
  carmodel = await Carmodel.create({ manufacturer: 'test', model: 'test', year: 'test', doors: 'test', dimensions: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = carmodel.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(carmodel.id)
    expect(view.manufacturer).toBe(carmodel.manufacturer)
    expect(view.model).toBe(carmodel.model)
    expect(view.year).toBe(carmodel.year)
    expect(view.doors).toBe(carmodel.doors)
    expect(view.dimensions).toBe(carmodel.dimensions)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = carmodel.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(carmodel.id)
    expect(view.manufacturer).toBe(carmodel.manufacturer)
    expect(view.model).toBe(carmodel.model)
    expect(view.year).toBe(carmodel.year)
    expect(view.doors).toBe(carmodel.doors)
    expect(view.dimensions).toBe(carmodel.dimensions)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
