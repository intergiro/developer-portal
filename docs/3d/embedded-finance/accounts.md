


# Accounts

Accounts are fundamental and serve as a basis for other value-add services that we offer.

### Create a new current account

Example create account request:

``` {1}
POST /v3/accounts

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "individual_id": "bd4af0ff-0a72-4e09-b247-c6d8c2391496"
}
```

Response:

``` {1}
HTTP 200 OK

{
  "id": "8942eaf9-80b3-4060-a0b7-e03c35ca12f4",
  "name": "EUR account",
  "currency": "EUR",
  "balance": 0,
  "created_at": "2021-02-08T14:09:15.000Z",
  "type": "current"
}
```


### Fund account

Wiring money into the account requires bank account details like bank code and account number.

These can be easily accessed by calling `GET /v3/accounts/:id/bank_details`:


``` {1}
GET /v3/accounts/8942eaf9-80b3-4060-a0b7-e03c35ca12f4/bank_details

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

``` {1}
HTTP 200 OK

[
  {
    "payment_rail": "sepa",
    "details": {
      "iban": "SE0097700000000000000001",
      "bic": "FTCSSESSXXX"
    },
    "beneficiary": "Intergiro Intl AB (publ)",
    "beneficiary_address": {
      "street1": "Regeringsgatan 59",
      "city": "Stockholm",
      "country_code": "SE",
      "post_code": "111 56"
    }
  }
]
```

