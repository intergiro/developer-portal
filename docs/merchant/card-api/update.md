# Update

To update information on a card, send a PUT or PATCH request to the card endpoint with the [card token](./reference.html#token) in the url. The body of the request should be a [Card Creatable](./reference.html). The response will be the updated [card token](./reference.html#token). 

If [verification](./verification.html) is needed then the verification field can be populated in the body and a PUT or PATCH request can be sent to the card endpoint.

#### Request
``` {1} JSON
PUT /v1/card/:card_token

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <customer.api.key> | Bearer <public.api.key>
{
	"pan": "<card number>",
	"csc": "<card security code>",
	"expires": [<card expires month>, <card expires year>],
	"verification": {
		"type": "challenge",
		"data": {
			"acsTransID": "66592456-d89d-44aa-bbb3-f746c7f25ef4",
			"challengeCompletionInd": "Y",
			"messageType": "CRes",
			"messageVersion": "2.2.0",
			"threeDSServerTransID": "a02a909d-f1ae-4710-ac8b-8e701cd22730",
			"transStatus": "Y"
		}
	}
}
```

#### Response
```json
<signed.card.token>
```