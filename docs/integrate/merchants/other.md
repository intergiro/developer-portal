# Other


## Currency

String set according to ISO 4217 Currency codes, formated as e.g. `"EUR"` for Euros, `"USD"` for United Stated Dollar, and `"SEK"` for Swedish Crowns.
## Date

String written as `"yyyy-mm-dd"`, e.g. `"2021-12-31"`.

## DateTime 

String formated as `"YYYY-MM-DDThh:mm:ss"`, e.g. `"2020-12-31T23:59:59"`.

## Item 
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

## Browser

| Property       | Type     | Description |
|----------------|----------|-------------|
| `acceptHeader` | `string` | (optional)  |
| `userAgent`    | `string` | (optional)  |
| `ip`           | `string` | (optional)  |

## Customer
Data type representing a customer.


| Property         | Type                        | Description                                                                      |
|------------------|-----------------------------|----------------------------------------------------------------------------------|
| `type`           | `"organization" | "person"` | (optional)                                                                       |
| `identityNumber` | `IdentityNumber`            | (optional)                                                                       |
| `id`             | `string`                    | (optional)                                                                       |
| `number`         | `string`                    | (optional)                                                                       |
| `name`           | `string | Name`             | (optional)                                                                       |
| `address`        | `Address | Addresses`       | (optional)                                                                       |
| `email`          | `string | EmailAddresses`   | (optional) one email address as a string or two as [`EmailAddresses`](../other)  |
| `phone`          | `string | PhoneNumbers`     | (optional) one phone number as a string or several as [`PhoneNumbers`](../other) |


## Address

| Property      | Type     | Description                                                          |
|---------------|----------|----------------------------------------------------------------------|
| `street`      | `string` | street address                                                       |
| `zipCode`     | `string` | area code                                                            |
| `city`        | `string` | city                                                                 |
| `countryCode` | `string` | ISO 3166-1 Alpha-2 code e.g. `"FR"` for France and `"SE"` for Sweden |

### Example:
```json
{
    "street": "Storgatan 1",
    "zipCode": 111 23,
    "city": "Stockholm",
    "countryCode": "SE"
}
```

## Addresses

| Property   | Type      | Description                     |
|------------|-----------|---------------------------------|
| `primary`  | `Address` | use Address datatype            |
| `billing`  | `Address` | (optional) use Address datatype |
| `delivery` | `Address` | (optional) use Address datatype |
| `visit`    | `Address` | (optional) use Address datatype |

## EmailAddresses

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

## PhoneNumbers

For `PhoneNumbers` atleast one property must be defined.

| Property    | Type     | Description                     |
|-------------|----------|---------------------------------|
| `primary`   | `string` | (optional) primary phone number |
| `cellphone` | `string` | (optional) cellphone number     |
| `landline`  | `string` | (optional) landline number      |