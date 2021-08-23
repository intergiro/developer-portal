# Create

In order to create a [Verification](./reference.html#verification), first send a request with the body of the request set as an [Verification creatable](./reference.html#verification).

``` {1}
POST /v1/verification

Host: merchant.intergiro.com
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