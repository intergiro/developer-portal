
# Transactions

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
