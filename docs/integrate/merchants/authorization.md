
# Authorization

### Creatable

Authorization Creatable

| Property     | Type                                                      | Description |
|--------------|-----------------------------------------------------------|-------------|
| `number`     | `string`                                                  |             |
| `amount`     | `number`                                                  |             |
| `currency`   | [`Currency`](./other.html#currency)                       |             |
| `card`       | `Signed JWT` or [`Card.Creatable`](./card.html#creatable) |             |
| `descriptor` | `string`                                                  | (optional)  |
| `capture`    | `"auto"`                                                  | (optional)  |
| `recurring`  | [`Recurring`](#recurring)                                 | (optional)  |

### Authorization

| Property   | Type                                                             | Description |
|------------|------------------------------------------------------------------|-------------|
| id         | `authly.Identifier`                                              |             |
| merchant   | `authly.Identifier`                                              |             |
| number     | `string`                                                         |             |
| reference  | `string`                                                         |             |
| created    | [`DateTime`](./other.html#datetime)                              |             |
| amount     | `number`                                                         |             |
| currency   | [`Currency`](./other.html#currency)                              |             |
| card       | [`Card`](./card)                                                 |             |
| descriptor | `string`                                                         | (optional)  |
| recurring  | [`Recurring`](authorization.html#recurring)                      | (optional)  |
| history    | `History[]`                                                      |             |
| change     | [`Change[]`](./Change)                                           | (optional)  |
| capture    | [`Capture[]`](./Capture)                                         |             |
| refund     | [`Refund[]`](./Refund)                                           |             |
| void       | [`DateTime`](./other.html#datetime)                              | (optional)  |
| status     | [`Partial<Record<Status, number>>`](./authorization.html#status) |             |


### Status
Authorization.Status is string set to `"authorized"`, `"cancelled"`, `"captured"`, `"refunded"` or `"settled"`.

### Recurring
Recurring can be defined in four ways: 
 - As a string: `"initial"`
 - As an Initial reacurring: `{ type: "initial"; initiator: "cardholder"}`
 - As a Subsequent recurring: `{ type: "subsequent"; reference: string; scheduled?: false; initiator: "merchant" | "cardholder"}`
 - As a Scheduled Recurring: `{ type: "subsequent"; reference: string; scheduled: true; initiator: "merchant" }`
 
### API
In order to create an Authorization, first send a request with the body of the request set as an [Authorization creatable](./authorization.html#creatable).

``` {1}
POST /authorization

Host: api.payfunc.com
Content-Type: application/json
Authorization: Bearer <access_token>
```

Example Response:

``` {1}
HTTP 200 OK

{
	id: "1234567890123456",
	number: "testNumber",
	merchant: "testtest",
	amount: 101.1,
	currency: "SEK",
	history: [],
	change: [],
	capture: [],
	refund: [],
	created: "2021-04-01T09:00:00.000Z",
	reference: "12341234",
	card: {
		csc: "matched",
		expires: [2, 28],
		iin: "123456",
		last4: "1111",
		scheme: "visa",
		type: "debit",
	},
}
```

## Change 

### Creatable

| Property | Type     | Description |
|----------|----------|-------------|
| `number` | `string` | (optional)  |
| `amount` | `number` | (optional)  |
### Change

| Property  | Type                                | Description |
|-----------|-------------------------------------|-------------|
| `number`  | `string`                            | (optional)  |
| `created` | [`DateTime`](./other.html#datetime) |             |
| `amount`  | `number`                            |             |
 
 ## Operation

 ### Creatable

| Property  | Type                                        | Description                                                                                                           |
|-----------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `id`      | `string`                                    | string length is divisible by 4, and only contains characters `"0"`- `"9"`, `"A"`-`"Z"`, `"a"`-`"z"`, `"-"` and `"_"` |
| `change`  | [`Change.Creatable`](../change-creatable)   | (optional)                                                                                                            |
| `capture` | [`Capture.Creatable`](../capture-creatable) | (optional)                                                                                                            |
| `refund`  | [`Refund.Creatable`](../refund-creatable)   | (optional)                                                                                                            |
| `void`    | `true`                                      | (optional)                                                                                                            |

### Operation
