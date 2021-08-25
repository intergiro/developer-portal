# Update Contact Information

To update the contact information associated to a customer make a `PUT` request to the following endpoint. 
A request to this endpoint can either be made with a `"private"` authorization key or with the `"customer"` authorization key. 
With the `"customer"` authorization key you have to specify `"me"` as the customer id, for `"private"` authorization specify the customer id of the customer you wish to update.
The body of the request should be a valid [`Contact`](../common/reference.html#contact) data type.
#### Request
```{1} JSON
PUT /v1/customer/:customer_id/contact

Host: merchant.intergiro.com
Content-Type: applicaiton/json
Authentication: Bearer <private.api.key> | Bearer <customer.api.key>

{
    "type": "organisation" or "person",
    "identity_number": "<identity number>",
    "id": "<your contact Id>",
    "name": "<contact name>",
    "address": {
        "street": "<street name>",
        "zip_code": "<zip code>",
        "city": "<city name>",
        "country_code": "<alpha2 country code according to ISO 3166>"
    },
    "email": "<contact email>",
    "phone": "<contact phone number>"
}
```
#### Response
A successful response will equal the input.
