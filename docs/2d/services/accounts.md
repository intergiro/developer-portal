
# Accounts

<img :src="$withBase('/assets/img/embedded-splash.jpg')" alt="Business banking">

### View company accounts.

Example list accounts request:

``` {1}
GET /v1/accounts

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

``` {1}
HTTP 200 OK

{
	"data": [
		{
			"balance": 50000000,
			"currency": "EUR",
			"id": "gHcYiRdtr",
			"name": "EUR SEPA Account"
		}
  ]
  "has_more": false
}
```
