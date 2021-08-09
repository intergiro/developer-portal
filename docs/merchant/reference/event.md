# Event
## Type
The following are valid types of events: `"cancel", "charge", "defer", "order", "refund" `.

## Creatable
| Property     | Type                                                                      | Description                                                       | Optional |
|--------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|----------|
| `type`       | [`Event.Type`](#Type)                                                     | The Type of event to be created.                                  |          |
| `items`      | [`number | Item | Item[]`](../../integrate/acquiring/reference.html#item) | Amounts or items that are referenced by the event, if applicable. | Yes      |
| `descriptor` | `string`                                                                  | Merchant defined descriptor of the event.                         | Yes      |

## Event
| Property     | Type                                                                      | Description                                                       | Optional |
|--------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|----------|
| `type`       | [`Event.Type`](#Type)                                                     | The Type of the event.                                            |          |
| `items`      | [`number | Item | Item[]`](../../integrate/acquiring/reference.html#item) | Amounts or items that are referenced by the event, if applicable. | Yes      |
| `reference`  | `string`                                                                  | Reference number of the acquirer.                                 | Yes      |
| `date`       | [`DateTime`](../../integrate/acquiring/reference.html#datetime)           | Time of the event creation.                                       | Yes      |
| `descriptor` | `string`                                                                  | Merchant defined descriptor of the event.                         | Yes      |

## Fail Event
| Property   | Type                              | Description                         | Optional |
|------------|-----------------------------------|-------------------------------------|----------|
| `type`     | `"fail"`                          |                                     |          |
| `original` | [`Event.Type`](./event.html#type) | Type of the failed event.           |          |
| `error`    | [`Error`](./error.html#error)     | Error that lead to the failed event | Yes      |
