# Card

## Creatable
| Property       | Type                             | Description                                                           |
|----------------|----------------------------------|-----------------------------------------------------------------------|
| `pan`          | `string`                         | Primary Account Number. Includes 12-19 characters, no spaces allowed. |
| `expires`      | `[number,number]`                | `[month, year]` where month is `1` to `12` and year is `0` to `99`    |
| `csc`          | `string`                         | (optional)                                                            |
| `verification` | [`Verification`](./verification) | (optional)                                                            |
| `client`       | `{ip?: string}`                  | (optional)                                                            |

## Card
| Property | Type                            | Description                                                        |
|----------|---------------------------------|--------------------------------------------------------------------|
| scheme   | [`Scheme`](./other.html#scheme) |                                                                    |
| iin      | `string`                        | First 6 digits on card                                             |
| last4    | `string`                        | Last 4 digits on card                                              |
| expires  | `[number,number]`               | `[month, year]` where month is `1` to `12` and year is `0` to `99` |
| type     | `string`                        | (optional) `"debit"` or `"credit"`                                 |
| csc      | `string`                        | (optional) `"matched"`, `"mismatched"` or`"present"`               |


## authly.Token
The `authly.Token` is a JWT where the body includes a Base64, that in itself encodes a `card.Token` object.
Table below shown the contants of a `card.Token`:
| Property       | Type                            | Description                                                        |
|----------------|---------------------------------|--------------------------------------------------------------------|
| `issuer`       | `"card"`                        |                                                                    |
| `created`      | [`Date`](./other.html#datetime) |                                                                    |
| `audience`     | `string`                        | `"production"` or `"development"`                                  |
| `encrypted`    | `string`                        |                                                                    |
| `expires`      | `[number,number]`               | `[month, year]` where month is `1` to `12` and year is `0` to `99` |
| `verification` | [`Verification`](#verification) | (optional)                                                         |