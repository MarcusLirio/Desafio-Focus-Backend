const request = require('supertest')

const apiUrl = "http://localhost:3001/api"
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2FiOWY3NmE4Y2RkYTQzYmU4NDFiYzAiLCJpYXQiOjE2NzIyNDI4NjMsImV4cCI6MTY3MjMyOTI2M30.Qa2fVFP6_HQen1s0hBgQ2yMScv9q1x0jgMfhmj_VEe34LfRYDaHXLaqPS_qFDE3gCsYyACA2FazR86Y1XVbh-jJmAOD9Kv_XPl6-u83cjPaAiYZMD_YHwIpYq6BhP8Dih3jZv9eOI3Nw5UCDS9r1a_di39MEyxmXmkUmXrRTqh6zi_FmNkOP9xMQUE4H86w7yxe5U0t9Ttc9sEW1EHrzi76pM-Fy_YibvAOl3r1iN9SrdHDf97fEA_PANgTEwrlMdC8g3RngL9QpBRy0U4wiaMc-O1Lhe-leE8DVHlo80RvQ9hg7NC1rSSu9CpiluDsP5iUqki5EMiWyjimKA9tSoQuTTPD3Ft1epQTbbfBzm03pBzxS2UPO2sXwpnkf1DQuInzgHlULxSSV6-BL-TakN7xXsTrJsn4ATGUYO4zdDKw2HtQvutB5CoPWKMIC7tpH6ovMrbuKUcgoS3lKXe7r5CKiOIu0md5aFGFJLNIJ6DJ49mK9CZhQIrU8WHe7lnzH-dJbJJDxywit-0lnBD8my1L3QR8bp--qyKIFykiE9DgrFI0cjb8VPVexpCeYCpFM5dzMuAyyihJrhI3xiS8TLS3_QpqdHLn8x4AOwjybgC5uCneJwWcLdLvaIe5mGsNTqtDb390DloydPjxeD9QYkjvxlHoPZtVBZGuJ_RVb0LQ"

it('Test FindByEmail', async () => {
    const email = "john.due@email.com"
    request(apiUrl)
    .get(`/user/checkemail/${email}`)
    .set('Accept', 'application/json')
    .expect(200)
})

it('Test getUser', async () => {
    request(apiUrl)
    .get(`/user`)
        .set('Accept', 'application/json')
        .auth('token', {type: `bearer ${token}`})
    .expect(200)
})

it('Test Create', async () => {
    const data = {
        "name": "John Due",
        "email": "john.due3@email.com",
        "password": "123456",
        "cel": "11",
        "celDDD": "999999999",
        "tel": "11",
        "telDDD": "99999999",
        "userType": "seller"
      }
    request(apiUrl)
    .post(`/user/create`, data)
    .set('Accept', 'application/json')
    .expect(201)
})
