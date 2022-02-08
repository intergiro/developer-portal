# Reference
## Authorization

### Creatable

Authorization Creatable

| Property     | Type                                                           | Description                   | Optional |
|--------------|----------------------------------------------------------------|-------------------------------|----------|
| `number`     | `string`                                                       | has to be a unique identifier |          |
| `amount`     | `number`                                                       |                               | Yes      |
| `items`      | [`number | Item | Item[]`](reference.html#item)                |                               | Yes      |
| `currency`   | [`Currency`](../common/reference.html#currency)                |                               |          |
| `card`       | `Signed JWT` or [`Card.Creatable`](../card-api/reference.html) |                               |          |
| `descriptor` | `string`                                                       |                               | Yes      |
| `capture`    | `"auto"`                                                       |                               | Yes      |
| `recurring`  | [`Recurring`](./reference.html#recurring)                      |                               | Yes      |
| `category`   | `"purchase" | "withdrawal"`                                    |                               | Yes      |
| `browser`    | [`Browser`](../common/reference.html#browser)                  |                               | Yes      |
| `contact`    | [`Contact`](../common/reference.html#contact)                  |                               | Yes      |
| `target`     | `string`                                                       | verification target url       | Yes      |

### Authorization

| Property     | Type                                                         | Description                                     | Optional |
|--------------|--------------------------------------------------------------|-------------------------------------------------|----------|
| `id`         | `string`                                                     | Intergiro's internal generated unique ID number |          |
| `merchant`   | `string`                                                     | Intergiro's internal generated unique ID number |          |
| `number`     | `string`                                                     | Number specified by integrator (must be unique) |          |
| `reference`  | `string`                                                     | Scheme dependent external reference number      |          |
| `created`    | [`DateTime`](../common/reference.html#datetime)              |                                                 |          |
| `amount`     | `number`                                                     |                                                 |          |
| `currency`   | [`Currency`](../common/reference.html#currency)              |                                                 |          |
| `card`       | [`Card`](../card-api/reference.html#card)                    |                                                 |          |
| `descriptor` | `string`                                                     |                                                 | Yes      |
| `recurring`  | [`Recurring`](reference.html#recurring)                      |                                                 | Yes      |
| `history`    | [`History[]`](reference.html#history)                        |                                                 |          |
| `change`     | [`Change[]`](./reference.html#change)                        |                                                 | Yes      |
| `capture`    | [`Capture[]`](./reference.html#capture)                      |                                                 |          |
| `refund`     | [`Refund[]`](./reference.html#refund)                        |                                                 |          |
| `void`       | [`DateTime`](../common/reference.html#datetime)              |                                                 | Yes      |
| `status`     | [`Partial<Record<Status, number>>`](./reference.html#status) |                                                 |          |
| `category`   | `"purchase" | "withdrawal"`                                  |                                                 | Yes      |
| `fraudio`    | [`Fraudio`](./reference.html#fraudio)                        | Risk evaluation object.                         | Yes      |

#### Status
Authorization.Status is string set to `"authorized"`, `"cancelled"`, `"captured"`, `"refunded"` or `"settled"`.

#### Recurring
Recurring can be defined in four ways: 
 - As the string `"initial"`
 - As an Initial recurring: `{ type: "initial"; initiator: "cardholder"}`
 - As a Subsequent recurring: `{ type: "subsequent"; reference: string; scheduled?: false; initiator: "merchant" | "cardholder"}`
 - As a Scheduled recurring: `{ type: "subsequent"; reference: string; scheduled: true; initiator: "merchant" }`
 
 ## Change
### Creatable

| Property | Type     | Optional |
|----------|----------|----------|
| `number` | `string` | Yes      |
| `amount` | `number` | Yes      |

### Change

| Property  | Type                                            | Description | Optional |
|-----------|-------------------------------------------------|-------------|----------|
| `number`  | `string`                                        |             | Yes      |
| `created` | [`DateTime`](../common/reference.html#datetime) |             |          |
| `amount`  | `number`                                        |             |          |




## Capture
### Creatable

| Property     | Type     | Optional |
|--------------|----------|----------|
| `number`     | `string` | Yes      |
| `amount`     | `number` | Yes      |
| `auto`       | `true`   | Yes      |
| `descriptor` | `number` | Yes      |

### Capture

| Property     | Type                                                                            | Description                              | Optional |
|--------------|---------------------------------------------------------------------------------|------------------------------------------|----------|
| `number`     | `string`                                                                        |                                          | Yes      |
| `created`    | [`DateTime`](../common/reference.html#datetime)                                 |                                          |          |
| `reference`  | `string`                                                                        |                                          | Yes      |
| `approved`   | [`DateTime`](../common/reference.html#datetime)                                 |                                          | Yes      |
| `amount`     | `number`                                                                        |                                          |          |
| `auto`       | `true`                                                                          |                                          | Yes      |
| `settlement` | [`Settlement.Transaction`](../settlement/reference.html#settlement-transaction) |                                          | Yes      |
| `descriptor` | `string`                                                                        |                                          | Yes      |
| `status`     | `string`                                                                        | `"approved"`, `"pending"` or `"settled"` |          |


## Refund
### Creatable

| Property     | Type     | Optional |
|--------------|----------|----------|
| `number`     | `string` | Yes      |
| `amount`     | `number` | Yes      |
| `descriptor` | `number` | Yes      |


### Refund

| Property     | Type                                                                            | Description                              | Optional |
|--------------|---------------------------------------------------------------------------------|------------------------------------------|----------|
| `number`     | `string`                                                                        |                                          | Yes      |
| `created`    | [`DateTime`](../common/reference.html#datetime)                                 |                                          |          |
| `reference`  | `string`                                                                        |                                          |          |
| `approved`   | [`DateTime`](../common/reference.html#datetime)                                 |                                          | Yes      |
| `amount`     | `number`                                                                        |                                          |          |
| `descriptor` | `string`                                                                        |                                          | Yes      |
| `settlement` | [`Settlement.Transaction`](../settlement/reference.html#settlement-transaction) |                                          | Yes      |
| `status`     | `string`                                                                        | `"approved"`, `"pending"` or `"settled"` |          |

## History

History can be of type [Create](./reference.html#create), [Capture](./reference.html#capture-3), [Refund](./reference.html#refund-3), [Settlement](./reference.html#settlement), [Verification](./reference.html#verification) or [Void](./reference.html#void). Each type extends type [Base](./reference.html#base).

### Base
| Property   | Type                                                                       | Description             | Optional |
|------------|----------------------------------------------------------------------------|-------------------------|----------|
| `merchant` | `string`                                                                   |                         |          |
| `number`   | `string`                                                                   |                         |          |
| `date`     | [`DateTime`](../common/reference.html#datetime)                            |                         |          |
| `type`     | `"create" | "capture" | "refund" | "settlement" | "verification" | "void"` |                         |          |
| `status`   | `"fail" | "success" | "pending"`                                           |                         |          |
| `fraudio`  | [`Fraudio`](./reference.html#fraudio)                                      | Risk evaluation object. | Yes      |

### Create
History.Create is of type [Fail](./reference.html#fail), [Success](./reference.html#success) or [Pending](./reference.html#pending).
#### Fail

| Property       | Type                                             | Description | Optional |
|----------------|--------------------------------------------------|-------------|----------|
| `type`         | `"create"`                                       |             |          |
| `status`       | `"fail"`                                         |             |          |
| `amount`       | `number`                                         |             | Yes      |
| `currency`     | [`Currency`](../common/reference.html#currency)  |             | Yes      |
| `card`         | [`Card`](../card-api/reference.html#card)        |             | Yes      |
| `descriptor`   | `string`                                         |             | Yes      |
| `recurring`    | [`Recurring`](reference.html#recurring)          |             | Yes      |
| `verification` | ` "verified" | "rejected" | "unavailable"`       |             | Yes      |
| `rule`         | `string[]`                                       |             | Yes      |
| `reason`       | [`Error Code`](../common/error.html#error-codes) |             |          |
| `error`        | [`Error`](../common/error.html#error-2)          |             |          |


#### Success
| Property       | Type                                       | Description | Optional |
|----------------|--------------------------------------------|-------------|----------|
| `type`         | `"create"`                                 |             |          |
| `status`       | `"success"`                                |             |          |
| `verification` | ` "verified" | "rejected" | "unavailable"` |             | Yes      |

#### Pending
| Property     | Type                                            | Description | Optional |
|--------------|-------------------------------------------------|-------------|----------|
| `type`       | `"create"`                                      |             |          |
| `status`     | `"pending"`                                     |             |          |
| `amount`     | `number`                                        |             | Yes      |
| `currency`   | [`Currency`](../common/reference.html#currency) |             | Yes      |
| `card`       | [`Card`](../card-api/reference.html#card)       |             | Yes      |
| `descriptor` | `string`                                        |             | Yes      |
| `recurring`  | [`Recurring`](reference.html#recurring)         |             | Yes      |
| `rule`       | `string[]`                                      |             |          |
| `reason`     | `"verification required" `                      |             |          |


### Capture and Refund
History.Capture and History.Refund are of type [Fail](./reference.html#fail-2) or [Success](./reference.html#success-2).

#### Fail

| Property   | Type                                             | Description | Optional |
|------------|--------------------------------------------------|-------------|----------|
| `type`     | `"capture" | "refund"`                           |             |          |
| `status`   | `"fail"`                                         |             |          |
| `amount`   | `number`                                         |             |          |
| `currency` | [`Currency`](../common/reference.html#currency)  |             |          |
| `reason`   | [`Error Code`](../common/error.html#error-codes) |             |          |
| `error`    | [`Error`](../common/error.html#error-2)          |             |          |


#### Success
| Property    | Type                                            | Description | Optional |
|-------------|-------------------------------------------------|-------------|----------|
| `type`      | `"capture" | "refund"`                          |             |          |
| `status`    | `"fail"`                                        |             |          |
| `amount`    | `number`                                        |             |          |
| `currency`  | [`Currency`](../common/reference.html#currency) |             |          |
| `reference` | `string`                                        |             |          |

### Settlement

| Property    | Type                                    | Description | Optional |
|-------------|-----------------------------------------|-------------|----------|
| `type`      | `"settlement"`                          |             |          |
| `status`    | `"success"`                             |             |          |
| `operation` | `string`                                |             |          |
| `reference` | `string`                                |             |          |
| `payout`    | [`Date`](../common/reference.html#date) |             |          |


### Verification

History.Verification is of type [Fail](./reference.html#fail-3), [Success](./reference.html#success-3) or [Pending](./reference.html#pending-2).

#### Fail
| Property    | Type                                                         | Description | Optional |
|-------------|--------------------------------------------------------------|-------------|----------|
| `type`      | `"verification"`                                             |             |          |
| `status`    | `"fail"`                                                     |             |          |
| `step`      | `"preauthorization" | "authorization" | "postauthorization"` |             |          |
| `target`    | `string`                                                     |             | Yes      |
| `browser`   | [`Browser`](../common/reference.html#browser)                |             | Yes      |
| `contact`   | [`Contact`](../common/reference.html#contact)                |             | Yes      |
| `items`     | [`number | Item | Item[]`](reference.html#item)              |             | Yes      |
| `currency`  | [`Currency`](../common/reference.html#currency)              |             | Yes      |
| `recurring` | [`Recurring`](reference.html#recurring)                      |             | Yes      |
| `reason`    | [`Error Code`](../common/error.html#error-codes)             |             |          |
| `error`     | [`Error`](../common/error.html#error-2)                      |             |          |

#### Success
| Property    | Type                                            | Description | Optional |
|-------------|-------------------------------------------------|-------------|----------|
| `type`      | `"verification"`                                |             |          |
| `status`    | `"success"`                                     |             |          |
| `step`      | `"postauthorization" | "authorization"`         |             |          |
| `target`    | `string`                                        |             | Yes      |
| `browser`   | [`Browser`](../common/reference.html#browser)   |             | Yes      |
| `contact`   | [`Contact`](../common/reference.html#contact)   |             | Yes      |
| `items`     | [`number | Item | Item[]`](reference.html#item) |             | Yes      |
| `currency`  | [`Currency`](../common/reference.html#currency) |             | Yes      |
| `recurring` | [`Recurring`](reference.html#recurring)         |             | Yes      |

#### Pending
| Property    | Type                                            | Description | Optional |
|-------------|-------------------------------------------------|-------------|----------|
| `type`      | `"verification"`                                |             |          |
| `status`    | `"pending"`                                     |             |          |
| `step`      | `"postauthorization" | "authorization"`         |             |          |
| `target`    | `string`                                        |             | Yes      |
| `browser`   | [`Browser`](../common/reference.html#browser)   |             | Yes      |
| `contact`   | [`Contact`](../common/reference.html#contact)   |             | Yes      |
| `items`     | [`number | Item | Item[]`](reference.html#item) |             | Yes      |
| `currency`  | [`Currency`](../common/reference.html#currency) |             | Yes      |
| `recurring` | [`Recurring`](reference.html#recurring)         |             | Yes      |

### Void
`History.Void` is of type [Fail](./reference.html#fail-4) or [Success](./reference.html#success-4).

#### Fail
| Property | Type                                             | Description | Optional |
|----------|--------------------------------------------------|-------------|----------|
| `type`   | `"verification"`                                 |             |          |
| `status` | `"fail"`                                         |             |          |
| `reason` | [`Error Code`](../common/error.html#error-codes) |             |          |
| `error`  | [`Error`](../common/error.html#error-2)          |             |          |

#### Success
| Property | Type             | Description | Optional |
|----------|------------------|-------------|----------|
| `type`   | `"verification"` |             |          |
| `status` | `"success"`      |             |          |

## Fraudio
The `Fraudio` type is for risk evalution.
| Property         | Type                         | Description                                                      | Optional |
|------------------|------------------------------|------------------------------------------------------------------|----------|
| `score`          | `number`                     | Value between 0 and 1. The higher the score the higher the risk. |          |
| `recommendation` | `"green" | "yellow" | "red"` | Fraudio's recommendation.                                        |          |
| `id`             | `string`                     |                                                                  |          |
| `threshold`      | `number`                     | Value between 0 and 1.                                           |          |
| `model`          | `string`                     |                                                                  |          |
| `notes`          | `string`                     |                                                                  | Yes      |
| `transaction`    | `string`                     |                                                                  | Yes      |