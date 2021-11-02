# Creating an Order

To create a customer order post an [Order Creatable](../order/reference.html#order) to the order endpoint, 
the `customer` field must be set to a customer id and the `payment` field must be a [Customer Payment Creatable](./reference.html#customer-payment).

An order can also be with a specific customer method by [Selecting Customer Method](./payment-methods.html#select-customer-method).

#### Request
``` {1} JSON
POST /v1/order

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <private.api.key>
{
	"number": <your order identifier>,
	"items": <number or item information or array of items objects>,
    "customer": <customer id>,
	"currency": <currency of the transaction>,
	"payment": {
		"type": "customer"
	}
}
```

#### Response
```json
{
    "id": "<Identifier of order in Intergiro's system>",
    "created": "<datetime of order>",
    "customer": "<id of customer or contact information>",
    "items": "<numer or item information or array of items objects>",
    "currency": "<Currency of order>",
    "payment": "<Card payment>",
}
```
