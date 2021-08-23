# Rules

A `Rules` object is of type `Record<string, Rule[]>`. The key specifies who has made the rule. The key can for example be `"merchant"`, `"agent"` or `"master"`. 

A merchant can have rules added to them. These rules can control if authorizations, captures, refunds or voids get rejected based on some criteria. [Read more of how to write a Rule](./rules.html#how-to-write-a-rule).

Merchant rules can be [updated simultaneously with merchant information with a PATCH call](./update) or seperatly with a PATCH or PUT call to merchant/merchant_id/rule.

The Rules specified by the key `"master"` are rules set up by the acquirer. A PUT call replaces the Record with the rules from the body, while a PATCH call only replaces the array with the same property name as the one in the body.

## Patch rules

Only a private or agent bearer token is authorized to make this call.

Example PATCH request:
``` {1}
PATCH /v1/merchant/:id/rule

Host: b2b.intergiro.com
Content-Type: application/json
Authorization: Bearer <private or agent access_token>

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
``` {1}
PUT /v1/merchant/:id/rule

Host: b2b.intergiro.com
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
- `condition` is a boolean expression, created using information from either a [Pre-](./states.html#preauthorization) or [PostAuthorization](./states.html#postauthorization).

Example rule:

`"reject capture if merchant.captured > 250000"`

A rule always applies to a [state](./states.html). An `"authorization"` operation is applied to the [PreAuthorization State](./states.html#preauthorization), e.g. The Rule `"reject authorization if merchant.captured > 250000"` will be used to possibly reject an authorization attempt. Whereas, all other operations (`"capture"`, `"refund"` and `"void"`) are applied to the [PostAuthorization State](./states.html#postauthorization).

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