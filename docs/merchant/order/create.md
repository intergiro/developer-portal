# Create

To create an order post an [Order Creatable](../reference/order.html#order) to the order endpoint. The `payment` field must be a [Card Payment Creatable](../reference/payment.html#card-payment-creatable)

#### Request
``` {1}
POST /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
{
	"items": <number or item information or array of items objects>,
	"currency": <currency of the transaction>,
	"payment": {
		"type": "card"
        "card": <card JWT>
	}
}
```

#### Response
```json
{
    "id": "<Identifier of order in Intergiro's system>",
    "created": "<datetime of order>",
    "items": "<numer or item information or array of items objects>",
    "currency": "<Currency of order>",
    "payment": "<Card payment>",
}
```
