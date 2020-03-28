const supertest = require('supertest')
const app = require('../../api/server')

describe('Student Routes Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })

  it('ping pong', async () => {
      const res = await supertest(app).post('/api/students/ping').send({ping:"ping"})
      console.log(res.body)
      expect(res.body).toBe("pong")
  })

  it('ping pong error', async () => {
      const res = await supertest(app).post('/api/students/ping').send({ping:"not ping"})
      console.log(res.body)
      expect(res.body.message).toMatch(/Not 'ping' in  Student route/)
  })
})