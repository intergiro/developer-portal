# Reference

## Merchant

| Property         | Type                                        | Description | Optional |
|------------------|---------------------------------------------|-------------|----------|
| `id`             | `string`                                    |             |          |
| `number`         | `string`                                    |             | Yes      |
| `type`           | `"test" | "live"`                           |             |          |
| `agent`          | `string`                                    |             |          |
| `reference`      | `string`                                    |             |          |
| `descriptor`     | `string`                                    |             | Yes      |
| `name`           | `string`                                    |             |          |
| `currency`       | `Currency`                                  |             |          |
| `reconciliation` | [`Reconciliation`](#reconciliation)         |             |          |
| `country`        | [`Alpha2`](../common/reference.html#alpha2) |             |          |
| `categoryCode`   | `string`                                    |             |          |
| `rules`          | [`Rules`](./rules)                          |             |          |


## Rules

| Property | Type     | Description                            | Optional |
|----------|----------|----------------------------------------|----------|
| `master` | `string` | Rules set by acquirer                  | Yes      |
| `string` | `string` | Rules other than those set by acquirer | Yes      |

[How to write rules](./rules.html#how-to-write-rules)

## Reconciliation

| Property   | Type                                                                                                                   | Description | Optional |
|------------|------------------------------------------------------------------------------------------------------------------------|-------------|----------|
| `account`  | [`Account`](#account) or Record<[`Currency`](../common/reference.html#currency) or `"default"`, [`Account`](#account)> |             |          |
| `costPlus` | `true`                                                                                                                 |             | Yes      |
| `fees`     | [`Fee`](#fee )                                                                                                         |             | Yes      |
| `reserves` | `{ percentage: number; days?: number }`                                                                                |             | Yes      |

### Account

An account is either a `string` or the following data type.

| Property | Type     | Description | Optional |
|----------|----------|-------------|----------|
| `bic`    | `string` |             |          |
| `iban`   | `string` |             |          |

### Fee 

| Property                                    | Type                          | Description | Optional |
|---------------------------------------------|-------------------------------|-------------|----------|
| [`Operation`](#operation)                   | `number`                      |             |          |
| [`Alpha2`](../common/reference.html#alpha2) | [`Transaction`](#transaction) |             |          |
| `eea`                                       | [`Transaction`](#transaction) |             | Yes      |
| `other`                                     | [`Transaction`](#transaction) |             |          |

### Operation
String set as "authorization", "capture", "refund", "void" or "all".



### Transaction

| Property                                    | Type                                                                                                                                              | Description | Optional |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-------------|----------|
| [`scheme`](../common/reference.html#scheme) | `{ debit: { percentage: number; minimum?: number } credit: { percentage: number; minimum?: number } } | { percentage: number; minimum?: number }` |             |          |
