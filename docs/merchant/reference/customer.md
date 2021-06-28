# Customer

When creating an Customer, The “Customer Creatable” datatype is used. In the response from the endpoint an object of the “Customer data type will be returned.

## Creatable
If you do not specify a currency when creating a customer, it will default to swedish crowns "SEK". 

| Property   | Type                                                                                     | Description                                                           | Optional |
|------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|----------|
| `id`       | `string`                                                                                 | Unique 16-letter identifier in our system                             | Yes      |
| `number`   | `string`                                                                                 | Customer number in your system                                        | Yes      |
| `contact`  | [`Contact`](../../integrate/acquiring/reference.html#contact)                            |                                                                       | Yes      |
| `method`   | `Method.Creatable[]`                                                                     | See [`Method`](#customermethod) data type, may include an empty array |          |
| `currency` | [`Currency`](../../integrate/acquiring/reference.html#currency)                          | 3-letter currency code, e.g. "SEK"                                    | Yes      |
| `schedule` | [`Schedule`](./subscription.html#scheme) or [`Frequency`](./subscription.html#frequency) | see [`Schedule`](./subscription.html#scheme) data type                | Yes      |
| `limit`    | `number`                                                                                 | Credit limit in the specified currency for the customer               | Yes      |

## Customer
Responses from the Customer endpoint will contain a `Customer` object, which includes an `"id"` and may include a `"status"`, subscriptions and `"link"` fields in addition to the ones in the Creatable type. 

| Property       | Type                                                            | Description                                                         | Optional |
|----------------|-----------------------------------------------------------------|---------------------------------------------------------------------|----------|
| `id`           | `string`                                                        |                                                                     |          |
| `number`       | `string`                                                        |                                                                     | Yes      |
| `contact`      | [`Contact`](../../integrate/acquiring/reference.html#contact)   |                                                                     | Yes      |
| `method`       | [`CustomerMethod`](#customermethod)                             |                                                                     |          |
| `link`         | [`CustomerLink`](#customerlink)                                 |                                                                     | Yes      |
| `status`       | `string`                                                        | `"active"`, `"created"`, `"inactive"`, `"pending"` or `"suspended"` | Yes      |
| `subscription` | [`Subscription[]`](./subscription.html#subscription)            |                                                                     | Yes      |
| `currency`     | [`Currency`](../../integrate/acquiring/reference.html#currency) |                                                                     |          |

## CustomerMethod
For automatic payment with a customer, a payment method has to be created first. 
This can be done either with already tokenized cards or through the [Registration](#) Process.
### Creatable
| Property | Type      | Description                   |
|----------|-----------|-------------------------------|
| `type`   | `"token"` | Indicator for method type     |
| `card`   | `string`  | Tokenized payment information |

### CustomerMethod

| Property   | Type                                                            | Description                                                        | Optional |
|------------|-----------------------------------------------------------------|--------------------------------------------------------------------|----------|
| `type`     | `string`                                                        | `"card"` or `"token"`                                              |          |
| `created`  | [`DateTime`](../../integrate/acquiring/reference.html#datetime) |                                                                    |          |
| `token`    | authly.Token                                                    |                                                                    |          |
| `scheme`   | [`Scheme`](../../integrate/acquiring/reference.html#scheme)     |                                                                    |          |
| `iin`      | `string`                                                        | First 6 digits on card                                             |          |
| `last4`    | `string`                                                        | Last 4 digits on card                                              |          |
| `expires`  | `[number, number]`                                              | `[month, year]` where month is `1` to `12` and year is `0` to `99` |          |
| `acquirer` | `string`                                                        | `"intergiro"` or `"clearhaus"`                                     | Yes      |
#### Example:
```json
{
    "type": "card",
    "created": "2020-03-13T13:37:13.123Z",
    "token": "abc.def.ghi",
    "scheme": "visa",
    "iin": "411111",
    "last4": "1111",
    "expires": [ 2, 22 ],
}
```

## CustomerLink
Information associated to single use login links for the customer page.
| Property  | Type                                                            | Description | Optional |
|-----------|-----------------------------------------------------------------|-------------|----------|
| `url`     | `string`                                                        |             |          |
| `created` | [`DateTime`](../../integrate/acquiring/reference.html#datetime) |             |          |
| `expires` | [`DateTime`](../../integrate/acquiring/reference.html#datetime) |             |          |
| `key`     | authly.Token                                                    |             | Yes      |
| `contact` | `string`                                                        |             | Yes      |
##### Example:
```json
{
    "url": "http://localhost:7071/customer/1234567890abcdef/link/0987654321098765",
    "id": "0987654321098765",
    "created": "2020-12-08T09:19:42.835Z",
    "expires": "2020-12-11T09:19:42.835Z",
    "key": "abc.def.ghi",
    "contact": "m.exampleperson@example.net",
    "used": false
}
```