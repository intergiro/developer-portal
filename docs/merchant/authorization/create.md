# Create

In order to create an [Authorization](./reference.html#authorization), first send a request with the body of the request set as an [Authorization creatable](./reference.html#authorization).

Example Authorization request:
``` {1} JSON
POST /v1/authorization

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <public.api.key> or <customer.api.key>

{
	"number": "a_unique_identifier",
	"amount": 23,
	"currency": "EUR",
	"card": {
		"pan": "4111111111111111",
		"expires": [2, 22],
		"csc": "987"
	}
}
```

Example Response:

``` {1} JSON
HTTP 200 OK

{
	"id": "1234567890123456",
	"number": "a_unique_identifier",
	"merchant": "testtest",
	"amount": 23,
	"currency": "EUR",
	"history": [],
	"change": [],
	"capture": [],
	"refund": [],
	"created": "2021-04-01T09:00:00.000Z",
	"reference": "12341234",
	"card": {
		"csc": "matched",
		"expires": [2, 22],
		"iin": "411111",
		"last4": "1111",
		"scheme": "visa",
		"type": "debit",
	},
}
```

If a verification required error is returned, proceed to the [verification](../verification/create.html#create) endpoint. The important field to look for is the `error: "verification required"`. 

Example of a verification required response:
```{1,15} JSON
HTTP 400 Bad Request

{
	"status": 400,
	"type": "flawed content",
	"content": {
		"type": "verification required",
		"flaws": [
			{
				"type": "reject",
				"condition": "authorization.amount>15 !(authorization.verification:verified) !(authorization.recurring:subsequent)"
			}
		]
	},
	"error": "verification required"
}
```

After a successful [Verification response](../verification/create.html#create) has been returned, append it to the [Authorization creatable](./reference.html#authorization) in the `card.verification` property.

Example Authorization request appended with Verification response:
``` {1} JSON
POST /v1/authorization

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <public.api.key> or <customer.api.key>

{
	"number": "a_unique_identifier",
	"amount": 23,
	"currency": "EUR",
	"card": {
		"pan": "4111111111111111",
		"expires": [2, 22],
		"csc": "987",
		"verification": {
			"type": "challenge",
			"data": {
				"authentication": "spwg/pFPMhd8fMgHL2eiVQ9OBc8=",
				"status": "Y",
				"reference": {
					"server": "00000000-0000-0000-0000-000000000000",
					"directory": "11111111-1111-1111-1111-111111111111",
				}
			}
		}
	}
}
```
