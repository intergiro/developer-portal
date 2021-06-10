# Verification API
In order to create a [Verification](../merchants-reference/verification.html), first send a request with the body of the request set as an [Verification creatable](../merchants-reference/verification.html#creatable).

``` {1}
POST /verification

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>
```

Example Response:

``` {1}
HTTP 200 OK

{
	type: "challenge",
	data: {
		authentication: "testtest",
		status: "U",
		reference: {
			server: "threeD",
			directory: "dsTransactionId",
		},
	},
}
```