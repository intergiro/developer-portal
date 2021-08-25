# Reference 

## Order

### Creatable
| Property   | Type                                                                                                                                     | Description                                                | Optional |
|------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|----------|
| `number`   | `string`                                                                                                                                 | Order number in your system.                               | Yes      |
| `customer` | [`string | Contact`](../common/reference.html#contact)                                                                                   | Customer contact information or [customer id](./customer). | Yes      |
| `items`    | [`number | Item | Item[]`](../common/reference.html#item)                                                                                |                                                            |          |
| `currency` | [`Currency`](../common/reference.html#currency)                                                                                          |                                                            |          |
| `payment`  | [`Payment.Card.Creatable`](./reference.html#card-payment) \| [`Payment.Customer.Creatable`](../customer/reference.html#customer-payment) |                                                            |          |
| `category` | `"purchase"` or `"withdrawal"`                                                                                                           | Defaults to "purchase"                                     | Yes      |
| `theme`    | `string`                                                                                                                                 | i.e. "intergiro" or "dark"                                 | Yes      |
| `meta`     | `any`                                                                                                                                    | Data used by the merchant.                                 | Yes      |
| `callback` | [`string`](./callback.html#callback)                                                                                                     | URL to receive the callbacks.                              | Yes      |

#### Example
``` json
{
    "number": "aaa-001",
    "item": [
        {
            "name": "t-shirt",
            "price": 42.00,
            "quantity": 2
        },
        {
            "name": "trousers",
            "price": 100.00,
            "quantity": 1,
            "unit": "st",
            "vat": 25.00
        }
    ],
    "currency": "SEK",
    "payment": {
        "type": "card",
        "card": "tokenized.card.information"
    }
}
```

### Order
| Property   | Type                                                      | Description                                                               | Optional |
|------------|-----------------------------------------------------------|---------------------------------------------------------------------------|----------|
| `id`       | `string`                                                  | Identifier in our system.                                                 |          |
| `number`   | `string`                                                  | Order number in your system.                                              | Yes      |
| `created`  | [`DateTime`](../common/reference.html#datetime)           | Date and the time of the order.                                           |          |
| `customer` | [`string | Contact`](../common/reference.html#contact)    | [customer id](./reference/customer.html). or Customer contact information | Yes      |
| `items`    | [`number | Item | Item[]`](../common/reference.html#item) |                                                                           |          |
| `currency` | [`Currency`](../common/reference.html#currency)           |                                                                           |          |
| `payment`  | [`Card Payment`](./reference.html#card-payment)           | see Payment data type                                                     |          |
| `event`    | [`Event[]`](./reference.html#event)                       | see Event data type                                                       | Yes      |
| `category` | `"purchase"` or `"withdrawal"`                            | Defaults to "purchase"                                                    | Yes      |
| `theme`    | `string`                                                  | i.e. "intergiro" or "dark"                                                | Yes      |
| `meta`     | `any`                                                     | Data used by the merchant.                                                | Yes      |
| `callback` | [`string`](./callback.html#callback)                      | URL to receive the callbacks.                                             | Yes      |
| `language` | `string`                                                  | Two character language code, i.e. sv for swedish                          | Yes      |

#### Example
``` json
{
    "id": "BlTmF3S382kFbn5U",
    "number": "aaa-00b",
    "item": {
        "name": "rubber duck",
        "price": 50.00,
        "quantity": 2,
    },
    "currency": "SEK",
    "payment": {
        "type": "card",
        "descriptor": "Text on statement",
        "amount": 100,
        "created": "1970-01-01T12:00:00.001Z",
        "currency": "SEK",
        "expires": [6, 23],
        "iin": "411111",
        "last4": "1111",
        "scheme": "mastercard",
        "status": "created",
        "card": "tokenized.card.information",
        "reference": "abcdefghijklmnop",
        "service": "intergiro"
    },
    "created": "1970-01-01T12:00:00.001Z"
}
```

## Event
### Type
The following are valid types of events: `"cancel"`, `"charge"`, `"defer"`, `"order"`, `"refund" `.

### Creatable
| Property     | Type                                                      | Description                                                       | Optional |
|--------------|-----------------------------------------------------------|-------------------------------------------------------------------|----------|
| `type`       | [`Event.Type`](#type)                                     | The Type of event to be created.                                  |          |
| `items`      | [`number | Item | Item[]`](../common/reference.html#item) | Amounts or items that are referenced by the event, if applicable. | Yes      |
| `descriptor` | `string`                                                  | Merchant defined descriptor of the event.                         | Yes      |

### Event
| Property     | Type                                                      | Description                                                       | Optional |
|--------------|-----------------------------------------------------------|-------------------------------------------------------------------|----------|
| `type`       | [`Event.Type`](#Type)                                     | The Type of the event.                                            |          |
| `items`      | [`number | Item | Item[]`](../common/reference.html#item) | Amounts or items that are referenced by the event, if applicable. | Yes      |
| `reference`  | `string`                                                  | Reference number of the acquirer.                                 | Yes      |
| `date`       | [`DateTime`](../common/reference.html#datetime)           | Time of the event creation.                                       | Yes      |
| `descriptor` | `string`                                                  | Merchant defined descriptor of the event.                         | Yes      |

### Fail Event
| Property   | Type                                  | Description                         | Optional |
|------------|---------------------------------------|-------------------------------------|----------|
| `type`     | `"fail"`                              |                                     |          |
| `original` | [`Event.Type`](#type)                 | Type of the failed event.           |          |
| `error`    | [`Error`](../common/error.html#error) | Error that lead to the failed event | Yes      |

## Card Payment

### Card Payment Creatable
| Property    | Type                                                               | Description                                 | Optional |
|-------------|--------------------------------------------------------------------|---------------------------------------------|----------|
| `type`      | `"card"`                                                           |                                             |          |
| `card`      | `JWT`                                                              | Contains encrypted card information.        |          |
| `client`    | [`{ip:string; browser:Browser}`](../common/reference.html#browser) |                                             | Yes      |
| `scheduled` | `true`                                                             | Indicates that this is a scheduled payment. | Yes      |

### Card Payment
| Property          | Type                                            | Description                                                         | Optional |
|-------------------|-------------------------------------------------|---------------------------------------------------------------------|----------|
| `type`            | `"card"`                                        |                                                                     |          |
| `created`         | [`DateTime`](../common/reference.html#datetime) | Date and the time when the payment was processed.                   |          |
| `card`            | `JWT`                                           | Contains encrypted card information.                                | Yes      |
| `scheme`          | `string`                                        | Indicates the card scheme.                                          |          |
| `iin`             | `string`                                        | First 6 digits on card.                                             |          |
| `last4`           | `string`                                        | Last 4 digits on card.                                              |          |
| `expires`         | `[number,number]`                               | `[month, year]` where month is `1` to `12` and year is `0` to `99`. |          |
| `scheduled`       | `true`                                          | Indicates that this was a scheduled payment.                        | Yes      |
| `service`         | `"intergiro"`                                   |                                                                     |          |
| `status`          | `string`                                        |                                                                     |          |
| `descriptor`      | `string`                                        | Text on Statement.                                                  | Yes      |
| `reference`       | `string`                                        | Reference number of the acquirer.                                   |          |
| `schemeReference` | `string`                                        | Reference number of the payment scheme.                             | Yes      |
