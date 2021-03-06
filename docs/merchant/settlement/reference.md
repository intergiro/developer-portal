# Reference

## Settlement

| Property       | Type                                                              | Description             | Optional |
|----------------|-------------------------------------------------------------------|-------------------------|----------|
| `reference`    | `string`                                                          |                         |          |
| `merchant`     | `string`                                                          |                         |          |
| `period`       | { `start`: [`Date`](); `end`: [`Date`]() }                        |                         |          |
| `payout`       | [`Date`]()                                                        | `"debit"` or `"credit"` |          |
| `reserve`      | { `amount`: `number`; `payout`?: [`Date`]() }                     |                         |          |
| `created`      | [`Date`]()                                                        |                         |          |
| `currency`     | [`Currency`](../common/reference.html#currency)                   |                         |          |
| `gross`        | `number`                                                          |                         |          |
| `fee`          | `number | { scheme: number; total: number }`                      |                         |          |
| `net`          | `number`                                                          |                         |          |
| `transactions` | [`Settlement.Transaction`](reference.html#settlement-transaction) |                         |          |

## Settlement.Transaction

| Property        | Type                                            | Description                                                     | Optional |
|-----------------|-------------------------------------------------|-----------------------------------------------------------------|----------|
| `authorization` | `Identifier`                                    | ID in our system                                                |          |
| `reference`     | `string`                                        |                                                                 |          |
| `type`          | `string`                                        | `"authorization"`,` "capture"`, `"refund"`, `"void"` or `"all"` |          |
| `card`          | `string`                                        | `"debit"` or `"credit"`                                         |          |
| `scheme`        | [`Scheme`](../common/reference.html#scheme)     |                                                                 |          |
| `area`          | [`Alpha2`](../common/reference.html#alpha2)     |                                                                 |          |
| `created`       | [`Date`](../common/reference.html#date)         |                                                                 |          |
| `currency`      | [`Currency`](../common/reference.html#currency) |                                                                 |          |
| `gross`         | `number`                                        |                                                                 |          |
| `fee`           | `number | { scheme: number; total: number }`    |                                                                 |          |
| `net`           | `number`                                        |                                                                 |          |
| `reserve`       | `{ amount: number; payout?: Date }`             |                                                                 | Yes      |
