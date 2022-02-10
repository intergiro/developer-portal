# Specification

All Intergiro API endpoints are documented in the specification available [here](https://3d.intergiro.com/v3/docs).

## Structure

Endpoints are **organized in specific sections** like _individual_ or _transaction_.

Each section contains **list of related endpoints** with short description.
Every single endpoint is thoroughly documented and you can see exactly what's the expected **request body**, what are the **path or query parameters**, or what are the **possible responses**.

Also, some endpoints have additional annotations, like SCA requirement badge.

## Rules

Understanding rules related to validation of specific values, be it path parameters, query parameters or request payloads, is very important to efficiently use the specification.

### Example

Let's use account creation endpoint as an example. This endpoint expects required field `individual_id` of type string and another string field `type` that is not required.

This would be a correct usage:

```{1,7,8}
POST /v3/accounts

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "individual_id": "c5f90f4b-9d69-416a-8611-8a8c8d605c36",
  "type": "current"
}
```

This would be an incorrect usage:

```{1,7,8}
POST /v3/accounts

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "individual_id": "",
  "type": null
}
```

What's wrong with this request payload?

- `individual_id` cannot be an empty string. Our `string` type requires non-empty strings.
- `type` cannot be specified as null. We distinguish between an optional parameter and a parameter that can be `null`. Optional parameters can be omitted entirely and not present in the request body at all.

Response to this invalid request would contain list of errors that describe exactly what was wrong.

## Tips

Most of the time returned errors are very precise, but unfortunately in case of very complex request payloads, the error could be more generic.
**Make sure that you always follow the specification and validation rules to avoid unexpected issues**.

In case you're not sure about usage of any of the endpoints from the specification, remember to **check other sections on our [developer portal](/3d)**.
There's a high chance that this operation that you're having troubles with is described somewhere here with additional examples and descriptions.
