# Reference 

## Customer

When creating a Customer, The “Customer Creatable” datatype is used. In the response from the endpoint an object of the “Customer data type will be returned.

### Creatable
If you do not specify a currency when creating a customer, it will default to swedish crowns "SEK". 

| Property   | Type                                                                                 | Description                                                           | Optional |
|------------|--------------------------------------------------------------------------------------|-----------------------------------------------------------------------|----------|
| `id`       | `string`                                                                             | Unique 16-letter identifier in our system                             | Yes      |
| `number`   | `string`                                                                             | Customer number in your system                                        | Yes      |
| `contact`  | [`Contact`](../common/reference.html#contact)                                        |                                                                       | Yes      |
| `method`   | `Method.Creatable[]`                                                                 | See [`Method`](#customermethod) data type, may include an empty array |          |
| `currency` | [`Currency`](../common/reference.html#currency)                                      | 3-letter currency code, e.g. "SEK"                                    | Yes      |
| `schedule` | [`Schedule`](./reference.html#schedule) or [`Frequency`](./reference.html#frequency) | see [`Schedule`](./reference.html#schedule) data type                 | Yes      |
| `limit`    | `number`                                                                             | Credit limit in the specified currency for the customer               | Yes      |

### Customer
Responses from the Customer endpoint will contain a `Customer` object, which includes an `"id"` and may include a `"status"`, subscriptions and `"link"` fields in addition to the ones in the Creatable type. 

| Property       | Type                                              | Description                                                         | Optional |
|----------------|---------------------------------------------------|---------------------------------------------------------------------|----------|
| `id`           | `string`                                          |                                                                     |          |
| `number`       | `string`                                          |                                                                     | Yes      |
| `contact`      | [`Contact`](../common/reference.html#contact)     |                                                                     | Yes      |
| `method`       | [`CustomerMethod`](#customermethod)               |                                                                     |          |
| `link`         | [`CustomerLink`](#customerlink)                   |                                                                     | Yes      |
| `status`       | `string`                                          | `"active"`, `"created"`, `"inactive"`, `"pending"` or `"suspended"` | Yes      |
| `subscription` | [`Subscription[]`](./reference.html#subscription) |                                                                     | Yes      |
| `currency`     | [`Currency`](../common/reference.html#currency)   |                                                                     |          |

### CustomerMethod
For automatic payment with a customer, a payment method has to be created first. 
This can be done either with already tokenized cards or through the [Registration](#) Process.
#### Creatable
| Property | Type      | Description                   |
|----------|-----------|-------------------------------|
| `type`   | `"token"` | Indicator for method type     |
| `card`   | `string`  | Tokenized payment information |

#### CustomerMethod

| Property   | Type                                            | Description                                                        | Optional |
|------------|-------------------------------------------------|--------------------------------------------------------------------|----------|
| `type`     | `string`                                        | `"card"` or `"token"`                                              |          |
| `created`  | [`DateTime`](../common/reference.html#datetime) |                                                                    |          |
| `token`    | authly.Token                                    |                                                                    |          |
| `scheme`   | [`Scheme`](../common/reference.html#scheme)     |                                                                    |          |
| `iin`      | `string`                                        | First 6 digits on card                                             |          |
| `last4`    | `string`                                        | Last 4 digits on card                                              |          |
| `expires`  | `[number, number]`                              | `[month, year]` where month is `1` to `12` and year is `0` to `99` |          |
| `acquirer` | `string`                                        | `"intergiro"` or `"clearhaus"`                                     | Yes      |
##### Example:
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

### CustomerLink
Information associated to single use login links for the customer page.
| Property  | Type                                            | Description | Optional |
|-----------|-------------------------------------------------|-------------|----------|
| `url`     | `string`                                        |             |          |
| `created` | [`DateTime`](../common/reference.html#datetime) |             |          |
| `expires` | [`DateTime`](../common/reference.html#datetime) |             |          |
| `key`     | authly.Token                                    |             | Yes      |
| `contact` | `string`                                        |             | Yes      |
###### Example:
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

## Customer Payment
### Customer Payment Creatable
| Property    | Type         | Description                                                    | Optional |
|-------------|--------------|----------------------------------------------------------------|----------|
| `type`      | `"customer"` |                                                                |          |
| `schedule`  | `number[]`   | Time in days for which this payment is supposed to be retried. | Yes      |
| `charge`    | `"auto"`     | On success, this order will be immediately charged.            | Yes      |
| `scheduled` | `true`       | Indicates that this is a scheduled payment.                    | Yes      |

### Customer Payment
| Property   | Type                                            | Description                                                    | Optional |
|------------|-------------------------------------------------|----------------------------------------------------------------|----------|
| `type`     | `"customer"`                                    |                                                                |          |
| `schedule` | `number[]`                                      | Time in days for which this payment is supposed to be retried. | Yes      |
| `charge`   | `"auto"`                                        | On success, this order will be immediately charged.            | Yes      |
| `due`      | [`DateTime`](../common/reference.html#datetime) | Date specifying when this order is due.                        | Yes      |

## Subscription
When creating a subscription, the Creatable Subscription datatype will be used.

When calling the subscription endpoint to add a subscription to a customer, add a Creatable Subscription Object.
The schedule and items field allow both for very specific and complex structures as well as simple payment models.
If no start date is specified, the start date will be set as the current date.
### Creatable
| Property   | Type                                                            | Description                                     | Optional |
|------------|-----------------------------------------------------------------|-------------------------------------------------|----------|
| `number`   | `string`                                                        | Number specified by integrator (must be unique) | Yes      |
| `items`    | `number` or [`Item` or `Item[]`](../common/reference.html#item) |                                                 |          |
| `currency` | [`Currency`](../common/reference.html#currency)                 |                                                 |          |
| `schedule` | [`Schedule`](#schedule) or [`Frequency`](#frequency)            |                                                 |          |
| `start`    | [`Date`](../common/reference.html#date)                         |                                                 | Yes      |
| `end`      | [`Date`](../common/reference.html#date)                         |                                                 | Yes      |
| `callback` | `string`                                                        |                                                 | Yes      |

#### Simple Example:
```json
{
    "number": "standard",
    "items": 25,
    "currency": "SEK",
    "schedule": "monthly",
}
```
#### Complex Example:
```json
{
    "number": "aaa-001",
    "items": [
        {
            "name": "Basic Access",
            "price": 42.00,
            "vat": 25.00,
            "quantity": 1
        },
        {
            "name": "Premium Access",
            "price": 100.00,
            "vat": 25.00,
            "quantity": 2
        }
    ],
    "currency": "SEK",
    "schedule": { 
      "frequency":"quarterly",
      "offset": [ 2,-1 ]
    },
    "start": "2021-07-03",
    "callback":"your.callback.com/subscription"
}
```

Responses from the Subscription endpoint will be of the completed Subscription type, which always includes a start date as well as a 4-letter identifier, which is unique per customer. The "due" field contains the date in ISO format at which the next order charging the subscription will be placed into the system. At this point the system automatically calculates the next "due" date as long as it is not past the "end" date of the subscription.

#### Subscription
| Property   | Type                                                            | Description                                              | Optional |
|------------|-----------------------------------------------------------------|----------------------------------------------------------|----------|
| `id`       | `string`                                                        | Intergiro's internal 4-letter generated unique ID number |          |
| `number`   | `string`                                                        | Number specified by integrator (must be unique)          | Yes      |
| `items`    | `number` or [`Item` or `Item[]`](../common/reference.html#item) |                                                          |          |
| `currency` | [`Currency`](../common/reference.html#currency)                 |                                                          |          |
| `schedule` | [`Schedule`](#schedule) or [`Frequency`](#frequency)            |                                                          |          |
| `start`    | [`Date`](../common/reference.html#date)                         |                                                          | Yes      |
| `end`      | [`Date`](../common/reference.html#date)                         |                                                          | Yes      |
| `due`      | [`Date`](../common/reference.html#date)                         |                                                          | Yes      |
| `callback` | `string`                                                        |                                                          | Yes      |

##### Example:
```json
{
    "id":"test",
    "number": "aaa-001",
    "items": [
        {
            "name": "Basic Access",
            "price": 50.00,
            "vat": 12.50,
            "quantity": 1
        },
        {
            "name": "Premium Access",
            "price": 100.00,
            "vat": 25.00,
            "quantity": 2
        }
    ],
    "currency": "SEK",
    "schedule": { 
      "frequency":"quarterly",
      "offset": [ 2,-1 ]
    },
    "start": "2021-07-03",
    "due": "2021-09-30",
    "callback":"your.callback.com/subscription"
}
```
### Schedule

When specifying a Schedule for payment, either use the full datatype or a string containing the Frequency as defined in the "frequency" field.
Examples for the Divisor, the Offset and multiple Schedules are defined below.

| Property    | Type                                      | Description                            | Optional |
|-------------|-------------------------------------------|----------------------------------------|----------|
| `frequency` | [`Frequency`](./reference.html#frequency) | Frequency of the payment               |          |
| `divisor`   | `number` or `[number,number]`             | How often to apply the payment         | Yes      |
| `offset`    | `number` or `[number,number]`             | Specifying offset inside the frequency | Yes      |

#### Frequency

Defined as string that is either `"daily"`,`"weekly"`,`"monthly"`, `"quarterly"` or`"yearly"`

#### Divisor 

The divisor defines how often to apply the payment. Thus, a payment on every even (Iso)week would specify `frequency: "weekly"` and `divisor: 2`.

If the billing is supposed to happen at a specific time inside of the payment period, this can be done using a more complex divisor.
For example to bill every 10 days, but always on the third day of the period, specify `frequency: "daily"` and `divisor: [3,10]`.

All numbers in the divisor have to be positive and in case of a tuple, the second number of the tuple has to be larger than the first number. 
It should also be considered that divisors use the modulo division and divisors that are not dividends of the timeframe that they divide can lead to much larger effective payment intervals. 

For example, with `frequency: "monthly"` and `divisor:7` there will only be a single payment a year, which will happen in August (month is specified with number `0`-`11`). When using the divisor with `"weekly"` frequencies also consider that an ISO year has either 53 or 52 weeks. The "daily" frequency uses the day of the month for the divisor.

##### Schedule Examples:
```JSON
Every month:
{
    "frequency": "monthly"
}
The first day of every other month (February, April, ..., December):
{
    "frequency": "monthly",
    "divisor": 2,
    "offset": 1
}
The last day of every quarter:
{
    "frequency": "quarterly",
    "offset": [2,-1]
}
Payment period of every third (Iso)week of the year, paying on wednesday in the middle week:
{
    "frequency": "weekly",
    "divisor": [1,3],
    "offset": 3
}
Every other year on the 13th of december:
{
    "frequency": "yearly",
    "divisor": 2,
    "offset": [11,13]
}
```