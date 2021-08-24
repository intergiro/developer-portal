# States 

On authorization a state first goes through pre-authorization then post-authorization.

## PreAuthorization 

| Property        | Type                                    |
|-----------------|-----------------------------------------|
| `merchant`      | [`Merchant`](./states.html#merchant)    |
| `authorization` | See definition below                    |
| `now`           | [`Date`](../common/reference.html#date) |


`authorization` field:

| Property       | Type                                            | Description                                     | Optional |
|----------------|-------------------------------------------------|-------------------------------------------------|----------|
| `amount`       | `number`                                        |                                                 |          |
| `currency`     | [`Currency`](../common/reference.html#currency) |                                                 |          |
| `card`         | See definition below                            |                                                 |          |
| `capture`      | `"auto"`                                        |                                                 | Yes      |
| `descriptor`   | `string`                                        |                                                 | Yes      |
| `number`       | `string`                                        | Number specified by integrator (must be unique) | Yes      |
| `verification` | `string`                                        | `"verified"`, `"unavailable"` or `"rejected"`   | Yes      |
| `recurring`    | [`Recurring`](./reference.html#recurring)       |                                                 | Yes      |

Where `card` field is defined as [`Card`](../acquiring/reference.html#card) except `csc` is optional and if it is set, is only allowed to be set to the string `"present"`.

## PostAuthorization

| Property        | Type                                 | Optional |
|-----------------|--------------------------------------|----------|
| `merchant`      | [`Merchant`](./states.html#merchant) |          |
| `amount`        | `number`                             |          |
| `authorization` | See definition below                 |          |
| `descriptor`    | `string`                             | Yes      |
| `now`           | `Date`                               |          |

`authorization` field:
| Property    | Type                                            | Description                                     | Optional |
|-------------|-------------------------------------------------|-------------------------------------------------|----------|
| `amount`    | `number`                                        |                                                 |          |
| `currency`  | [`Currency`](../common/reference.html#currency) |                                                 |          |
| `card`      | [`Card`](../acquiring/reference.html#card)      |                                                 |          |
| `created`   | [`DateTime`](../common/reference.html#datetime) |                                                 |          |
| `number`    | `string`                                        | Number specified by integrator (must be unique) | Yes      |
| `captured`  | See definition below                            |                                                 | Yes      |
| `refunded`  | See definition below                            |                                                 | Yes      |
| `voided`    | [`DateTime`](../common/reference.html#datetime) |                                                 | Yes      |
| `recurring` | `string`                                        | `"initial"` or `"subsequent"`                   | Yes      |

`captured` field:
| Property | Type                                            | Optional |
|----------|-------------------------------------------------|----------|
| amount   | `number`                                        |          |
| latest   | [`DateTime`](../common/reference.html#datetime) |          |
| auto     | `true`                                          | Yes      |

`refunded` field (all fields are required):
| Property | Type                                            |
|----------|-------------------------------------------------|
| amount   | `number`                                        |
| latest   | [`DateTime`](../common/reference.html#datetime) |

## Authorization
This Authorization type is a State used for frontend and is not to be confused with the other [`Authorization`](./reference.html#authorization) type, which is stored in the Database.

| Property        | Type                                                   | Description                                            |
|-----------------|--------------------------------------------------------|--------------------------------------------------------|
| `merchant`      | [`Merchant`](./states.html#merchant) or `{id: string}` | id is Intergiro's internal generated unique identifier |
| `authorization` | See definition below                                   |                                                        |

`authorization` field:
| Property       | Type                                            | Description                                     | Optional |   |
|----------------|-------------------------------------------------|-------------------------------------------------|----------|---|
| `id`           | `string`                                        | Intergiro's internal generated unique ID number |          |   |
| `number`       | `string`                                        | Number specified by integrator (must be unique) |          |   |
| `reference`    | `string`                                        | Scheme dependent external reference number      |          |   |
| `amount`       | `number`                                        |                                                 |          |   |
| `currency`     | [`Currency`](../common/reference.html#currency) |                                                 |          |   |
| `card`         | [`Card`](../acquiring/reference.html#card)      |                                                 |          |   |
| `descriptor`   | `string`                                        |                                                 | Yes      |   |
| `recurring`    | [`Recurring`](./reference.html#recurring)       |                                                 | Yes      |   |
| `verification` | `string`                                        | `"verified"`, `"unavailable"` or `"rejected"`   | Yes      |   |
| `history`      | `History[]`                                     |                                                 |          |   |
| `change`       | `Change[]`                                      |                                                 | Yes      |   |
| `captured`     | See definition below                            |                                                 |          |   |
| `refunded`     | See definition below                            |                                                 |          |   |
| `settled`      | See definition below                            |                                                 |          |   |
| `voided`       | [`DateTime`](../common/reference.html#datetime) |                                                 | Yes      |   |
| `status `      | [`Status[]`](./reference.html#status)           |                                                 |          |   |
| `created`      | [`DateTime`](../common/reference.html#datetime) |                                                 |          |   |
| `category`     | `string`                                        | `"purchase" | "withdrawal"`                     |          |   |


`captured` field:
| Property  | Type                                            | Optional |
|-----------|-------------------------------------------------|----------|
| `history` | [`Capture[];`](./reference.html#capture)        |          |
| `amount`  | `number`                                        |          |
| `latest`  | [`DateTime`](../common/reference.html#datetime) | Yes      |
| `auto`    | `true`                                          | Yes      |

`refunded` field:
| Property  | Type                                            | Optional |
|-----------|-------------------------------------------------|----------|
| `history` | [`Refund[]`](./reference.html#refund)           |          |
| `amount`  | `number`                                        |          |
| `latest`  | [`DateTime`](../common/reference.html#datetime) | Yes      |


`settled` field:
| Property  | Type                                                                              | Optional |
|-----------|-----------------------------------------------------------------------------------|----------|
| `history` | [`Settlement.Transaction[]`](../settlement/reference.html#settlement-transaction) |          |
| `gross`   | `number`                                                                          |          |
| `fee`     | `number`                                                                          |          |
| `net`     | `number`                                                                          |          |
| `latest`  | [`DateTime`](../common/reference.html#datetime)                                   | Yes      |

## FailedAuthorization

| Property        | Type                                                         | Description                                            |
|-----------------|--------------------------------------------------------------|--------------------------------------------------------|
| `merchant`      | [`Merchant`](./states.html#state-merchant) or `{id: string}` | id is Intergiro's internal generated unique identifier |
| `authorization` | See definition below                                         |                                                        |

`authorization` field: 
| Property       | Type                                            | Description                                     | Optional |
|----------------|-------------------------------------------------|-------------------------------------------------|----------|
| `id`           | `string`                                        | Intergiro's internal generated unique ID number | Yes      |
| `number`       | `string`                                        | Number specified by integrator (must be unique) |          |
| `amount`       | `number`                                        |                                                 | Yes      |
| `currency`     | [`Currency`](../common/reference.html#currency) |                                                 | Yes      |
| `card`         | [`Card`](../acquiring/reference.html#card)      |                                                 | Yes      |
| `capture`      | `"auto"`                                        |                                                 | Yes      |
| `descriptor`   | `string`                                        |                                                 | Yes      |
| `recurring`    | [`Recurring`](./reference.html#recurring)       |                                                 | Yes      |
| `verification` | `string`                                        | `"verified"`, `"unavailable"` or `"rejected"`   | Yes      |
| `status`       | `"failed"[]`                                    | array containing only the word `"failed"`       |          |
| `history`      | `History[]`                                     |                                                 |          |
| `reason`       | `string`                                        |                                                 |          |
| `created`      | [`DateTime`](../common/reference.html#datetime) |                                                 |          |

## Card
The Card State has the same definition as [`Card`](./reference.html#card) except `expires` is set to a [`Date`](../common/reference.html#date) instead of `[number, number]`.

## State Merchant 
All fields are required.

| Property     | Type                                            | Description                                     |
|--------------|-------------------------------------------------|-------------------------------------------------|
| `id`         | `string`                                        | Intergiro's internal generated unique ID number |
| `descriptor` | `string`                                        |                                                 |
| `country`    | [`Alpha2`](../common/reference.html#alpha2)     |                                                 |
| `name`       | `string`                                        |                                                 |
| `currency`   | [`Currency`](../common/reference.html#currency) |                                                 |
| `scheme`     | [`Scheme`](../common/reference.html#scheme)     |                                                 |
| `refundable` | `number`                                        |                                                 |
| `captured`   | `number`                                        |                                                 |
| `settled`    | `number`                                        |                                                 |
| `fees`       | `number`                                        |                                                 |