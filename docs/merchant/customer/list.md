# List
To list all Customers, just make a simple GET request with private authorization.

#### Request
```json
GET /v1/customer

Merchant: merchant.intergiro.com
Authentication: Bearer <private.api.key> 
```

#### Response
A successful response will be an Array of [`Customer`](./reference.html#customer) objects.
```json
[
    {
        "id": "<PayFunc customer identifier>",
        "number": "<your customer identifier>",
        "method": "<Customer Method Array>",
        "subscription": "<Customer subscription Array>",
        "contact": {
            "type": "organisation" or "person",
            "id": "<your contact Id>",
            "name": "<contact name>",
            "address": {
                "street": "<street name>",
                "zip_code": "<zip code>",
                "city": "<city name>",
                "country_code": "<alpha 2 country code according to ISO 3166>"
            },
            "email": "<contact email>",
            "phone": "<contact phone number>"
        },
        "schedule": "<customer payment schedule>"
    }
]
```