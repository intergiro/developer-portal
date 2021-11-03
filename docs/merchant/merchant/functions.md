# Functions
Functions can be used as a condition in a [Rule](./rules.html) to silmplify writing rules and to make them more human readable. An agent bearer API-key is needed to create, change and list Functions.

Examples of Rules using Functions: 
- `reject authorization if limit(300,EUR)`
- `reject authorization if enforce3Ds(15)` 


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
   "limit": {
        "definition": "authorization.amount>=max | !authorization.currency:currency",
        "arguments": ["max", "currency"],
        "description": {
            "arguments":{
                "max": "Maximum amount allowed for a transaction.",
                "currency": "The allowed currency of a transaction."
            },
            "example": {
                "limit(300,EUR)": "authorization.amount>=300 | !authorization.currency:EUR",
                "limit(500,SEK)": "authorization.amount>=500 | !authorization.currency:SEK"
            },
            "summary": "Amount and currency limitation on a transaction."
       }
   }
}
```
Example rule:

`"reject authorization if limit(300,EUR)"`

## Create 

Example request:
``` {1} JSON
POST /v1/merchant/functions

Content-Type: application/json
Authorization: Bearer <agent.api.key>

{
   "limit": {
       "definition": "authorization.amount>=max | !authorization.currency:currency",
       "arguments": ["max", "currency"],
       "description": {
            "arguments":{
                "max": "Maximum amount allowed for a transaction.",
                "currency": "The allowed currency of a transaction."
            },
            "example": {
                "limit(300,EUR)": "authorization.amount>=300 | !authorization.currency:EUR",
                "limit(500,SEK)": "authorization.amount>=500 | !authorization.currency:SEK"
            },
            "summary": "Amount and currency limitation on a transaction."
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
    "limit": {
        "definition": "authorization.amount>=max | !authorization.currency:currency | authorization.card.amount.last1Days>dailyAmount",
        "arguments": ["max", "currency", "dailyAmount"],
        "description": {
            "arguments":{
                "max": "Maximum amount allowed for a transaction.",
                "currency": "The allowed currency of a transaction.",
                "dailyAmount": "Maximum amount allowed for a transaction from one card in one day."
            },
            "example": {
                "limit(300,EUR,50)": "authorization.amount>=300 | !authorization.currency:EUR | authorization.card.amount.last1Days>50",
                "limit(500,SEK,100)": "authorization.amount>=500 | !authorization.currency:SEK | authorization.card.amount.last1Days>100"
            },
            "summary": "Amount and currency limitation on a transaction."
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

{
   "limit": {
       "definition": "authorization.amount>=max | !authorization.currency:currency",
       "arguments": ["max", "currency"],
       "description": {
            "arguments":{
                "max": "Maximum amount allowed for a transaction.",
                "currency": "The allowed currency of a transaction."
            },
            "example": {
                "limit(300,EUR)": "authorization.amount>=300 | !authorization.currency:EUR",
                 "limit(500,SEK)": "authorization.amount>=500 | !authorization.currency:SEK"
            },
            "summary": "Amount and currency limitation on a transaction."
       }
   },
   "enforce3Ds": {
        "definition": "authorization.amount>amount !authorization.verification:verified",
        "arguments": ["amount"],
        "description": {
            "arguments":{
                "amount": "Minimum amount to enforce 3Ds."
            },
            "example": {
                "enforce3Ds(15)": "authorization.amount>15 !authorization.verification:verified"
            },
            "summary": "Sets the minimum amount of an authorization to enforce 3Ds."
       }
   }
}
```
