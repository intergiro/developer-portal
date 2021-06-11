# Capture
## Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `auto`       | `true`   | (optional)  |
| `descriptor` | `number` | (optional)  |

## Capture

| Property     | Type                                                            | Description                              |
|--------------|-----------------------------------------------------------------|------------------------------------------|
| `number`     | `string`                                                        | (optional)                               |
| `created`    | [`DateTime`](./other.html#datetime)                             |                                          |
| `reference`  | `string`                                                        |                                          |
| `approved`   | [`DateTime`](./other.html#datetime)                             | (optional)                               |
| `amount`     | `number`                                                        |                                          |
| `auto`       | `true`                                                          | (optional)                               |
| `settlement` | [`Settlement.Transaction`](./other.html#settlement-transaction) | (optional)                               |
| `descriptor` | `string`                                                        | (optional)                               |
| `status`     | `string`                                                        | `"approved"`, `"pending"` or `"settled"` |