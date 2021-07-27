# Topup

To create a non-purchase order, send an [order creatable](../reference/order#creatable) with the field category set to `withdrawal` to the order create endpoint. 

A callback will be sent to the callback URL when the order is created or changed.

If you require any further data from the callback to process the transaction, add it to the meta field.

Topups are compatible with [customer payments](./create-customer-order)

``` {1}
POST /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
{
    "number": <order number in your system>,
    "items": <number or item information or array item objects>,
    "currency": <Currency>,
    "payment": <payment creatable>,
    "meta": <relevant data>,
    "callback": "https://example.webpage.com/somewhere"
    "category": "withdrawal",
}
```

[Read more about callback here](../reference/callback.html#callback)
