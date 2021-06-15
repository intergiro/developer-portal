
# Reference

## Authorization

### Creatable

Authorization Creatable

| Property     | Type                                                      | Description                   |
|--------------|-----------------------------------------------------------|-------------------------------|
| `number`     | `string`                                                  | has to be a unique identifier |
| `amount`     | `number`                                                  |                               |
| `currency`   | [`Currency`](./reference.html#currency)                   |                               |
| `card`       | `Signed JWT` or [`Card.Creatable`](./reference.html#card) |                               |
| `descriptor` | `string`                                                  | (optional)                    |
| `recurring`  | [`Recurring`](./reference.html#recurring)                 | (optional)                    |

### Authorization

| Property     | Type                                                         | Description      |
|--------------|--------------------------------------------------------------|------------------|
| `id`         | `string`                                                     | ID in our system |
| `merchant`   | `string`                                                     | ID in our system |
| `number`     | `string`                                                     |                  |
| `reference`  | `string`                                                     |                  |
| `created`    | [`DateTime`](./reference.html#datetime)                      |                  |
| `amount`     | `number`                                                     |                  |
| `currency`   | [`Currency`](./reference.html#currency)                      |                  |
| `card`       | [`Card`](./card)                                             |                  |
| `descriptor` | `string`                                                     | (optional)       |
| `recurring`  | [`Recurring`](authorization.html#recurring)                  | (optional)       |
| `history`    | `History[]`                                                  |                  |
| `change`     | [`Change[]`](./Change)                                       | (optional)       |
| `capture`    | [`Capture[]`](./Capture)                                     |                  |
| `refund`     | [`Refund[]`](./Refund)                                       |                  |
| `void`       | [`DateTime`](./reference.html#datetime)                      | (optional)       |
| `status`     | [`Partial<Record<Status, number>>`](./reference.html#status) |                  |


#### Status
Authorization.Status is string set to `"authorized"`, `"cancelled"`, `"captured"`, `"refunded"` or `"settled"`.

#### Recurring
Recurring can be defined in four ways: 
 - As a string: `"initial"`
 - As an Initial reacurring: `{ type: "initial"; initiator: "cardholder"}`
 - As a Subsequent recurring: `{ type: "subsequent"; reference: string; scheduled?: false; initiator: "merchant" | "cardholder"}`
 - As a Scheduled Recurring: `{ type: "subsequent"; reference: string; scheduled: true; initiator: "merchant" }`
 
## Verification

### Creatable

| Property    | Type                                                      | Description                              |
|-------------|-----------------------------------------------------------|------------------------------------------|
| `number`    | `string`                                                  |                                          |
| `items`     | [`number | Item | Item[]`](reference.html#item)           | Additional information below             |
| `response`  | [`Response`](./reference.html#response)                   | (optional)                               |
| `version`   | `"2.1.0" | "2.2.0"`                                       | (optional)                               |
| `browser`   | [`Browser`](./reference.html#browser)                     | (optional) Additional information below  |
| `currency`  | [`Currency`](./reference.html#currency)                   |                                          |
| `card`      | `Signed JWT` or [`Card.Creatable`](./card.html#creatable) |                                          |
| `recurring` | `string`                                                  | (optional) `"initial"` or `"subsequent"` |
| `customer`  | [`Customer`](./reference.html#customer)                   | (optional)                               |
| `target`    | `string`                                                  | iframe target url                        |


### Response
Response can be defined in two ways:
- `{type: "method" | "challange" | "pares"; data: string}` or
- `{type: "method"; ThreeDSServerTransID: string; timeout: true }`


### Verification
Verification can be defined in two ways:

For a pares:
| Property | Type      | Description |
|----------|-----------|-------------|
| `type`   | `"pares"` |             |
| `data`   | `Pares`   |             |
	  
where `Pares` is defined as 

| Property         | Type                                    | Description                                |
|------------------|-----------------------------------------|--------------------------------------------|
| `cavv`           | `string`                                |                                            |
| `xid`            | `string`                                |                                            |
| `eci`            | `string`                                | `"0"`, `"1"`, `"2"`, `"5"`, `"6"` or `"7"` |
| `status`         | `string`                                | `"Y"`, `"U"`, `"A"`, `"N"`                 |
| `amount`         | `number`                                | (optional)                                 |
| `cavv_algorithm` | `string`                                | (optional)                                 |
| `currency`       | [`Currency`](./reference.html#currency) | (optional)                                 |
| `last4`          | `string`                                | (optional)                                 |
| `merchant_id`    | `string`                                | (optional)                                 |

or 

For method or challange
| Property | Type                                                                                                                       | Description                                                               |
|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `type`   | `"method" | "challenge"`                                                                                                   |                                                                           |
| `data`   | `{ authentication: string; status: "A" | "N" | "U" | "Y" | "C" | "R"; reference: { server: string ; directory: string }}}` | `server` is the threeDSServerTransID and the `directory` is the dsTransID |



## Capture
### Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `descriptor` | `number` | (optional)  |

### Capture

| Property     | Type                                                                | Description                              |
|--------------|---------------------------------------------------------------------|------------------------------------------|
| `number`     | `string`                                                            | (optional)                               |
| `created`    | [`DateTime`](./reference.html#datetime)                             |                                          |
| `reference`  | `string`                                                            |                                          |
| `approved`   | [`DateTime`](./reference.html#datetime)                             | (optional)                               |
| `amount`     | `number`                                                            |                                          |
| `settlement` | [`Settlement.Transaction`](./reference.html#settlement-transaction) | (optional)                               |
| `descriptor` | `string`                                                            | (optional)                               |
| `status`     | `string`                                                            | `"approved"`, `"pending"` or `"settled"` |


## Refund
### Creatable

| Property     | Type     | Description |
|--------------|----------|-------------|
| `number`     | `string` | (optional)  |
| `amount`     | `number` | (optional)  |
| `descriptor` | `number` | (optional)  |


### Refund

| Property     | Type                                                                | Description                              |
|--------------|---------------------------------------------------------------------|------------------------------------------|
| `number`     | `string`                                                            | (optional)                               |
| `created`    | [`DateTime`](./reference.html#datetime)                             |                                          |
| `reference`  | `string`                                                            |                                          |
| `approved`   | [`DateTime`](./reference.html#datetime)                             | (optional)                               |
| `amount`     | `number`                                                            |                                          |
| `descriptor` | `string`                                                            | (optional)                               |
| `settlement` | [`Settlement.Transaction`](./reference.html#settlement-transaction) | (optional)                               |
| `status`     | `string`                                                            | `"approved"`, `"pending"` or `"settled"` |


## Card

### Creatable
| Property       | Type                                            | Description                                                           |
|----------------|-------------------------------------------------|-----------------------------------------------------------------------|
| `pan`          | `string`                                        | Primary Account Number. Includes 12-19 characters, no spaces allowed. |
| `expires`      | `[number,number]`                               | `[month, year]` where month is `1` to `12` and year is `0` to `99`    |
| `csc`          | `string`                                        | (optional)                                                            |
| `verification` | [`Verification`](./reference.html#verification) | (optional)                                                            |
| `client`       | `{ip?: string}`                                 | (optional)                                                            |

### Card
| Property  | Type                                | Description                                                        |
|-----------|-------------------------------------|--------------------------------------------------------------------|
| `scheme`  | [`Scheme`](./reference.html#scheme) |                                                                    |
| `iin`     | `string`                            | First 6 digits on card                                             |
| `last4`   | `string`                            | Last 4 digits on card                                              |
| `expires` | `[number,number]`                   | `[month, year]` where month is `1` to `12` and year is `0` to `99` |
| `type`    | `string`                            | (optional) `"debit"` or `"credit"`                                 |
| `csc`     | `string`                            | (optional) `"matched"`, `"mismatched"` or`"present"`               |


### Token
The `Token` is a JWT where the body includes a Base64, that in itself encodes a `card.Token` object.
Table below shown the contants of a `card.Token`:
| Property       | Type                                | Description                                                        |
|----------------|-------------------------------------|--------------------------------------------------------------------|
| `issuer`       | `"card"`                            |                                                                    |
| `created`      | [`Date`](./reference.html#datetime) |                                                                    |
| `audience`     | `string`                            | `"production"` or `"development"`                                  |
| `encrypted`    | `string`                            |                                                                    |
| `expires`      | `[number,number]`                   | `[month, year]` where month is `1` to `12` and year is `0` to `99` |
| `verification` | [`Verification`](#verification)     | (optional)                                                         |


## Other

### Settlement.Transaction

| Property        | Type                                         | Description                                                     |
|-----------------|----------------------------------------------|-----------------------------------------------------------------|
| `authorization` | `Identifier`                                 | ID in our system                                                |
| `reference`     | `string`                                     |                                                                 |
| `type`          | `string`                                     | `"authorization"`,` "capture"`, `"refund"`, `"void"` or `"all"` |
| `card`          | `string`                                     | `"debit"` or `"credit"`                                         |
| `scheme`        | [`Scheme`](./reference.html#scheme)          |                                                                 |
| `area`          | [`Alpha2`](./reference.html#alpha2)          |                                                                 |
| `created`       | [`Date`](./reference.html#datetime)          |                                                                 |
| `currency`      | [`Currency`](./reference.html#currency)      |                                                                 |
| `gross`         | `number`                                     |                                                                 |
| `fee`           | `number | { scheme: number; total: number }` |                                                                 |
| `net`           | `number`                                     |                                                                 |
| `reserve`       | `{ amount: number; payout?: Date }`          | (optional)                                                      |
### Currency

String set according to ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish Crowns.

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
| Property     | Type                                | Description                                |
|--------------|-------------------------------------|--------------------------------------------|
| `colorDepth` | `number`                            | (optional)                                 |
| `java`       | `boolean`                           | (optional)                                 |
| `javascript` | `boolean`                           | (optional)                                 |
| `locale`     | [`Locale`](./reference.html#locale) | (optional) `navigator.language`            |
| `timezone`   | `number`                            | (optional)                                 |
| `resolution` | `[number, number]`                  | (optional) `screen.width`, `screen.height` |
| `parent`     | `string`                            | (optional)                                 |
#### Browser
The final `Browser` object is the same as the `Browser.Creatable` but with these added fields:

| Property       | Type     | Description |
|----------------|----------|-------------|
| `acceptHeader` | `string` | (optional)  |
| `userAgent`    | `string` | (optional)  |
| `ip`           | `string` | (optional)  |


### Item 
The data type `Item` is used to specify what products are included in an order.

For `Item`, all properties are optional, but if `vat` is included, `price` must be included too. Quantity will be treated as 1 if it's not included.

| Property   | Type     | Description                                   |
|------------|----------|-----------------------------------------------|
| `number`   | `string` | (optional) product number in your system      |
| `name`     | `string` | (optional) name or description of the product |
| `price`    | `number` | (optional) price per unit (excluding VAT)     |
| `quantity` | `number` | (optional) number of units                    |
| `unit`     | `string` | (optional) unit for measuring the product     |
| `vat`      | `number` | (optional) VAT per unit                       |
| `rebate`   | `number` | (optional) rebate per unit                    |

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

### Customer
Data type representing a customer.


| Property         | Type                                                         | Description                                                                          |
|------------------|--------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `type`           | `"organization" | "person"`                                  | (optional)                                                                           |
| `identityNumber` | `string`                                                     | (optional)                                                                           |
| `id`             | `string`                                                     | (optional)                                                                           |
| `number`         | `string`                                                     | (optional)                                                                           |
| `name`           | `string | Name`                                              | (optional)                                                                           |
| `address`        | [`Address | Addresses`](./reference.html#addresses)          | (optional)                                                                           |
| `email`          | [`string | EmailAddresses`](./reference.html#emailaddresses) | (optional) one email address as a string or two as [`EmailAddresses`](../reference)  |
| `phone`          | [`string | PhoneNumbers`](./reference.html#phonenumbers)     | (optional) one phone number as a string or several as [`PhoneNumbers`](../reference) |


### Address

| Property      | Type                                | Description    |
|---------------|-------------------------------------|----------------|
| `street`      | `string`                            | street address |
| `zipCode`     | `string`                            | area code      |
| `city`        | `string`                            | city           |
| `countryCode` | [`Alpha2`](./reference.html#alpha2) |                |

#### Example:
```json
{
    "street": "Storgatan 1",
    "zipCode": "111 23",
    "city": "Stockholm",
    "countryCode": "SE"
}
```

### Addresses

| Property   | Type      | Description                     |
|------------|-----------|---------------------------------|
| `primary`  | `Address` | use Address datatype            |
| `billing`  | `Address` | (optional) use Address datatype |
| `delivery` | `Address` | (optional) use Address datatype |
| `visit`    | `Address` | (optional) use Address datatype |

### EmailAddresses

For `EmailAddresses` atleast one `primary` of `billing` must be defined.

| Property  | Type     | Description                      |
|-----------|----------|----------------------------------|
| `primary` | `string` | (optional) primary email address |
| `billing` | `string` | (optional) billing email address |

Example:
```json
{
    "primary": "main@company.com",
    "billing": "billing@company.com"
}
```

### PhoneNumbers

For `PhoneNumbers` atleast one property must be defined.

| Property    | Type     | Description                     |
|-------------|----------|---------------------------------|
| `primary`   | `string` | (optional) primary phone number |
| `cellphone` | `string` | (optional) cellphone number     |
| `landline`  | `string` | (optional) landline number      |
