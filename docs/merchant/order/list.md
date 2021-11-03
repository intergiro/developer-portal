# List

To list the orders send a GET request to the order endpoint.

It is highly recommended to use the date queries when listing orders, to optimize behaviour. The date format used for the queries can be found [here](../common/reference.html#date).

#### Request 

``` {1}
GET /v1/order?start=2000-01-01&end=2000-02-01

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
```

#### Response 

The response should be an array of [orders](./reference.html#order-2).