const request = require('supertest')

it('Test create', async () => {
    const data = {
        "email": "john.due@email.com",
        "password": "123456",
        "transactionCode": "f1379998-503c-4370-9ffa-f46e625343fb"
    }
    
    request("http://localhost:3001/api")
    .post(`/authenticate`, data)
    .set('Accept', 'application/json')
    .expect(200)
})