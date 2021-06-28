# Create Customer Page Login
To give access to the [`Customer Page`](../customer-page.html#customer-page) to the contact, you can send them a single use login Link via email. For this feature to be available, a constant email has to be set.
#### Request
To create such a login link send the following request to the customer page login. A request to this endpoint can either be made with a `"private"` authorization key or with the `"customer"` authorization key. With the `"customer"` authorization key you have to specify `"me"` as the customer id, for `"private"` authorization specify the customer id.
```{1}
POST /customer/<customerId>/link

Host: merchant.intergiro.com
Authentication: Bearer <private.api.key> | <customer.api.key> 
```
#### Response
A successful request made with customer authorization will give an empty response. 
Regardless of authorization, an email including the single use login link will be sent to the contact email. 
```json
{
    "url": "https://merchant.intergiro.com/customer/<customerId>/link/0987654321098765",
    "id": "0987654321098765",
    "created": "2020-12-08T09:19:42.835Z",
    "expires": "2020-12-11T09:19:42.835Z",
    "key": "abc.def.ghi",
    "contact": "m.exampleperson@example.net",
    "used": false
}
```