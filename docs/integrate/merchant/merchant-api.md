# API

## Authorization
In order to create an [Authorization](./reference.html#authorization), first send a request with the body of the request set as an [Authorization creatable](./reference.html#authorization).

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
		expires: [2, 22],
		csc: "987"
	}
}
```

Example Response:

``` {1}
HTTP 200 OK

{
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
}
```
Sometimes [verification](./reference.html#verification) will be required. this important field to look for is the `error: "verification required"`. 
Example of a verification required response:
```{1,15}
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

## Verification
In order to create a [Verification](./reference.html#verification), first send a request with the body of the request set as an [Verification creatable](./reference.html#verification).

``` {1}
POST /verification

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
	number: "a_unique_identifier",
	items: 3,
	currency: "EUR",
	card: {
		pan: "4111111111111111",
		expires: [2, 22],
		csc: "987"
	},
	target: "https://localhost:1337/target/for/iframe/post/"
}
```

Example Response:

``` {1}
HTTP 200 OK

{
	type: "challenge",
	data: {
		authentication: "testtest",
		status: "Y",
		reference: {
			server: "00000000-0000-0000-0000-000000000000",
			directory: "11111111-1111-1111-1111-111111111111",
		},
	},
}
```

## Capture

In order to create a [Capture](./reference.html#capture), first send a request with the body of the request set as an [Capture creatable](./reference.html#capture).

``` {1}
POST authorization/:id/capture

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
    "amount": 1
}
```

Example Response:
``` {1}
HTTP 200 OK

{
  "amount": 1,
  "created": "2021-06-11T09:19:12.618Z",
  "reference": "00000000000",
  "status": "approved"
}
```

## Refund
In order to create a [Refund](./reference.html#refund), first send a request with the body of the request set as an [Refund creatable](./reference.html#refund).

``` {1}
POST authorization/:id/refund

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
    "amount": 1
}
```

Example Response:
``` {1}
HTTP 200 OK

{
  "amount": 1,
  "created": "2021-06-11T09:19:12.618Z",
  "reference": "00000000000",
  "status": "approved"
}
```
## Cancel Authorization


Only non-captured authorizations can be canceled.

``` {1}
DELETE authorization/:id

Host: api.payfunc.com
Authorization: Bearer <access_token>
```

Example response for succesful cancelation:
```
HTTP 204 No Content

```