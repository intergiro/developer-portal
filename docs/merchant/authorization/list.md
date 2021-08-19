# List

Listing all available authorizations.

``` {1}
GET /v1/authorization/

Host: merchant.intergiro.com
Authorization: Bearer <access_token>
```

Example response for succesful cancelation:
``` {1}
HTTP 200 OK

[{
	id: "1234567890123456",
	number: "a_unique_identifier",
	merchant: "testtest",
	amount: 23,
	currency: "EUR",
	history: [],
	change: [],
	capture: [],
	refund: [],
	created: "2021-04-01T09:00:00.000Z",
	reference: "12341234",
	card: {
		csc: "matched",
		expires: [2, 22],
		iin: "411111",
		last4: "1111",
		scheme: "visa",
		type: "debit",
	},
}]
```