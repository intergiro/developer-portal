# Refund
## Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `descriptor` | `number` | (optional)  |


## Refund

| Property     | Type                                                            | Description                              |
|--------------|-----------------------------------------------------------------|------------------------------------------|
| `number`     | `string`                                                        | (optional)                               |
| `created`    | [`DateTime`](./other.html#datetime)                             |                                          |
| `reference`  | `string`                                                        | (optional)                               |
| `approved`   | [`DateTime`](./other.html#datetime)                             | (optional)                               |
| `amount`     | `number`                                                        |                                          |
| `descriptor` | `string`                                                        | (optional)                               |
| `settlement` | [`Settlement.Transaction`](./other.html#settlement-transaction) | (optional)                               |
| `status`     | `string`                                                        | `"approved"`, `"pending"` or `"settled"` |
