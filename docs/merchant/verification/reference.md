# Reference

## Verification

### Creatable

| Property    | Type                                                                     | Description       | Optional |
|-------------|--------------------------------------------------------------------------|-------------------|----------|
| `number`    | `string`                                                                 |                   |          |
| `items`     | [`number | Item | Item[]`](reference.html#item)                          |                   |          |
| `response`  | [`Response`](./reference.html#response)                                  |                   | Yes      |
| `version`   | `"2.1.0" | "2.2.0"`                                                      |                   | Yes      |
| `browser`   | [`Browser`](./reference.html#browser)                                    |                   | Yes      |
| `currency`  | [`Currency`](./reference.html#currency)                                  |                   |          |
| `card`      | `Signed JWT` or [`Card.Creatable`](./reference.html#creatable-6) |                   |          |
| `recurring` | [`Recurring`](reference.html#recurring)                                  |                   | Yes      |
| `contact`   | [`Contact`](./reference.html#contact)                                    |                   | Yes      |
| `target`    | `string`                                                                 | iframe target url |          |
| `category`  | `"purchase" | "withdrawal"`                                              |                   | Yes      |


### Response
Response can be defined in two ways:
- `{type: "method" | "challenge" | "pares"; data: string}` or
- `{type: "method"; ThreeDSServerTransID: string; timeout: true }`


### Verification
Verification can be defined in two ways:

For a pares:
| Property | Type      | Description |
|----------|-----------|-------------|
| `type`   | `"pares"` |             |
| `data`   | `Pares`   |             |
	  
where `Pares` is defined as 

| Property         | Type                                    | Description                                | Optional |
|------------------|-----------------------------------------|--------------------------------------------|----------|
| `cavv`           | `string`                                |                                            |          |
| `xid`            | `string`                                |                                            |          |
| `eci`            | `string`                                | `"0"`, `"1"`, `"2"`, `"5"`, `"6"` or `"7"` |          |
| `status`         | `string`                                | `"Y"`, `"U"`, `"A"`, `"N"`                 |          |
| `amount`         | `number`                                |                                            | Yes      |
| `cavv_algorithm` | `string`                                |                                            | Yes      |
| `currency`       | [`Currency`](./reference.html#currency) |                                            | Yes      |
| `last4`          | `string`                                |                                            | Yes      |
| `merchant_id`    | `string`                                |                                            | Yes      |
| `category`       | `"purchase" | "withdrawal"`             |                                            | Yes      |

or 

For method or challange
| Property | Type                                                                                                                       | Description                                                               |
|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `type`   | `"method" | "challenge"`                                                                                                   |                                                                           |
| `data`   | `{ authentication: string; status: "A" | "N" | "U" | "Y" | "C" | "R"; reference: { server: string ; directory: string }}}` | `server` is the threeDSServerTransID and the `directory` is the dsTransID |