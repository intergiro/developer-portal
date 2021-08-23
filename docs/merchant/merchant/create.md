# Create

A Intergiro Merchant is created by posting a [Merchant](./reference.html#merchant) without the id property to the merchant endpoint.

``` {1}
POST /v1/merchant

Host: merchant.intergiro.com
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "number": "Example",
  "type": "live",
  "agent": "master",
  "reference": "00000042",
  "descriptor": "Example",
  "name": "Example Merchant",
  "reconciliation": {
    "account": "Example Account",
    "currency": "EUR",
    "fees": {
      "capture": 0.1,
      "refund": 0.1,
      "eea": {
        "visa": {
          "percentage": 1.2
        },
        "mastercard": {
          "percentage": 1.2
        }
      },
      "other": {
        "visa": {
          "percentage": 1.5
        },
        "mastercard": {
          "percentage": 1.5
        }
      }
    },
    "reserves": {
      "percentage": 20,
      "days": 50
    }
  },
  "country": "SE",
  "currency": "EUR",
  "categoryCode": "7372",
  "rules": {
    "master": [
      "reject authorization if !authorization.verification:verified !authorization.recurring:subsequent",
      "reject authorization if authorization.recurring:initial !authorization.verification:verified",
      "reject authorization if !authorization.recurring:subsequent !authorization.card.csc:present"
    ]
  }
}
```

Example Response:

``` {1}
HTTP 200 OK

{
    "number": "Example",
    "type": "test",
    "agent": "master",
    "reference": "00000042",
    "descriptor": "Example",
    "name": "Example Merchant",
    "reconciliation": {
        "account": "Example Account",
        "currency": "EUR",
        "fees": {
            "capture": 0.1,
            "refund": 0.1,
            "eea": {
                "visa": {
                    "percentage": 1.2
                },
                "mastercard": {
                    "percentage": 1.2
                }
            },
            "other": {
                "visa": {
                    "percentage": 1.5
                },
                "mastercard": {
                    "percentage": 1.5
                }
            }
        },
        "reserves": {
            "percentage": 20,
            "days": 50
        }
    },
    "country": "SE",
    "currency": "EUR",
    "categoryCode": "7372",
    "rules": {
        "master": [
            "reject authorization if !authorization.verification:verified !authorization.recurring:subsequent",
            "reject authorization if authorization.recurring:initial !authorization.verification:verified",
            "reject authorization if !authorization.recurring:subsequent !authorization.card.csc:present"
        ]
    },
    "id": "6TnDbd5B"
}
```