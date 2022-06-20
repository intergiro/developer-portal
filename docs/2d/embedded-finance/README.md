# Accounts as a Service.

<img :src="$withBase('/assets/img/embedded-splash.jpg')" alt="Business banking">

## Accounts.

Accounts are fundamental and serve as a basis for other value-add services that we offer.

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

# Transactions as a Service.

### View company transactions.

Example list transactions request:

``` {1}
GET v1/transactions?limit=1&starting_after=Z90eUfveI

Content-Type: application/json
Authorization: Bearer <access_token>
```
Where:
- `starting_after`: ID of the transaction from which it should start the selection.
- `limit`: the number of transactions returned.

Response:

``` {1,4-5}
HTTP 200 OK

{
	"data": [
		{
			"account_id": "gHcYiRdtr",
			"amount": -1,
			"counterparty": {
				"account_details": {
					"iban": "SE2697700000010002870284",
					"type": "sepa"
				},
				"account_id": "xyS9BBCIy",
				"name": "test PA appr"
			},
			"created_at": "2021-10-25T09:44:30.166Z",
			"currency": "EUR",
			"exchange_rate": null,
			"id": "a5EXJsMUB5",
			"payment_amount": -1,
			"payment_currency": "EUR",
			"reference": "test bulk pa",
			"status": "pending_approval",
			"type": "bank-transfer"
		}
	],
	"has_more": true

```

# Payments as a Service.

## Create Payment(s).

The only supported way to transfer money via 2D API is using bulk_payments
It allows to transfer money from single source account to many beneficiaries.
Only SEPA EUR transfers are allowed.

### Create payment(s).

Example send payment(s) request:

``` {1}
POST v1/bulk_payments

Content-Type: application/json
Authorization: Bearer <access_token>

{
	"account_id": "gHcYiRdtr",
	"items": [
		{
			"beneficiary": {
				"name": "B0",
				"account_iban": "SE9297700000010008060245",
				"account_bic": "FTCSSESS"
			},
			"amount": 1,
			"reference": "C1"
		}
	]
}
```

Response:

``` {1}
HTTP 200 OK

{
	"account_id": "gHcYiRdtr",
	"id": "c8d28ebe-7215-4e6e-b9f4-eb9fd9d26f83",
	"items": [
		{
			"beneficiary": {
				"account_bic": "FTCSSESS",
				"account_iban": "SE9297700000010008060245",
				"name": "B0"
			},
			"currency": "EUR",
			"fee_amount": 0,
			"fee_reason": "velocity-overflow",
			"id": "9d0855e3-f92f-40ee-bfd9-fc557875e34b",
			"net_amount": 1,
			"reference": "C1",
			"total_amount": 1
		}
	],
	"status": "sent",
	"totals_by_currency": {
		"eur": {
			"fee": 0,
			"net": 1,
			"total": 1
		}
	}
}
```

# Important
Status `sent` does not mean the payment is already `sent`. It means payment is created with status `pending approval` and waiting for an approval. To approve or reject the payment it is mandatory to first, visit [Intergiro business account](https://business.intergiro.com/portal/payments/api-payments) page, find a specific bulk created via 2D API and approve by applying SCA. This step of applying SCA is mandatory due to latest banking regulations.
