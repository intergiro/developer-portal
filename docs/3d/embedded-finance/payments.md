
# Payments

There are two ways to transfer money:
- move money between individual's own accounts
- pay to somebody else's account using account ID or IBAN

### Make a transfer

Internal transfers enable instant movement of funds between same-currency accounts **belonging to the same individual**. This can serve as a good way to fund someone's dedicated card account with the funds from another of their accounts.

Example move funds request:

``` {1}
POST /v3/transactions/move

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "request_id": "9b68d2fb-8ec1-44c4-b6d0-23afbe2f6a1c",
  "source_account_id": "95b31a55-7fba-47f6-b452-c6f2e7c53bde",
  "target_account_id": "b2714527-9812-490b-a3e9-c70f9cd9663c",
  "amount": 12000,
  "reference": "Move funds"
}
```

Response:

``` {1}
HTTP 200 OK

{
  "id": "27e0e678-4f04-4ae4-85d9-a5bc91be5472",
  "type": "bank-transfer",
  "amount": 12000,
  "currency": "EUR",
  "status": "pending",
  "account_id": "95b31a55-7fba-47f6-b452-c6f2e7c53bde",
  "reference": "Move funds",
  "counterparty": {
    "name": "Sigmund Fleud",
    "account_id": "b2714527-9812-490b-a3e9-c70f9cd9663c",
    "account_details": {
      "type": "sepa",
      "iban": "SE0097700000000000000002"
    }
  },
  "created_at": "2021-05-11T09:55:17.000Z"
}
```


### External bank payment

There are two main ways to make a payment to another account:
- using Intergiro account ID
- via bank details

::: warning
Making payments online requires individual's [Strong Customer Authentication](/3d/getting-started/sca/).
:::

#### Make payment using counterparty account ID

This is the best way to move funds to somebody else's Intergiro account.

Example make payment via account ID request:

``` {1,12}
POST /v3/transactions/pay

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "request_id": "9b68d2fb-8ec1-44c4-b6d0-23afbe2f6a1c",
  "account_id": "95b31a55-7fba-47f6-b452-c6f2e7c53bde",
  "counterparty": {
    "name": "Kraken LTD",
    "account_id": "220ce017-b261-4126-8bd9-addc8eb5b666"
  },
  "amount": 12000,
  "reference": "Invoice payment 1301"
}
```

Response:

``` {1}
HTTP 200 OK

{
  "id": "27e0e678-4f04-4ae4-85d9-a5bc91be5472",
  "type": "bank-transfer",
  "amount": 12000,
  "currency": "EUR",
  "status": "pending",
  "account_id": "95b31a55-7fba-47f6-b452-c6f2e7c53bde",
  "reference": "Invoice payment 1301",
  "counterparty": {
    "name": "Kraken LTD",
    "account_id": "220ce017-b261-4126-8bd9-addc8eb5b666",
    "account_details": {
      "type": "sepa",
      "iban": "SE0097700000000000000002"
    }
  },
  "created_at": "2021-05-11T09:55:17.000Z"
}
```

#### Make payment using account bank details

Example SEPA payment request:

``` {1,13-14}
POST /v3/transactions/pay

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "request_id": "9b68d2fb-8ec1-44c4-b6d0-23afbe2f6a1c",
  "account_id": "95b31a55-7fba-47f6-b452-c6f2e7c53bde",
  "counterparty": {
    "name": "Kraken LTD",
    "account": {
      "iban": "DE75512108001245126199",
      "bic": "SOGEDEFF"
    }
  },
  "amount": 12000,
  "reference": "Invoice payment 1301"
}
```

Response:

``` {1}
HTTP 412 Precondition Failed

{
  "consent": {
    "id": "e1dd9cd7-1650-42b3-8496-a970fb40ed3f",
    "status": "pending"
    "scope": [
      "make_payment"
    ],
    "expires_at": "2021-05-11T09:55:17.000Z",
  }
}
```
