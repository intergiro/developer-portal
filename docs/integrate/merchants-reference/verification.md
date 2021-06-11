# Verification

## Creatable

| Property    | Type                                                      | Description                              |
|-------------|-----------------------------------------------------------|------------------------------------------|
| `number`    | `string`                                                  |                                          |
| `items`     | `number | Item | Item[]`                                  | Additional information below             |
| `response`  | [`Response`](./verification.html#response)                | (optional)                               |
| `version`   | `"2.1.0" | "2.2.0"`                                       | (optional)                               |
| `browser`   | `Browser`                                                 | (optional) Additional information below  |
| `currency`  | [`Currency`](./other.html#currency)                       |                                          |
| `card`      | `Signed JWT` or [`Card.Creatable`](./card.html#creatable) |                                          |
| `recurring` | `string`                                                  | (optional) `"initial"` or `"subsequent"` |
| `customer`  | [`Customer`](./other.html#customer)                       | (optional)                               |
| `target`    | `string`                                                  |                                          |


## Response
Response can be defined in two ways:
- `{type: "method" | "challange" | "pares"; data: string}` or
- `{type: "method"; ThreeDSServerTransID: string; timeout: true }`


## Verification
Verification can be defined in two ways:

For a pares:
| Property | Type      | Description |
|----------|-----------|-------------|
| type     | `"pares"` |             |
| data     | `Pares`   |             |
	  
where `Pares` is defined as 

| Property       | Type                                | Description                                |
|----------------|-------------------------------------|--------------------------------------------|
| cavv           | `string`                            |                                            |
| xid            | `string`                            |                                            |
| eci            | `string`                            | `"0"`, `"1"`, `"2"`, `"5"`, `"6"` or `"7"` |
| status         | `string`                            | `"Y"`, `"U"`, `"A"`, `"N"`                 |
| amount         | `number`                            | (optional)                                 |
| cavv_algorithm | `string`                            | (optional)                                 |
| currency       | [`Currency`](./other.html#currency) | (optional)                                 |
| last4          | `string`                            | (optional)                                 |
| merchant_id    | `string`                            | (optional)                                 |

or 

For method or challange
| Property | Type                                                                                                                       | Description                                                               |
|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| type     | `"method" | "challenge"`                                                                                                   |                                                                           |
| data     | `{ authentication: string; status: "A" | "N" | "U" | "Y" | "C" | "R"; reference: { server: string ; directory: string }}}` | `server` is the threeDSServerTransID and the `directory` is the dsTransID |
