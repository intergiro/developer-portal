# Get

The get call is used to get information about a specific merchant.

``` {1}
GET /v1/merchant/:id

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <access_token>
```

The response contains a [Intergiro Merchant](./reference#merchant).