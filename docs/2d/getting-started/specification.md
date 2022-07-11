# Specification

All Intergiro API endpoints are documented in the specification available [here](https://2d.intergiro.com/v1/docs).

## Structure

Endpoints are **organized in specific sections** like account or transaction.

Each section contains **list of related endpoints** with short description.
Every single endpoint is thoroughly documented and you can see exactly what's the expected **request body**, what are the **path or query parameters**, or what are the **possible responses**.

Some endpoints have additional annotations, like SCA requirement badge.

## Rules

Understanding rules related to validation of specific values, be it path parameters, query parameters or request payloads, is very important to efficiently use the specification.

### Example

Let's use `send payments` endpoint as an example. This endpoint expects required fields `account_id` of type string and an `items`, an array containing at least one payment detail. A payment detail expects required fields `amount` of type integer, `reference` of type string and `counterparty` object. The `amount` field accepts only minor unit currency, ex `amount * 100`, Thus, it can't be a double. The `counterparty` field is an object that expects required fields `type` of type enum and `account_details` of type object. The `type` field is an enum that describes the shape of account_details object . Only `sepa` type is currently supported. The `account_details` field is an object that expects required fields `name`, `account_iban` and `account_bic` of type strings. Fields, `account_iban` and `account_bic` require to have the right iban and bic formats respectively.

This would be a correct usage:

```{1,7,8}
POST /v1/bulk_payments

Content-Type: application/json
Authorization: Bearer <access_token>

{
	"account_id": "gHcYiRdtr",
	"items": [
		{
			"counterparty": {
				"type": "sepa",
				"account_details": {
					"name": "B0",
					"account_iban": "SE9297700000010008060245",
					"account_bic": "FTCSSESS"
				}
			},
			"amount": 0.1 * 100,
			"reference": "This is payment details info"
		}
	]
}
```

This would be an incorrect usage:

```{1,7,8}
POST /v1/bulk_payments

Content-Type: application/json
Authorization: Bearer <access_token>

{
	"account_id": "",
	"items": [
		{
			"counterparty": {
				"type": "swift",
				"account_details": {
					"name": null,
					"account_iban": "123",
					"account_bic": "--3##$@@"
				}
			},
			"amount": 0.005 * 100,
			"reference": ""
		}
	]
}

```

What's wrong with this request payload?

- `account_id` cannot be an empty string. Our `string` type requires non-empty strings.
- `items[0].counterparty.type` cannot be type `swift` - only `sepa` is allowed.
- `items[0].counterparty.account_details.name` cannot be specified as null. We distinguish between an optional parameter and a parameter that can be `null`. Optional parameters can be omitted entirely and not present in the request body at all.
- `items[0].counterparty.account_details.account_iban` and `items[0].counterparty.account_details.account_bic` are incorrectly formatted.
- `items[0].amount` cannot be double. The amount portion should not contain more than 2 digits after the decimal point.
- `items[0].reference` cannot be an empty string.
Response to this invalid request will contain a list of errors that describe exactly what was wrong.

## Tips

Most of the time returned errors are very precise, but unfortunately in cases with very complex request payloads, the error might be more generic.
**Make sure that you always follow the specification and validation rules to avoid unexpected issues**.

In case you're not sure about usage of any of the endpoints from the specification, remember to **check other sections on our [developer portal](/2d)**.
If you face any issues when implementing our API, please contact our support team at `2d-api-support@intergiro.com`.
