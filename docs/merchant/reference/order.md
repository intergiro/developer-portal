# Order

## Creatable
| Property   | Type                                                                 | Description                                                | Optional |
|------------|----------------------------------------------------------------------|------------------------------------------------------------|----------|
| `number`   | `string`                                                             | Order number in your system.                               | Yes      |
| `customer` | [`string | Contact`](../../integrate/acquiring/reference#contact)    | Customer contact information or [customer id](./customer). | Yes      |
| `items`    | [`number | Item | Item[]`](../../integrate/acquiring/reference#item) |                                                            |          |
| `currency` | [`Currency`](../../integrate/acquiring/reference#currency)           |                                                            |          |
| `payment`  | [`Payment.Creatable`](./payment)                                     | see Payment data type                                      |          |
| `category` | `"purchase"` or `"withdrawal"`                                       | Defaults to "purchase"                                     | Yes      |
| `theme`    | `string`                                                             | i.e. "intergiro" or "dark"                                 | Yes      |
| `meta`     | `any`                                                                | Data used by the merchant.                                 | Yes      |
| `callback` | [`string`](./callback)                                               | URL to receive the callbacks.                              | Yes      |

```
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

## Order response
| Property   | Type                                                                 | Description                                                          | Optional |
|------------|----------------------------------------------------------------------|----------------------------------------------------------------------|----------|
| `id`       | `string`                                                             | Identifier in our system.                                            |          |
| `number`   | `string`                                                             | Order number in your system.                                         | Yes      |
| `created`  | [`DateTime`](../../integrate/acquiring/reference#datetime)           | Date and the time of the order.                                      |          |
| `customer` | [`string | Contact`](../../integrate/acquiring/reference#contact)    | [customer id](./reference#customer). or Customer contact information | Yes      |
| `items`    | [`number | Item | Item[]`](../../integrate/acquiring/reference#item) |                                                                      |          |
| `currency` | [`Currency`](../../integrate/acquiring/reference#currency)           |                                                                      |          |
| `payment`  | [`Card Payment`](./payment)                                          | see Payment data type                                                |          |
| `event`    | [`Event[]`](./event)                                                 | see Event data type                                                  | Yes      |
| `category` | `"purchase"` or `"withdrawal"`                                       | Defaults to "purchase"                                               | Yes      |
| `theme`    | `string`                                                             | i.e. "intergiro" or "dark"                                           | Yes      |
| `meta`     | `any`                                                                | Data used by the merchant.                                           | Yes      |
| `callback` | [`string`](./callback)                                               | URL to receive the callbacks.                                        | Yes      |
| `language` | `string`                                                             | Two character language code, i.e. sv for swedish                     | Yes      |

```
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