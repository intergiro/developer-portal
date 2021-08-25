# Reference
## Authorization

### Creatable

Authorization Creatable

| Property     | Type                                                           | Description                   | Optional |
|--------------|----------------------------------------------------------------|-------------------------------|----------|
| `number`     | `string`                                                       | has to be a unique identifier |          |
| `amount`     | `number`                                                       |                               |          |
| `currency`   | [`Currency`](../common/reference.html#currency)                |                               |          |
| `card`       | `Signed JWT` or [`Card.Creatable`](../card-api/reference.html) |                               |          |
| `descriptor` | `string`                                                       |                               | Yes      |
| `capture`    | `auto`                                                         |                               | Yes      |
| `recurring`  | [`Recurring`](./reference.html#recurring)                      |                               | Yes      |
| `category`   | `"purchase" | "withdrawal"`                                    |                               | Yes      |

### Authorization

| Property     | Type                                                         | Description                                     | Optional |
|--------------|--------------------------------------------------------------|-------------------------------------------------|----------|
| `id`         | `string`                                                     | Intergiro's internal generated unique ID number |          |
| `merchant`   | `string`                                                     | Intergiro's internal generated unique ID number |          |
| `number`     | `string`                                                     | Number specified by integrator (must be unique) |          |
| `reference`  | `string`                                                     | Scheme dependent external reference number      |          |
| `created`    | [`DateTime`](../common/reference.html#datetime)              |                                                 |          |
| `amount`     | `number`                                                     |                                                 |          |
| `currency`   | [`Currency`](../common/reference.html#currency)              |                                                 |          |
| `card`       | [`Card`](../card-api/reference.html#card)                    |                                                 |          |
| `descriptor` | `string`                                                     |                                                 | Yes      |
| `recurring`  | [`Recurring`](reference.html#recurring)                      |                                                 | Yes      |
| `history`    | `History[]`                                                  |                                                 |          |
| `change`     | [`Change[]`](./reference.html#change)                        |                                                 | Yes      |
| `capture`    | [`Capture[]`](./reference.html#capture)                      |                                                 |          |
| `refund`     | [`Refund[]`](./reference.html#refund)                        |                                                 |          |
| `void`       | [`DateTime`](../common/reference.html#datetime)              |                                                 | Yes      |
| `status`     | [`Partial<Record<Status, number>>`](./reference.html#status) |                                                 |          |
| `category`   | `"purchase" | "withdrawal"`                                  |                                                 | Yes      |

#### Status
Authorization.Status is string set to `"authorized"`, `"cancelled"`, `"captured"`, `"refunded"` or `"settled"`.

#### Recurring
Recurring can be defined in four ways: 
 - As the string `"initial"`
 - As an Initial recurring: `{ type: "initial"; initiator: "cardholder"}`
 - As a Subsequent recurring: `{ type: "subsequent"; reference: string; scheduled?: false; initiator: "merchant" | "cardholder"}`
 - As a Scheduled recurring: `{ type: "subsequent"; reference: string; scheduled: true; initiator: "merchant" }`
 
 ## Change
### Creatable

| Property | Type     | Optional |
|----------|----------|----------|
| `number` | `string` | Yes      |
| `amount` | `number` | Yes      |

### Change

| Property  | Type                                            | Description | Optional |
|-----------|-------------------------------------------------|-------------|----------|
| `number`  | `string`                                        |             | Yes      |
| `created` | [`DateTime`](../common/reference.html#datetime) |             |          |
| `amount`  | `number`                                        |             |          |




## Capture
### Creatable

| Property     | Type     | Optional |
|--------------|----------|----------|
| `number`     | `string` | Yes      |
| `amount`     | `number` | Yes      |
| `auto`       | `true`   | Yes      |
| `descriptor` | `number` | Yes      |

### Capture

| Property     | Type                                                                            | Description                              | Optional |
|--------------|---------------------------------------------------------------------------------|------------------------------------------|----------|
| `number`     | `string`                                                                        |                                          | Yes      |
| `created`    | [`DateTime`](../common/reference.html#datetime)                                 |                                          |          |
| `reference`  | `string`                                                                        |                                          | Yes      |
| `approved`   | [`DateTime`](../common/reference.html#datetime)                                 |                                          | Yes      |
| `amount`     | `number`                                                                        |                                          |          |
| `auto`       | `true`                                                                          |                                          | Yes      |
| `settlement` | [`Settlement.Transaction`](../settlement/reference.html#settlement-transaction) |                                          | Yes      |
| `descriptor` | `string`                                                                        |                                          | Yes      |
| `status`     | `string`                                                                        | `"approved"`, `"pending"` or `"settled"` |          |


## Refund
### Creatable

| Property     | Type     | Optional |
|--------------|----------|----------|
| `number`     | `string` | Yes      |
| `amount`     | `number` | Yes      |
| `descriptor` | `number` | Yes      |


### Refund

| Property     | Type                                                                            | Description                              | Optional |
|--------------|---------------------------------------------------------------------------------|------------------------------------------|----------|
| `number`     | `string`                                                                        |                                          | Yes      |
| `created`    | [`DateTime`](../common/reference.html#datetime)                                 |                                          |          |
| `reference`  | `string`                                                                        |                                          |          |
| `approved`   | [`DateTime`](../common/reference.html#datetime)                                 |                                          | Yes      |
| `amount`     | `number`                                                                        |                                          |          |
| `descriptor` | `string`                                                                        |                                          | Yes      |
| `settlement` | [`Settlement.Transaction`](../settlement/reference.html#settlement-transaction) |                                          | Yes      |
| `status`     | `string`                                                                        | `"approved"`, `"pending"` or `"settled"` |          |
