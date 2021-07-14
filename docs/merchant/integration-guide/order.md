# Order

## Create Order

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

## Change Order

To change an order use a patch request with with an array where each element contains an id of the order and an array of [Event Creatables](../reference/event.html#creatable) for that changes you want to be made.

#### Request 
``` {1}
PATCH /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <private.api.key>
[
    {
        id: <Identifier of order in Intergiro's system>,
        event: <Array of Event Creatables>
    },
    ...
]
```

#### Response 

You should get a 200 response with the same changes you requested in the body.

``` json
[
    {
        "id": "<Identifier of order in Intergiro's system>",
        "event": "<Array of Event Creatables>"
    },
    ...
]
```

## List Orders

To list the orders send a GET request to the order endpoint.


#### Request 

``` {1}
GET /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
```

#### Response 

The response should be an array of [orders](../reference/order.html#order).
