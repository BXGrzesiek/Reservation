import { Manufacturer } from '.'

let manufacturer

beforeEach(async () => {
  manufacturer = await Manufacturer.create({ name: 'test', origin: 'test', founded: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = manufacturer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(manufacturer.id)
    expect(view.name).toBe(manufacturer.name)
    expect(view.origin).toBe(manufacturer.origin)
    expect(view.founded).toBe(manufacturer.founded)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = manufacturer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(manufacturer.id)
    expect(view.name).toBe(manufacturer.name)
    expect(view.origin).toBe(manufacturer.origin)
    expect(view.founded).toBe(manufacturer.founded)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
