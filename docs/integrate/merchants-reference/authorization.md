
# Authorization

## Creatable

Authorization Creatable

| Property     | Type                                                      | Description |
|--------------|-----------------------------------------------------------|-------------|
| `number`     | `string`                                                  |             |
| `amount`     | `number`                                                  |             |
| `currency`   | [`Currency`](./other.html#currency)                       |             |
| `card`       | `Signed JWT` or [`Card.Creatable`](./card.html#creatable) |             |
| `descriptor` | `string`                                                  | (optional)  |
| `capture`    | `"auto"`                                                  | (optional)  |
| `recurring`  | [`Recurring`](#recurring)                                 | (optional)  |

## Authorization

| Property   | Type                                                             | Description      |
|------------|------------------------------------------------------------------|------------------|
| id         | `string`                                                         | ID in our system |
| merchant   | `string`                                                         | ID in our system |
| number     | `string`                                                         |                  |
| reference  | `string`                                                         |                  |
| created    | [`DateTime`](./other.html#datetime)                              |                  |
| amount     | `number`                                                         |                  |
| currency   | [`Currency`](./other.html#currency)                              |                  |
| card       | [`Card`](./card)                                                 |                  |
| descriptor | `string`                                                         | (optional)       |
| recurring  | [`Recurring`](authorization.html#recurring)                      | (optional)       |
| history    | `History[]`                                                      |                  |
| change     | [`Change[]`](./Change)                                           | (optional)       |
| capture    | [`Capture[]`](./Capture)                                         |                  |
| refund     | [`Refund[]`](./Refund)                                           |                  |
| void       | [`DateTime`](./other.html#datetime)                              | (optional)       |
| status     | [`Partial<Record<Status, number>>`](./authorization.html#status) |                  |


### Status
Authorization.Status is string set to `"authorized"`, `"cancelled"`, `"captured"`, `"refunded"` or `"settled"`.

### Recurring
Recurring can be defined in four ways: 
 - As a string: `"initial"`
 - As an Initial reacurring: `{ type: "initial"; initiator: "cardholder"}`
 - As a Subsequent recurring: `{ type: "subsequent"; reference: string; scheduled?: false; initiator: "merchant" | "cardholder"}`
 - As a Scheduled Recurring: `{ type: "subsequent"; reference: string; scheduled: true; initiator: "merchant" }`
 