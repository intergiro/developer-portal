# Verification

## Creatable

| Property    | Type                                       | Description                                                                                                                    |
|-------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `number`    | `string`                                   |                                                                                                                                |
| `items`     | `number | Item | Item[]`                   | Additional information below                                                                                                   |
| `response`  | [`Response`](./verification.html#response) | (optional) Additional information below                                                                                        |
| `version`   | `"2.1.0" | "2.2.0"`                        | (optional)                                                                                                                     |
| `browser`   | `Browser`                                  | (optional) Additional information below                                                                                        |
| `currency`  | `string`                                   | ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish Crowns. |
| `card`      | `authly.Token | Card.Creatable`            | Read More about Token and Card.Creatable [here](../merchants/card)                                                             |
| `recurring` | `"initial" | "subsequent"`                 | (optional) Additional information below                                                                                        |
| `customer`  | `Customer`                                 | (optional)                                                                                                                     |
| `target`    | `string`                                   |                                                                                                                                |


## Response
Response can be defined in two ways:
- `{type: "method" | "challange" | "pares"; data: string}` or
- `{type: "method"; ThreeDSServerTransID: string; timeout: true }`


### API
In order to create a Verification, first send a request with the body of the request set as an [Verification creatable](./verification.html#creatable).

``` {1}
POST /verification

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>
```

Example Response:

``` {1}
HTTP 200 OK

{
	type: "challenge",
	data: {
		authentication: "testtest",
		status: "U",
		reference: {
			server: "threeD",
			directory: "dsTransactionId",
		},
	},
}
```

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
