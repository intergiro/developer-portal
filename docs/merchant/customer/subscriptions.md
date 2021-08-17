# Subscriptions

## Adding a Subscription

#### Request
To add a subscription make a call to the subscription endpoint. The body can be any valid [`Subscription Creatable`](../reference/subscription.html#subscription) Object.
```{1}
POST /v1/customer/<customer_id>/subscription

Host: merchant.intergiro.com
Authentication: Bearer <private.api.key> 
{
	"number": "aaa-001",
	"items": [
		{
			"name": "Basic Access",
			"price": 42.00,
			"vat": 25.00,
			"quantity": 1
		},
		{
			"name": "Premium Access",
			"price": 100.00,
			"vat": 25.00,
			"quantity": 2
		}
	],
	"currency": "SEK",
	"schedule": {
		"frequency": "quarterly",
		"offset": [
			2,
			-1
		]
	},
	"start": "2021-07-03",
	"callback": "https://example.com/subscription"
}

```
#### Response
The response will be an array containing all subscriptions on the customer.
```json
[
    {
    "start": "2021-07-03",
    "number": "aaa-001",
    "items": [
      {
        "name": "Basic Access",
        "price": 42,
        "vat": 25,
        "quantity": 1
      },
      {
        "name": "Premium Access",
        "price": 100,
        "vat": 25,
        "quantity": 2
      }
    ],
    "currency": "SEK",
    "schedule": {
      "frequency": "quarterly",
      "offset": [
        2,
        -1
      ]
    },
    "callback": "https://example.com/subscription",
    "id": "test",
    "due": "2021-09-30"
  }
]
```
## Changing a Subscription
To change subscription data, make either a `PUT` or a `PATCH` request to the endpoint, specifying the 4 letter identifier of the subscription. 
A `PUT` request will need to have a valid [`Subscription Creatable`](../reference/subscription.html#subscription) Object as the body and replace the subscription, while keeping the same subscription id. 
A `PATCH` request requires a partial [`Subscription Creatable`](../reference/subscription.html#subscription) Object as the body and only update the fields that are present in the request body.

In both cases a future "due" date will be replaced by a calculated "due" date. As the backend will not set a "due" date past the "end" date, this endpoint can be used to end a subscription both immediately as well as at a future date. 
#### Request
```{1}
PUT | PATCH /v1/customer/<customer_id>/subscription/<subscription_id>

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <private.api.key> 
{
	"number": "aaa-001",
	"items": [
		{
			"name": "Premium Access",
			"price": 100.00,
			"vat": 25.00,
			"quantity": 3
		}
	],
	"currency": "SEK",
	"schedule": {
		"frequency": "quarterly",
		"offset": 2
	},
	"start": "2021-07-03",
	"callback": "https://example.com/subscription"
}
```
#### Response
The response will be an array with all subscriptions associated to the customer, including the updated subscription.
## Ending a Subscription

Ending a subscription will remove a future "due" date from the subscription and set the "end" date to the current date.

A request to this endpoint can either be made with a "private" authorization key or with the "customer" authorization key. With the "customer" authorization key you have to specify "me" as the customer id, for "private" authorization specify the customer id.

#### Request
```{1}
DELETE /v1/customer/<customer_id>/subscription/<subscription_id>

Host: merchant.intergiro.com
Authentication: Bearer <private.api.key> |  <customer.api.key>
```

#### Response
The response will be an array with all subscriptions associated to the customer, including the updated subscription.
