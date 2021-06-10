# Token and Card Creatable

### authly.Token
JWT where the body includes a Base64, that in itself encodes a `card.Token` object.
Table below shown the contants of a `card.Token`:
| Property     | Type                                                                                      | Description                                                        |
|--------------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| issuer       | `"card"`                                                                                  |                                                                    |
| created      | `string`                                                                                  | Written as `"yyyy-mm-dd"`                                          |
| audience     | `"production" | "development"`                                                            |                                                                    |
| encrypted    | `string`                                                                                  |                                                                    |
| expires      | `[number, number]`                                                                        | `[month, year]` where month is `1` to `12` and year is `0` to `99` |
| verification | `{ type: "pares" | "method" | "challenge"; data?: string | { [property: string]: any } }` | (optional)                                                         |


### model.Card.Creatable
| Property     | Type                                                                                      | Description                                                           |
|--------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| pan          | `string`                                                                                  | Primary Account Number. Includes 12-19 characters, no spaces allowed. |
| expires      | `[number, number]`                                                                        | `[month, year]` where month is `1` to `12` and year is `0` to `99`    |
| csc          | `string`                                                                                  | (optional)                                                            |
| verification | `{ type: "pares" | "method" | "challenge"; data?: string | { [property: string]: any } }` | (optional)                                                            |
| client       | `{ ip?: string }`                                                                         | (optional)                                                            |