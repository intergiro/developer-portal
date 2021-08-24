# Payment Methods
To add payment methods after customer creation, refer the contact to the [`Customer page`](../customer-page.html#customer-page), implement [`Customer Registration`](./customer-registration.html#customer-registration) for existing customers or use the customer methods endpoint to [`payment methods`](./reference.html#customermethod) with already tokenized card information.

A request to this endpoint can either be made with a `"private"` authorization key or with the `"customer"` authorization key. 
With the `"customer"` authorization key you have to specify `"me"` as the customer id, for `"private"` authorization specify the customer id of the customer you wish to update.

#### Request
```{1}
POST /v1/customer/:customer_id/method

Host: merchant.intergiro.com
Authentication: Bearer <public.api.key> | Bearer <private.api.key>

{
    "type": "token",
    "card":"<tokenized card information>",
}
```
