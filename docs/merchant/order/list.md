# List

To list the orders send a GET request to the order endpoint.


#### Request 

``` {1}
GET /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
```

#### Response 

The response should be an array of [orders](./reference.html#order-2).