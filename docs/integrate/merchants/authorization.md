
# Authorization

## Creatable
Authorization Creatable

| Property     | Type                            | Description                                                                                                                    |
|--------------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `number`     | `string`                        |                                                                                                                                |
| `amount`     | `number`                        |                                                                                                                                |
| `currency`   | `string`                        | ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish Crowns. |
| `card`       | `authly.Token | Card.Creatable` | Read More about Token and Card.Creatable [here](../merchants/card)                                                             |
| `descriptor` | `string`                        | (optional)                                                                                                                     |
| `capture`    | `"auto"`                        | (optional)                                                                                                                     |
| `recurring`  | [`Recurring`](#recurring)       | (optional)                                                                                                                     |



## Authorization

| Property   | Type                                           | Description |
|------------|------------------------------------------------|-------------|
| id         | `authly.Identifier`                            |             |
| merchant   | `authly.Identifier`                            |             |
| number     | `string`                                       |             |
| reference  | `string`                                       |             |
| created    | `isoly.DateTime`                               |             |
| amount     | `number`                                       |             |
| currency   | `isoly.Currency`                               |             |
| card       | `model.Card`                                   |             |
| descriptor | `string`                                       | (optional)  |
| recurring  | `AuthorizationRecurring`                       | (optional)  |
| history    | `AHistory[]`                                   |             |
| change     | `AChange[]`                                    | (optional)  |
| capture    | `Capture[]`                                    |             |
| refund     | `Refund[]`                                     |             |
| void       | `isoly.DateTime`                               | (optional)  |
| status     | `Partial<Record<AuthorizationStatus, number>>` |             |


### Recurring
Recurring can be defined in four ways: 
 - As a simple string: `"initial"`
 - As a Initial reacurring: `{ type: "initial"; initiator: "cardholder"}`
 - As a Subsequent recurring: `{ type: "subsequent"; reference: string; scheduled?: false; initiator: "merchant" | "cardholder"}`
 - As a Scheduled Recurring: `{ type: "subsequent"; reference: string; scheduled: true; initiator: "merchant" }`


## Change

| Property  | Type     | Description                                                      |
|-----------|----------|------------------------------------------------------------------|
| `number`  | `string` | (optional)                                                       |
| `created` | `string` | Written as `"YYYY-MM-DDThh:mm:ss"`, e.g. `"2020-12-31T23:59:59"` |
| `amount`  | `number` |                                                                  |

## Operation

| Property  | Type                                        | Description                                                                                                           |
|-----------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `id`      | `string`                                    | string length is divisible by 4, and only contains characters `"0"`- `"9"`, `"A"`-`"Z"`, `"a"`-`"z"`, `"-"` and `"_"` |
| `change`  | [`Change.Creatable`](../change-creatable)   | (optional)                                                                                                            |
| `capture` | [`Capture.Creatable`](../capture-creatable) | (optional)                                                                                                            |
| `refund`  | [`Refund.Creatable`](../refund-creatable)   | (optional)                                                                                                            |
| `void`    | `true`                                      | (optional)                                                                                                            |

### Change.Creatable

| Property | Type     | Description |
|----------|----------|-------------|
| `number` | `string` | (optional)  |
| `amount` | `number` | (optional)  |


### Capture.Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `auto`       | `true`   | (optional)  |
| `descriptor` | `string` | (optional)  |

### Refund.Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `descriptor` | `string` | (optional)  |