# Verification

## Creatable

| Property    | Type                            | Description                                                                                                                    |
|-------------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `number`    | `string`                        |                                                                                                                                |
| `items`     | `number | Item | Item[]`        | Additional information below                                                                                                   |
| `response`  | `Response`                      | (optional) Additional information below                                                                                        |
| `version`   | `"2.1.0" | "2.2.0"`             | (optional)                                                                                                                     |
| `browser`   | `Browser`                       | (optional) Additional information below                                                                                        |
| `currency`  | `string`                        | ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish Crowns. |
| `card`      | `authly.Token | Card.Creatable` | Read More about Token and Card.Creatable [here](../merchants/card)                                                             |
| `recurring` | `"initial" | "subsequent"`      | (optional) Additional information below                                                                                        |
| `customer`  | `Customer`                      | (optional)                                                                                                                     |
| `target`    | `string`                        |                                                                                                                                |


## Verification

## Response
Response can be defined in two ways:
- `{type: "method" | "challange" | "pares"; data: string}` or
- `{type: "method"; ThreeDSServerTransID: string; timeout: true }`

