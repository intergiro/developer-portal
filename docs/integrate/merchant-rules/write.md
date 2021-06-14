# How to write a Rule 

A Rule is a string that can be parsed and divided into the folloing parts.

`action` `event` if `condition`

- `action` is as of yet limited to `"reject"`.
- `event` can be set as `"authorization"`, `"capture"`, `"refund"` or `"void"`.
- `condition` is a boolean expression.

Example rule:

`"reject capture if merchant.captured > 250000"`

## Condition
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

Spacing is important when writting a condition. 

When writing `20-12-24` is a string whereas `20 - 12 - 24` is a number. 

Space can also be used as an AND-operator to chain several conditions together.


# Rules
A `Rules` object is of type `Record<string, Rule[]>`. The key specifies who has made the rule. The key can for example be `"merchant"`, `"agent"` or `"master"`. The Rules specifeid by the key `"master"` are rules setup by the acquirer.