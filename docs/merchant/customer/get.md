# Get Information
To get the customer information a request to this endpoint can either be made with a "private" authorization key or with the "customer" authorization key. 
With the "customer" authorization key you have to specify "me" as the customer id, for "private" authorization specify the customer id of the customer you wish to get.

#### Request
```json
GET /v1/customer/:customer_id

Host: merchant.intergiro.com
Authentication: Bearer <private.api.key> | Bearer <customer.api.key>
```

#### Example response
The response should be a [`Customer`](./reference.html#customer) object.
```json
{
    "id": "Uw8hDZb4T-YX17O-",
    "number": "2bQ7p_1sadDddIBB",
    "method": [
        {
            "type": "card",
            "scheme": "visa",
            "iin": "411111",
            "last4": "1111",
            "expires": [2, 22],
            "acquirer": "intergiro",
            "created": "2021-08-17T08:31:07.058Z",
            "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjI5MTg5MDY3LCJhdWQiOiJwcm9kdWN0aW9uIiwidHlwZSI6ImNhcmQiLCJjYXJkIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKallYSmtJaXdpYVdGMElqb3hOakk1TVRnNU1EWTNMQ0poZFdRaU9pSndjbTlrZFdOMGFXOXVJaXdpWlc1aklqb2lNakV3TWk1Q1ZuWjNkMEYzTkUxek1YQnVOelJOYVhFMGFGZDNMbGxvWkdvMmFrWTVjMFozWVhaT2JubE1NVlZxZFVOTk9FeDBTMlJWZDFoQ2RGWjVTakpHUW1SRFEwVWlMQ0o0Y0hJaU9sc3lMREl5WFgwLnVMUGxNM0JEbzdXVHdfQU5zNjhFNlA5Tk0zUWg5OUlmSi00X3dOYkNTRjRnR0xUWEVxMkxUdzE0SXBPYW9GM1p1dGd2YXZzbTMxUXZKZFAtNkh6eGJEcnhvSHJhWFZrTkk5R1FINkx1UjlOY3ZlRjVQREZiRjMta2RaOVhLc05UaXVuYUg1Q3MzT0M3NlpjRFY0NW1Wb2dpNndkWkZlU193WTltY1ZSSU5DZGFXd3p5UElvakJkUFhpZVhrOVZ5Y0pPTnRiRUxjTjdLdE0zaEJYZ0QwRWhxRXpteEcxc0l3aFJaM0NfeWVwNWxGX2p5RzViaEhHZktiblRtRmlVeG1mbEdGWXc2NDdZdml2R0Z1MU5UZnNWZmxxTmdTQUlxUHZxeE81QXRmM1BGSFFXVUFURnJpbk1ZYnBldm1nakx1Yk5SZnZ4cGQwU2ZUNnJGLUpIdHo3USIsInNjaGVtZSI6InZpc2EiLCJpaW4iOiI0MTExMTEiLCJsYXN0NCI6IjExMTEiLCJleHBpcmVzIjpbMiwyMl0sInJlZmVyZW5jZSI6Ik1DQTEwMzEwNjA4MTciLCJhY3F1aXJlciI6ImludGVyZ2lybyIsImNyZWF0ZWQiOiIyMDIxLTA4LTE3VDA4OjMxOjA3LjA1OFoifQ.Ydizw6MbLKMFv68palSXUU5UH-qMN8wItGAclDsmfufatdm_LXkYt-WNuptXhxYa-F1-zXr8lg441TVc3yN649Vgp2Z6MYLzvR-fWafJE5AN4PulwfMvjaD7ink08sc7kVVftebzcXYR6vkXmDTStlHwRjgWJul3_vz9ZsxkxQAKTSkJmEU8VBFuL45Om2LI2YfbPUoG_EQGtIFZr31C92lyzFNSvE3Rb8QCACG9HHisSA6FB_NxJ14dnadUdksjcL_jp8RldZXFZUqKb1z2x9VO2Q-CoieiD_n0L93T3SS4GRqT9QPwV_ztb468jcGR4D0A_EQTtYcYoMmkjZl7pw",
        }
    ],
    "subscription": [],
    "status": "active",
	"total": 0,
	"balance": [],
	"currency": "SEK",
	"schedule": "monthly",
    "contact": {
        "type": "person",
        "name": "John Doe",
        "address": {
            "street": "Storgatan 1",
            "zip_code": "111 23",
            "city": "Stockholm",
            "country_code": "SE"
        },
        "email": "johndoe@example.com",
        "phone": "+46987654321"
    }
}
```