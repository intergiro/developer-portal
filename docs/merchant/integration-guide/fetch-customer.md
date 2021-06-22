# Fetch Customer Information
To fetch the customer information a request to this endpoint can either be made with a "private" authorization key or with the "customer" authorization key. 
With the "customer" authorization key you have to specify "me" as the customer id, for "private" authorization specify the customer id of the customer you wish to fetch.

#### Request
```json
GET /v1/customer/<customerId>

Host: merchant.intergiro.com
Authentication: Bearer <private.api.key> | Bearer <customer.api.key>
```

#### Response
```json
{
    "id": "<PayFunc customer identifier>",
    "number": "<your customer identifier>",
    "method": "<Customer Method Array>",
    "subscription": "<Customer subscription Array>",
    "contact": {
        "type": "organisation" or "person",
        "identityNumber": "<identity number>",
        "id": "<your contact Id>",
        "name": "<contact name>",
        "address": {
            "street": "<street name>",
            "zipCode": "<zip code>",
            "city": "<city name>",
            "countryCode": "<alpha 2 country code according to ISO 3166>"
        },
        "email": "<contact email>",
        "phone": "<contact phone number>"
    },
}
```