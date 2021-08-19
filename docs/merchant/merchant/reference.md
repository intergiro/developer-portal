# Reference

## Merchant

| Property         | Type                                | Description | Optional |
|------------------|-------------------------------------|-------------|----------|
| `id`             | `string`                            |             |          |
| `number`         | `string`                            |             | Yes      |
| `type`           | `"test" | "live"`                   |             |          |
| `agent`          | `string`                            |             |          |
| `reference`      | `string`                            |             |          |
| `descriptor`     | `string`                            |             | Yes      |
| `name`           | `string`                            |             |          |
| `currency`       | `Currency`                          |             |          |
| `reconciliation` | [`Reconciliation`](#reconciliation) |             |          |
| `country`        | [`CountryCode`]()                   |             |          |
| `categoryCode`   | `string`                            |             |          |
| `rules`          | [`Rules`](./rules)                  |             |          |


## Rules

| Property | Type     | Description                            | Optional |
|----------|----------|----------------------------------------|----------|
| `master` | `string` | Rules set by acquirer                  | Yes      |
| `string` | `string` | Rules other than those set by acquirer | Yes      |

[How to write rules](./rules.html#how-to-write-rules)

## Reconciliation

| Property   | Type                                                                                  | Description | Optional |
|------------|---------------------------------------------------------------------------------------|-------------|----------|
| `account`  | [`Account`](#account) or Record<[`Currency`]() or `"default"`, [`Account`](#account)> |             |          |
| `costPlus` | `true`                                                                                |             | Yes      |
| `fees`     | `Fee`                                                                                 |             | Yes      |
| `reserves` | `{
		percentage: number
		days?: number
	}`                                                                                       |             | Yes      |

### Account

An account is either a `string` or the following data type.

| Property | Type     | Description | Optional |
|----------|----------|-------------|----------|
| `bic`    | `string` |             |          |
| `iban`   | `string` |             |          |