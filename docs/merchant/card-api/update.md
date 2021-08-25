# Update

To update information of a card, send a PUT request to the card endpoint with the [card token](./reference.html#token) in the url. The body of the request should be a [Card Creatable](./reference.html). The response will be the updated [card token](./reference.html#token).

#### Request
``` {1}
PUT /v1/card/:card_token

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <public.api.key>
{
	"pan": "<card number>",
	"csc": "<card security code>",
	"expires": [<card expires month>, <card expires year>]
}
```

#### Response
```json
<signed.card.token>
```