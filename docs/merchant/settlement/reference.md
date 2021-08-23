# Reference

## Settlement

| Property       | Type                                               | Description             | Optional |
|----------------|----------------------------------------------------|-------------------------|----------|
| `reference`    | `string`                                           |                         |          |
| `merchant`     | `string`                                           |                         |          |
| `period`       | { `start`: [`Date`](); `end`: [`Date`]() }             |                         |          |
| `payout`       | [`Date`]()                                         | `"debit"` or `"credit"` |          |
| `reserve`      | { `amount`: `number`; `payout`?: [`Date`]() }            |                         |          |
| `created`      | [`Date`]()                                         |                         |          |
| `currency`     | [`Currency`](./reference.html#currency)            |                         |          |
| `gross`        | `number`                                           |                         |          |
| `fee`          | `number | { scheme: number; total: number }`       |                         |          |
| `net`          | `number`                                           |                         |          |
| `transactions` | [`SettlementTransaction`](#settlement-transaction) |                         |          |

## Settlement Transaction

| Property        | Type                                         | Description                                                     | Optional |
|-----------------|----------------------------------------------|-----------------------------------------------------------------|----------|
| `authorization` | `Identifier`                                 | ID in our system                                                |          |
| `reference`     | `string`                                     |                                                                 |          |
| `type`          | `string`                                     | `"authorization"`,` "capture"`, `"refund"`, `"void"` or `"all"` |          |
| `card`          | `string`                                     | `"debit"` or `"credit"`                                         |          |
| `scheme`        | [`Scheme`](./reference.html#scheme)          |                                                                 |          |
| `area`          | [`Alpha2`](./reference.html#alpha2)          |                                                                 |          |
| `created`       | [`Date`](./reference.html#datetime)          |                                                                 |          |
| `currency`      | [`Currency`](./reference.html#currency)      |                                                                 |          |
| `gross`         | `number`                                     |                                                                 |          |
| `fee`           | `number | { scheme: number; total: number }` |                                                                 |          |
| `net`           | `number`                                     |                                                                 |          |
| `reserve`       | `{ amount: number; payout?: Date }`          |                                                                 | Yes      |
