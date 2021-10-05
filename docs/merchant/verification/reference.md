# Reference


## Verification Creatable

| Property    | Type                                                                     | Description                                                                              | Optional |
|-------------|--------------------------------------------------------------------------|------------------------------------------------------------------------------------------|----------|
| `number`    | `string`                                                                 |                                                                                          |          |
| `items`     | [`number | Item | Item[]`](reference.html#item)                          |                                                                                          |          |
| `response`  | `Response`                                                               | Defined below                                                                            | Yes      |
| `version`   | `"2.1.0" | "2.2.0"`                                                      | Specified in [verification required error](./reference.html#verification-required-error) |          |
| `browser`   | [`Browser`](../common/reference.html#browser)                            |                                                                                          | Yes      |
| `currency`  | [`Currency`](../common/reference.html#currency)                          |                                                                                          |          |
| `card`      | `Signed JWT` or [`Card.Creatable`](../card-api/reference.html#reference) |                                                                                          |          |
| `recurring` | [`Recurring`](../authorization/reference.html#recurring)                 |                                                                                          | Yes      |
| `contact`   | [`Contact`](../common/reference.html#contact)                            |                                                                                          | Yes      |
| `target`    | `string`                                                                 | iframe target url                                                                        |          |
| `category`  | `"purchase" | "withdrawal"`                                              |                                                                                          | Yes      |

`Response` can be defined in two ways:
- `{type: "method" | "challenge" | "pares"; data: string | Record<string, any>}` or
- `{type: "method"; ThreeDSServerTransID: string; timeout: true }`


## Verification
Verification can be defined in two ways:

For a pares:
| Property | Type      | Description |
|----------|-----------|-------------|
| `type`   | `"pares"` |             |
| `data`   | `Pares`   |             |
	  
where `Pares` is defined as 

| Property         | Type                                            | Description                                | Optional |
|------------------|-------------------------------------------------|--------------------------------------------|----------|
| `cavv`           | `string`                                        |                                            |          |
| `xid`            | `string`                                        |                                            |          |
| `eci`            | `string`                                        | `"0"`, `"1"`, `"2"`, `"5"`, `"6"` or `"7"` |          |
| `status`         | `string`                                        | `"Y"`, `"U"`, `"A"`, `"N"`                 |          |
| `amount`         | `number`                                        |                                            | Yes      |
| `cavv_algorithm` | `string`                                        |                                            | Yes      |
| `currency`       | [`Currency`](../common/reference.html#currency) |                                            | Yes      |
| `last4`          | `string`                                        |                                            | Yes      |
| `merchant_id`    | `string`                                        |                                            | Yes      |
| `category`       | `"purchase" | "withdrawal"`                     |                                            | Yes      |

or 

For method or challange
| Property | Type                                                                                                                       | Description                                                               |
|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `type`   | `"method" | "challenge"`                                                                                                   |                                                                           |
| `data`   | `{ authentication: string; status: "A" | "N" | "U" | "Y" | "C" | "R"; reference: { server: string ; directory: string }}}` | `server` is the threeDSServerTransID and the `directory` is the dsTransID |

## Verification required error
If you receive a verification required error, [3D secure](create.html#_3d-secure) needs to be performed.

### Method
``` JSON
HTTP 400 Bad Request
{
  "status": 400,
  "type": "malformed content",
  "content": {
    "property": "card",
    "type": "Card.Creatable | Card.Token",
    "description": "verification required",
    "details": {
      "visible": false,
      "method": "POST",
      "url": "https://acs.sandbox.3dsecure.io/3dsmethod",
      "data": {
        "type": "method",
        "threeDSServerTransID": "29673dd1-d33e-40fe-be64-5c68b490904c",
        "messageVersion": "2.2.0"
      }
    }
  },
  "error": "verification required"
}
```
Example of a verification required error with type method

### Challenge
``` JSON
HTTP 400 Bad Request
{
  "status": 400,
  "type": "malformed content",
  "content": {
    "property": "card",
    "type": "Card.Creatable | Card.Token",
    "description": "verification required",
    "details": {
      "visible": true,
      "method": "POST",
      "url": "https://acs.sandbox.3dsecure.io/browser/challenge/manual",
      "data": {
        "type": "challenge",
        "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
        "acsTransID": "13521d57-581c-44d0-b321-40c58a9cf74e",
        "messageVersion": "2.2.0",
        "messageType": "CReq",
        "challengeWindowSize": "01"
      }
    }
  },
  "error": "verification required"
}
```
Example of a verification required error with type challenge
