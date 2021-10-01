# Rules

A `Rules` object is of type `Record<string, Rule[]>`. The key specifies who has made the rule. The key can for example be `"merchant"`, `"agent"` or `"master"`. 

A merchant can have rules added to them. These rules can control if authorizations, captures, refunds or voids get rejected based on some criteria. [Read more of how to write a Rule](./rules.html#how-to-write-a-rule).

Merchant rules can be [updated simultaneously with merchant information with a PATCH call](./update.html) or seperatly with a PATCH or PUT call to merchant/merchant_id/rule.

The Rules specified by the key `"master"` are rules set up by the acquirer. A PUT call replaces the Record with the rules from the body, while a PATCH call only replaces the array with the same property name as the one in the body.

## Patch rules

Only a private or agent bearer token is authorized to make this call.

Example PATCH request:
``` {1} JSON
PATCH /v1/merchant/:id/rule

Content-Type: application/json
Authorization: Bearer <private.api.key> or <agent.api.key>

{
    "agent": ["reject refund if merchant.refundable<0"],
    "merchant": [
        "reject capture if !authorization.currency:(EUR|SEK)",
        "reject capture if authorization.currency:(EUR) merchant.captured > 25000",
        "reject capture if authorization.currency:(SEK) merchant.captured > 250000"
    ]
}
```

## Put rules

Only an acquirer can make this call (agent access token with id="master").

Example PUT Rule request:
``` {1} JSON
PUT /v1/merchant/:id/rule

Content-Type: application/json
Authorization: Bearer <master access_token>

{
    "master": ["reject capture if merchant.captured > 250000"],
    "agent": ["reject refund if merchant.refundable<0"]
}
```

## How to write a Rule 

A Rule is a string that can be parsed and divided into the folloing parts.

`action` `operation` if `condition`

- `action` is as of yet limited to `"reject"`.
- `operation` can be set as `"authorization"`, `"capture"`, `"refund"` or `"void"`.
- `condition` is a boolean expression, created using information from:
    - [PreAuthorization](../authorization/states.html#preauthorization)
    - [extended PreAuthorization](../authorization/states.html#preauthorization)
    - [PostAuthorization](../authorization/states.html#postauthorization).

Example rule:

`"reject capture if merchant.captured > 250000"`

A rule always applies to an [authorization state](../authorization/states.html). An `"authorization"` operation is applied to the [PreAuthorization State](../authorization/states.html#preauthorization), e.g. The Rule `"reject authorization if merchant.captured > 250000"` will be used to possibly reject an authorization attempt. Whereas, all other operations (`"capture"`, `"refund"` and `"void"`) are applied to the [PostAuthorization State](../authorization/states.html#postauthorization).

### Condition

| Operator     | Description              | Example                                                               |
|--------------|--------------------------|-----------------------------------------------------------------------|
| `.`          | Property of              | `merchant.captured`                                                   |
| `+`          | Addition                 | `merchant.refundable + 2500`                                          |
| `-`          | Subtraction              | `merchant.settled - 100`                                              |
| `*`          | Multiplication           | `merchant.captured * 2`                                               |
| `:`          | Equal to                 | `merchant.scheme:visa`                                                |
| `!`          | Not                      | `!authorization.verification:verified`                                |
| ...`*`       | Ends with                | `authorization.created:2021-05-31*`                                   |
| `has(`...`)` | Has property             | `authorization:has(currency)`                                         |
| `<`          | Less than                | `merchant.refundable < -3000`                                         |
| `<=`         | Less than or equal to    | `authorization.captured.amount <= 5000`                               |
| `>`          | Greater than             | `authorization.amount > 225`                                          |
| `>=`         | Greater than or equal to | `merchant.captured >= 250000`                                         |
| `|`          | Or                       | `!authorization.currency:(EUR) | !authorization.card.csc:present`     |
| ` `          | And                      | `!authorization.recurring:subsequent !authorization.card.csc:present` |

Spacing is important when writing a condition. 

When writing `20-12-24` is a string whereas `20 - 12 - 24` is a number. 

Space can also be used as an AND-operator to chain several conditions together.

### Extended State

Depending on which [guards](./update.html#guards) are set on a merchant, the [PreAuthorization](../authorization/states.html#preauthorization) on which the rules apply, will contain additional information regarding the transaction under the field `authorization`. 

#### Iin
The iin Guard will add information about the country of the card issuer on the `authorization.card` property on the [PreAuthorization](../authorization/states.html#preauthorization).

| Property  | Type                                        | Description | Optional |
|-----------|---------------------------------------------|-------------|----------|
| `country` | [`Alpha2`](../common/reference.html#alpha2) |             | Yes      |

Example of the information added to the [PreAuthorization](../authorization/states.html#preauthorization):
``` json
{
    "authorization": {
        "card": {
            "country": "SE"
        }
    }
}
```

Example Rule:

`reject authorization if authorization.card.country:within(SE, NO, FI, DK)`

Can be useful to check if the property exists:

`reject authorization if (!authorization.card:has(country)) | (authorization.card.country:within(SE, NO, FI, DK))`

#### Card
The card Guard will add information about the history of card being used with a merchant, this information will be added on the `authorization.card` property on the [PreAuthoirzation](../authorization/states.html#preauthorization).

| Property       | Type                              | Description                                                           | Optional |
|----------------|-----------------------------------|-----------------------------------------------------------------------|----------|
| `amount`       | [`LastDays`](rules.html#lastdays) | Total amount for tha past 1-5 days (converted to merchant's currency) | Yes      |
| `transactions` | [`LastDays`](rules.html#lastdays) | Number of transaction for the past 1-5 days                           | Yes      |

Example of the information added to the [PreAuthorization](../authorization/states.html#preauthorization):
``` json
{
    "authorization": {
        "card": {
            "amount": {
                "last1days": 6.53,
                "last2days": 14.7,
                "last3days": 25.45,
                "last4days": 25.45,
                "last5days": 33.2
            },
            "transactions": {
                "last1days": 1,
                "last2days": 2,
                "last3days": 3,
                "last4days": 3,
                "last5days": 4
            }
        }
    }
}
```

Example Rules:

`reject authorization if authorization.card.amount.last3Days>500`

`reject authorization if authorization.card.transactions.last4Days>10`

Can be useful to check if the property exists:

`reject authorization if (!authorization.card:has(transactions)) | (authorization.card.transactions.last4Days>10)`

#### Email
The email Guard will add information about the history of emails being used with a merchant, this information will be added on the `authorization` property on the [PreAuthorization](../authorization/state.html#preauthorization).

Note that email must always be set on contact.email on the [verification creatable](../verification/reference.html#creatable) when creating the verification for this rule to apply.

| Property       | Type                              | Description                                                                                     | Optional |
|----------------|-----------------------------------|-------------------------------------------------------------------------------------------------|----------|
| `amount`       | [`LastDays`](rules.html#lastdays) | Total amount accosiated with an email for tha past 1-5 days (converted to merchant's currency)  | Yes      |
| `transactions` | [`LastDays`](rules.html#lastdays) | Number of transaction accosiated with an email for the past 1-5 days                            | Yes      |
| `card`         | [`LastDays`](rules.html#lastdays) | Number of transaction an email has been used in combination with the card for the past 1-5 days | Yes      |

Example of the information added to the [PreAuthorization](../authorization/states.html#preauthorization):
``` json
{
    "authorization": {
        "email": {
            "amount": {
                "last1days": 15.5,
                "last2days": 15.5,
                "last3days": 33.4,
                "last4days": 33.4,
                "last5days": 70.25
            },
            "transactions": {
                "last1days": 1,
                "last2days": 1,
                "last3days": 2,
                "last4days": 2,
                "last5days": 3
            },
            "card": {
                "last1days": 1,
                "last2days": 1,
                "last3days": 1,
                "last4days": 1,
                "last5days": 2
            }
        }
    }
}
```

Example Rules:

`reject authorization if authorization.email.amount.last3Days>500`

`reject authorization if authorization.email.transactions.last4Days>10`

`reject authorization if authorization.email.card.last4Days>3`

Can be useful to check if the property exists:

`reject authorization if (!authorization.email:has(transactions)) | (authorization.email.transactions.last4Days>10)`

#### LastDays

| Property    | Type   |
|-------------|--------|
| `last1days` | number |
| `last2days` | number |
| `last3days` | number |
| `last4days` | number |
| `last5days` | number |