# Authorization
In order to create an [Authorization](../merchants-reference/authorization.html), first send a request with the body of the request set as an [Authorization creatable](../merchants-reference/authorization.html#creatable).

Example Authorization request:
``` {1}
POST /authorization

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
	number: "a_unique_identifier",
	amount: 23,
	currency: "EUR",
	card: {
		pan: "4111111111111111",
		expires: [02, 22],
		csc: "987"
	}
}
```

Example Response:

``` {1}
HTTP 200 OK

{
	id: "1234567890123456",
	number: "testNumber",
	merchant: "testtest",
	amount: 101.1,
	currency: "SEK",
	history: [],
	change: [],
	capture: [],
	refund: [],
	created: "2021-04-01T09:00:00.000Z",
	reference: "12341234",
	card: {
		csc: "matched",
		expires: [2, 28],
		iin: "123456",
		last4: "1111",
		scheme: "visa",
		type: "debit",
	},
}
```