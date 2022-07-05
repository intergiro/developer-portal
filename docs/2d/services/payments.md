
# Payments

## Create Payment(s).

With our bulk payments endpoint, you can automate your payment flow and seamlessly create hundreds of payments.

There are a few basic restrictions:

- Currently only SEPA EUR transfers are permitted through this endpoint

- Payment batches can only be created from one source account, but from there money transfers can be sent to many beneficiaries 

- A maximum of `1000` payments can be created per batch request

Example send payment(s) request:

``` {1}
POST v1/bulk_payments

Content-Type: application/json
Authorization: Bearer <access_token>

{
	"account_id": "gHcYiRdtr",
	"items": [
		{
			"counterparty": {
				"type": "sepa",
				"account_details": {
					"name": "B0",
					"account_iban": "SE9297700000010008060245",
					"account_bic": "FTCSSESS"
				}
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

- For security reasons, all payments created via the 2d API must be approved by a user with payment approval permissions. We have added this human breakpoint to protect your company from fraudulent or suspicious activity. 

- To approve payments, the user with payment approval permissions simply needs to log in to our customer portal and go to the “Payments” section, where they can review API-created payments and approve or reject them.
