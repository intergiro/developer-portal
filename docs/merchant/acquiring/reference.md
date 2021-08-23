
# Reference










## Card

### Creatable
| Property       | Type                                            | Description                                                           | Optional |
|----------------|-------------------------------------------------|-----------------------------------------------------------------------|----------|
| `pan`          | `string`                                        | Primary Account Number. Includes 12-19 characters, no spaces allowed. |          |
| `expires`      | `[number,number]`                               | `[month, year]` where month is `1` to `12` and year is `0` to `99`    |          |
| `csc`          | `string`                                        |                                                                       | Yes      |
| `verification` | [`Verification`](./reference.html#verification) |                                                                       | Yes      |
| `client`       | `{ip?: string}`                                 |                                                                       | Yes      |

### Card
| Property  | Type                                | Description                                                        | Optional |
|-----------|-------------------------------------|--------------------------------------------------------------------|----------|
| `scheme`  | [`Scheme`](./reference.html#scheme) |                                                                    |          |
| `iin`     | `string`                            | First 6 digits on card                                             |          |
| `last4`   | `string`                            | Last 4 digits on card                                              |          |
| `expires` | `[number,number]`                   | `[month, year]` where month is `1` to `12` and year is `0` to `99` |          |
| `type`    | `string`                            | `"debit"` or `"credit"`                                            | Yes      |
| `csc`     | `string`                            | `"matched"`, `"mismatched"` or`"present"`                          | Yes      |


### Token
The `Token` is a JWT where the body includes a Base64, that in itself encodes a `card.Token` object.
Table below shown the contents of a `card.Token`:
| Property       | Type                                 | Description                                                        | Optional |
|----------------|--------------------------------------|--------------------------------------------------------------------|----------|
| `issuer`       | `"card"`                             |                                                                    |          |
| `created`      | [`Date`](./reference.html#datetime)  |                                                                    |          |
| `audience`     | `string`                             | `"production"` or `"development"`                                  |          |
| `encrypted`    | `string`                             |                                                                    |          |
| `expires`      | `[number,number]`                    | `[month, year]` where month is `1` to `12` and year is `0` to `99` |          |
| `verification` | [`Verification`](#verification.html) |                                                                    | Yes      |


## Other

### Settlement.Transaction

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
### Currency

String set according to ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish krona.

### Alpha2

ISO 3166-1 Alpha-2 code, e.g. `"FR"` for France and `"SE"` for Sweden

### Locale
String defined by language ISO 639-1, followed by a dash `"-"` then a ISO 3166-1 Alpha-2 code. E.g. `"en-US"` for the English-United States or `"sv-SE"` for Swedish-Sweden. This is defined by `navigator.language` in the browser. All acceptable locales can be found [here](https://github.com/payfunc/isoly/blob/master/Locale.ts).

### Date

String written as `"YYYY-MM-DD"`, e.g. `"2021-12-31"`.

### DateTime 

String formated as `"YYYY-MM-DDThh:mm:ss"`, e.g. `"2020-12-31T23:59:59"`.

### Scheme

String set as `"unknown"`, `"amex"`, `"dankort"`, `"diners"`, `"discover"`, `"electron"`, `"interpayment"`, `"jcb"`, `"maestro"`, `"mastercard"`, `"unionpay"` or `"visa"`.

### Browser
#### Creatable
| Property      | Type                                | Description                     | Optional |
|---------------|-------------------------------------|---------------------------------|----------|
| `color_depth` | `number`                            |                                 | Yes      |
| `java`        | `boolean`                           |                                 | Yes      |
| `javascript`  | `boolean`                           |                                 | Yes      |
| `locale`      | [`Locale`](./reference.html#locale) | `navigator.language`            | Yes      |
| `timezone`    | `number`                            |                                 | Yes      |
| `resolution`  | `[number, number]`                  | `screen.width`, `screen.height` | Yes      |
| `parent`      | `string`                            |                                 | Yes      |
#### Browser
The final `Browser` object is the same as the `Browser.Creatable` but with these added fields:

| Property        | Type     | Optional |
|-----------------|----------|----------|
| `accept_header` | `string` | Yes      |
| `user_agent`    | `string` | Yes      |
| `ip`            | `string` | Yes      |


### Item 
The data type `Item` is used to specify what products are included in an order.

For `Item`, all properties are optional, but if `vat` is included, `price` must be included too. Quantity will be treated as 1 if it's not included.

| Property   | Type     | Description                        | Optional |
|------------|----------|------------------------------------|----------|
| `number`   | `string` | product number in your system      | Yes      |
| `name`     | `string` | name or description of the product | Yes      |
| `price`    | `number` | price per unit (excluding VAT)     | Yes      |
| `quantity` | `number` | number of units                    | Yes      |
| `unit`     | `string` | unit for measuring the product     | Yes      |
| `vat`      | `number` | VAT per unit                       | Yes      |
| `rebate`   | `number` | rebate per unit                    | Yes      |

Item Example:
```json
{
	"number": "abc123",
	"name": "ceramic vase",
	"price": 100,
	"quantity": 2,
	"unit": "pcs",
	"vat": 25,
	"rebate": 0
}
```

### Contact
Data type representing a contact.

| Property          | Type                                                                               | Description                                                                    | Optional |
|-------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|----------|
| `type`            | `"organization"` or `"person"`                                                     |                                                                                | Yes      |
| `identity_number` | `string`                                                                           |                                                                                | Yes      |
| `id`              | `string`                                                                           |                                                                                | Yes      |
| `number`          | `string`                                                                           |                                                                                | Yes      |
| `name`            | `string` or [`Name`](./reference.html#name)                                        |                                                                                | Yes      |
| `address`         | [`Address`](./reference.html#address) or [`Addresses`](./reference.html#addresses) |                                                                                | Yes      |
| `email`           | `string` or [`EmailAddresses`](./reference.html#emailaddresses)                    | one email address as a string or two as [`EmailAddresses`](../reference.html)  | Yes      |
| `phone`           | `string` or [`PhoneNumbers`](./reference.html#phonenumbers)                        | one phone number as a string or several as [`PhoneNumbers`](../reference.html) | Yes      |

### Name
| Property | Type     | Optional |
|----------|----------|----------|
| `first`  | `string` | Yes      |
| `last`   | `string` | Yes      |

### Address

| Property       | Type                                | Description    |
|----------------|-------------------------------------|----------------|
| `street`       | `string`                            | street address |
| `zip_code`     | `string`                            | area code      |
| `city`         | `string`                            | city           |
| `country_code` | [`Alpha2`](./reference.html#alpha2) |                |

#### Example:
```json
{
    "street": "Storgatan 1",
    "zip_code": "111 23",
    "city": "Stockholm",
    "country_code": "SE"
}
```

### Addresses

| Property   | Type                                  | Optional |
|------------|---------------------------------------|----------|
| `primary`  | [`Address`](./reference.html#address) |          |
| `billing`  | [`Address`](./reference.html#address) | Yes      |
| `delivery` | [`Address`](./reference.html#address) | Yes      |
| `visit`    | [`Address`](./reference.html#address) | Yes      |

### EmailAddresses

For `EmailAddresses` atleast one `primary` of `billing` must be defined.

| Property  | Type     | Description           | Optional |
|-----------|----------|-----------------------|----------|
| `primary` | `string` | primary email address | Yes      |
| `billing` | `string` | billing email address | Yes      |

Example:
```json
{
    "primary": "main@company.com",
    "billing": "billing@company.com"
}
```

### PhoneNumbers

For `PhoneNumbers` atleast one property must be defined.

| Property    | Type     | Description          | Optional |
|-------------|----------|----------------------|----------|
| `primary`   | `string` | primary phone number | Yes      |
| `cellphone` | `string` | cellphone number     | Yes      |
| `landline`  | `string` | landline number      | Yes      |
