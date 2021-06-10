# Refund
## Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `descriptor` | `number` | (optional)  |


## Refund

| Property   | Type                     | Description                              |
|------------|--------------------------|------------------------------------------|
| number     | `string`                 | (optional)                               |
| created    | `DateTime`               |                                          |
| reference  | `string`                 | (optional)                               |
| approved   | `DateTime`               | (optional)                               |
| amount     | `number`                 |                                          |
| descriptor | `string`                 | (optional)                               |
| settlement | `Settlement.Transaction` | (optional)                               |
| status     | `string`                 | `"approved"`, `"pending"` or `"settled"` |


### Settlement.Transaction

| Property      | Type                                         | Description                                                     |
|---------------|----------------------------------------------|-----------------------------------------------------------------|
| authorization | `authly.Identifier`                          |                                                                 |
| reference     | `string`                                     |                                                                 |
| type          | `string`                                     | `"authorization"`,` "capture"`, `"refund"`, `"void"` or `"all"` |
| card          | `string`                                     | `"debit"` or `"credit"`                                         |
| scheme        | `model.Card.Scheme`                          |                                                                 |
| area          | [`Alpha2`](./other#alpha2)                   |                                                                 |
| created       | [`Date`](./other.html#datetime)              |                                                                 |
| currency      | [`Currency`](./other.html#currency)          |                                                                 |
| gross         | `number`                                     |                                                                 |
| fee           | `number | { scheme: number; total: number }` |                                                                 |
| net           | `number`                                     |                                                                 |
| reserve       | `{ amount: number; payout?: Date }`          | (optional)                                                      |