# Functions
Functions can be used as a condition in a [Rule](./rules.html) to silmplify writing rules and to make them more human readable. An agent bearer API-key is needed to create, change and list Functions.

| Name                    | Arguments                                      | True if...                                                                                                                            |
|-------------------------|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `currencyOtherThan`     | [`Country`](../common/reference.html#currency) | authorization currency is something other than the specified currency                                                                 |
| `cscMissing`            |                                                | not a subsequent payment and the card csc is absent                                                                                   |
| `verificationThreshold` | `number`                                       | authorization amount is greater than the argument, the authorization is not yet verified and it is not a subsequent recurring payment |
| `sanctionedCardCountry` |                                                | issuer country is a [sanctioned country]()                                                                                            |
| `cardCountryNotEEA`     |                                                | issuer country is not an EEA country                                                                                                  |
| `sanctionedIpCountry`   |                                                | the country of the card holder ip is a [sanctioned country]()                                                                         |
| `ipCountryNotEEA`       |                                                | the country of the card holder is not an EEA country                                                                                  |
| `recurring`             |                                                | the authorization is a recurring payment                                                                                              |
| `recurringNotVerified`  |                                                | the authorization is a recurring payment and is not yet verified                                                                      |
| `fraudio`               |                                                | fraudio recommends blocking the transaction                                                                                           |

## How to write Functions
The [`Functions`](./reference.html#functions) object is of type `Record<string, Detail>` where the key is the name of the function and the value is an object which contains some detailed information about the function. 

The [Detail](./reference#detail) object includes:
- The `definition` field works the same as a Rule [condition](./rules.html#condition). This is a boolean expression, created using information from:
    - [PreAuthorization](../authorization/states.html#preauthorization)
    - [extended PreAuthorization](./rules.html#extended-state)
    - [PostAuthorization](../authorization/states.html#postauthorization).
- The `arguments` field is a list of all arguments used in the function. 
- The [Description](./reference.html#description) field is optional and can include a summary of the function, a description of each argument used in the function and examples of how to use the function. 

Example of a `Functions` object that sets a limit on the amount and currency for a transaction:
``` JSON
{
   "currencyOtherThan": {
        "definition": "!authorization.currency:value",
        "arguments": ["currency"],
        "description": {
            "arguments":{
                "currency": "The allowed currency of a transaction."
            },
            "example": {
                "currencyOtherThan(EUR)": "!authorization.currency:EUR",
                "currencyOtherThan(SEK)": "!authorization.currency:SEK"
            },
            "summary": "Currency limitation on a transaction."
       }
   }
}
```
Example rules:

`"reject authorization if currencyOtherThan(EUR)"`

`"reject authorization if cscMissing()"`

## Create 

Example request:
``` {1} JSON
POST /v1/merchant/functions

Content-Type: application/json
Authorization: Bearer <agent.api.key>

{
   "currencyOtherThan": {
        "definition": "!authorization.currency:value",
        "arguments": ["currency"],
        "description": {
            "arguments":{
                "currency": "The allowed currency of a transaction."
            },
            "example": {
                "currencyOtherThan(EUR)": "!authorization.currency:EUR",
                "currencyOtherThan(SEK)": "!authorization.currency:SEK"
            },
            "summary": "Currency limitation on the transactions."
       }
   }
}
```
## Change

Example request:
``` {1} JSON
PUT /v1/merchant/functions

Content-Type: application/json
Authorization: Bearer <agent.api.key>

{
    "verificationThreshold": {
        "definition": "authorization.amount>threshold !authorization.verification:verified !authorization.recurring.type:subsequent",
        "arguments": ["threshold"],
        "description": {
            "arguments":{
                "threshold": "Maximum amount allowed for a transaction without requiring verification.",
            },
            "example": {
                "verificationThreshold(300)": "authorization.amount>300 !authorization.verification:verified !authorization.recurring.type:subsequent",
                "verificationThreshold(500)": "authorization.amount>500 !authorization.verification:verified !authorization.recurring.type:subsequent"
            },
            "summary": "Amount limitation for a transaction without requiring verification."
        }
    }
}
```

## List

Example request:
``` {1} JSON
GET /v1/merchant/functions

Content-Type: application/json
Authorization: Bearer <agent.api.key>
```

Example response body: 

``` JSON
{
   "currencyOtherThan": {
        "definition": "!authorization.currency:value",
        "arguments": ["currency"],
        "description": {
            "arguments":{
                "currency": "The allowed currency of a transaction."
            },
            "example": {
                "currencyOtherThan(EUR)": "!authorization.currency:EUR",
                "currencyOtherThan(SEK)": "!authorization.currency:SEK"
            },
            "summary": "Currency limitation on the transactions."
       }
   },
    "verificationThreshold": {
        "definition": "authorization.amount>threshold !authorization.verification:verified !authorization.recurring.type:subsequent",
        "arguments": ["threshold"],
        "description": {
            "arguments":{
                "threshold": "Maximum amount allowed for a transaction without requiring verification.",
            },
            "example": {
                "verificationThreshold(300)": "authorization.amount>300 !authorization.verification:verified !authorization.recurring.type:subsequent",
                "verificationThreshold(500)": "authorization.amount>500 !authorization.verification:verified !authorization.recurring.type:subsequent"
            },
            "summary": "Amount limitation for a transaction without requiring verification."
        }
    }
}
```