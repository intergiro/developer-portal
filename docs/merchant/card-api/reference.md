# Reference

## Card Creatable
| Property       | Type                            | Description                                                           | Optional |
|----------------|---------------------------------|-----------------------------------------------------------------------|----------|
| `pan`          | `string`                        | Primary Account Number. Includes 12-19 characters, no spaces allowed. |          |
| `expires`      | `[number,number]`               | `[month, year]` where month is `1` to `12` and year is `0` to `99`    |          |
| `csc`          | `string`                        |                                                                       | Yes      |
| `verification` | [`Verification`](#verification) |                                                                       | Yes      |
| `client`       | `{ip?: string}`                 |                                                                       | Yes      |

## Card
| Property  | Type                                        | Description                                                        | Optional |
|-----------|---------------------------------------------|--------------------------------------------------------------------|----------|
| `scheme`  | [`Scheme`](../common/reference.html#scheme) |                                                                    |          |
| `iin`     | `string`                                    | First 6 digits on card                                             |          |
| `last4`   | `string`                                    | Last 4 digits on card                                              |          |
| `expires` | `[number,number]`                           | `[month, year]` where month is `1` to `12` and year is `0` to `99` |          |
| `type`    | `string`                                    | `"debit"` or `"credit"`                                            | Yes      |
| `csc`     | `string`                                    | `"matched"`, `"mismatched"` or`"present"`                          | Yes      |


## Token
The `Token` is a JWT where the body includes a Base64, that in itself encodes a `card.Token` object.
The table below shows the contents of a `card.Token`:
| Property       | Type                                        | Description                                                        | Optional |
|----------------|---------------------------------------------|--------------------------------------------------------------------|----------|
| `issuer`       | `"card"`                                    |                                                                    |          |
| `created`      | [`Date`](../common/reference.html#datetime) |                                                                    |          |
| `audience`     | `string`                                    | `"production"` or `"development"`                                  |          |
| `encrypted`    | `string`                                    | Encrypted card information                                         |          |
| `expires`      | `[number,number]`                           | `[month, year]` where month is `1` to `12` and year is `0` to `99` |          |
| `verification` | [`Verification`](#verification)             |                                                                    | Yes      |


## Verification

| Property | Type                                    | Description                   |
|----------|-----------------------------------------|-------------------------------|
| `type`   | `"method" | "challenge" | "guard" | "pares"`                  |                               |
| `data`   | [Verification Data](#verification-data) | base64 encoded string or a json object |
	  
    
### Verification Data
| Property                 | Type     | Verification type    |
|--------------------------|----------|----------------------|
| `threeDSServerTransID`   | `string` | `method | challenge` |
| `acsTransID`             | `string` | `challenge`          |
| `challengeCompletionInd` | `string` | `challenge`          |
| `messageType`            | `string` | `challenge`          |
| `transStatus`            | `string` | `challenge`          |