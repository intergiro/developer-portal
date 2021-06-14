# Capture
## Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `descriptor` | `number` | (optional)  |

## Capture

| Property     | Type                                                            | Description                              |
|--------------|-----------------------------------------------------------------|------------------------------------------|
| `number`     | `string`                                                        | (optional)                               |
| `created`    | [`DateTime`](./other.html#datetime)                             |                                          |
| `reference`  | `string`                                                        |                                          |
| `approved`   | [`DateTime`](./other.html#datetime)                             | (optional)                               |
| `amount`     | `number`                                                        |                                          |
| `settlement` | [`Settlement.Transaction`](./other.html#settlement-transaction) | (optional)                               |
| `descriptor` | `string`                                                        | (optional)                               |
| `status`     | `string`                                                        | `"approved"`, `"pending"` or `"settled"` |