# Payment

## Card payment creatable
| Property    | Type                                                                               | Description                                 | Optional |
|-------------|------------------------------------------------------------------------------------|---------------------------------------------|----------|
| `type`      | `"card"`                                                                           |                                             |          |
| `card`      | `JWT`                                                                              | Contains encrypted card information.        |          |
| `client`    | [`{ip:string; browser:Browser}`](../../integrate/acquiring/reference.html#browser) |                                             | Yes      |
| `scheduled` | `true`                                                                             | Indicates that this is a scheduled payment. | Yes      |

## Card payment
| Property          | Type                                                            | Description                                                         | Optional |
|-------------------|-----------------------------------------------------------------|---------------------------------------------------------------------|----------|
| `type`            | `"card"`                                                        |                                                                     |          |
| `created`         | [`DateTime`](../../integrate/acquiring/reference.html#datetime) | Date and the time when the payment was processed.                   |          |
| `card`            | `JWT`                                                           | Contains encrypted card information.                                | Yes      |
| `scheme`          | `string`                                                        | Indicates the card scheme.                                          |          |
| `iin`             | `string`                                                        | First 6 digits on card.                                             |          |
| `last4`           | `string`                                                        | Last 4 digits on card.                                              |          |
| `expires`         | `[number,number]`                                               | `[month, year]` where month is `1` to `12` and year is `0` to `99`. |          |
| `scheduled`       | `true`                                                          | Indicates that this was a scheduled payment.                        | Yes      |
| `service`         | `"intergiro"`                                                   |                                                                     |          |
| `status`          | `string`                                                        |                                                                     |          |
| `descriptor`      | `string`                                                        | Text on Statement.                                                  | Yes      |
| `reference`       | `string`                                                        | Reference number of the acquirer.                                   |          |
| `schemeReference` | `string`                                                        | Reference number of the payment scheme.                             | Yes      |

## Customer payment creatable
| Property    | Type         | Description                                                    | Optional |
|-------------|--------------|----------------------------------------------------------------|----------|
| `type`      | `"customer"` |                                                                |          |
| `schedule`  | `number[]`   | Time in days for which this payment is supposed to be retried. | Yes      |
| `charge`    | `"auto"`     | On success, this order will be immediately charged.            | Yes      |
| `scheduled` | `true`       | Indicates that this is a scheduled payment.                    | Yes      |

## Customer payment
| Property   | Type                                                            | Description                                                    | Optional |
|------------|-----------------------------------------------------------------|----------------------------------------------------------------|----------|
| `type`     | `"customer"`                                                    |                                                                |          |
| `schedule` | `number[]`                                                      | Time in days for which this payment is supposed to be retried. | Yes      |
| `charge`   | `"auto"`                                                        | On success, this order will be immediately charged.            | Yes      |
| `due`      | [`DateTime`](../../integrate/acquiring/reference.html#datetime) | Date specifying when this order is due.                        | Yes      |