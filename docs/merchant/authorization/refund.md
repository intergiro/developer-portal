# Refund

In order to create a [Refund](./reference.html#refund), first send a request with the body of the request set as an [Refund creatable](./reference.html#refund).

``` {1} JSON
POST /v1/authorization/:id/refund

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
    "amount": 1
}
```

Example Response:
``` {1} JSON
HTTP 200 OK

{
  "amount": 1,
  "created": "2021-06-11T09:19:12.618Z",
  "reference": "00000000000",
  "status": "approved"
}
```