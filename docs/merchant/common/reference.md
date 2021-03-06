
# Reference


## Currency

String set according to ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish krona.

## Alpha2

ISO 3166-1 Alpha-2 code, e.g. `"FR"` for France and `"SE"` for Sweden

## Locale
String defined by language ISO 639-1, followed by a dash `"-"` then a ISO 3166-1 Alpha-2 code. E.g. `"en-US"` for the English-United States or `"sv-SE"` for Swedish-Sweden. This is defined by `navigator.language` in the browser. All acceptable locales can be found [here](https://github.com/payfunc/isoly/blob/master/Locale.ts).

## Date

String written as `"YYYY-MM-DD"`, e.g. `"2021-12-31"`.

## DateTime 

String formated as `"YYYY-MM-DDThh:mm:ss.fffK"`, e.g. `"2020-12-31T23:59:59.999Z"`.

## Scheme

String set as `"unknown"`, `"amex"`, `"dankort"`, `"diners"`, `"discover"`, `"electron"`, `"interpayment"`, `"jcb"`, `"maestro"`, `"mastercard"`, `"unionpay"` or `"visa"`.

## Browser
### Creatable
Use the javascript commands in the description column below to get browser information from a user of your website. This is recommended when creating [Order](../order/create.html), [Customer](../customer/create.html), [Payment Method](../customer/payment-methods.html) or [Authorization](../authorization/create.html) for use when verifying card-holder.
| Property      | Type                                | Description                      | Optional |
|---------------|-------------------------------------|----------------------------------|----------|
| `color_depth` | `number`                            | `screen.colorDepth`              | Yes      |
| `java`        | `boolean`                           | `navigator.javaEnabled()`        | Yes      |
| `javascript`  | `boolean`                           | `true`                           | Yes      |
| `locale`      | [`Locale`](./reference.html#locale) | `navigator.language`             | Yes      |
| `timezone`    | `number`                            | `new Date().getTimezoneOffset()` | Yes      |
| `resolution`  | `[number, number]`                  | `[screen.width, screen.height]`  | Yes      |
| `parent`      | `string`                            | `window.location.origin`         | Yes      |

### Browser
The final `Browser` object is the same as the `Browser.Creatable` but with these added fields:

| Property        | Type     | Optional |
|-----------------|----------|----------|
| `accept_header` | `string` | Yes      |
| `user_agent`    | `string` | Yes      |
| `ip`            | `string` | Yes      |


## Item 
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

## Contact
Data type representing a contact.

| Property          | Type                                                                               | Description                                                                                 | Optional |
|-------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|----------|
| `type`            | `"organization"` or `"person"`                                                     |                                                                                             | Yes      |
| `identity_number` | `string`                                                                           |                                                                                             | Yes      |
| `id`              | `string`                                                                           |                                                                                             | Yes      |
| `number`          | `string`                                                                           |                                                                                             | Yes      |
| `name`            | `string` or [`Name`](./reference.html#name)                                        |                                                                                             | Yes      |
| `address`         | [`Address`](./reference.html#address) or [`Addresses`](./reference.html#addresses) |                                                                                             | Yes      |
| `email`           | `string` or [`EmailAddresses`](./reference.html#emailaddresses)                    | one email address as a string or two as [`EmailAddresses`](./reference.html#emailaddresses) | Yes      |
| `phone`           | `string` or [`PhoneNumbers`](./reference.html#phonenumbers)                        | one phone number as a string or several as [`PhoneNumbers`](../reference.html)              | Yes      |

## Name
| Property | Type     | Optional |
|----------|----------|----------|
| `first`  | `string` | Yes      |
| `last`   | `string` | Yes      |

## Address

| Property       | Type                                | Description    |
|----------------|-------------------------------------|----------------|
| `street`       | `string`                            | street address |
| `zip_code`     | `string`                            | area code      |
| `city`         | `string`                            | city           |
| `country_code` | [`Alpha2`](./reference.html#alpha2) |                |

### Example:
```json
{
    "street": "Storgatan 1",
    "zip_code": "111 23",
    "city": "Stockholm",
    "country_code": "SE"
}
```

## Addresses

| Property   | Type                                  | Optional |
|------------|---------------------------------------|----------|
| `primary`  | [`Address`](./reference.html#address) |          |
| `billing`  | [`Address`](./reference.html#address) | Yes      |
| `delivery` | [`Address`](./reference.html#address) | Yes      |
| `visit`    | [`Address`](./reference.html#address) | Yes      |

## EmailAddresses

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

## PhoneNumbers

For `PhoneNumbers` atleast one property must be defined.

| Property    | Type     | Description          | Optional |
|-------------|----------|----------------------|----------|
| `primary`   | `string` | primary phone number | Yes      |
| `cellphone` | `string` | cellphone number     | Yes      |
| `landline`  | `string` | landline number      | Yes      |
