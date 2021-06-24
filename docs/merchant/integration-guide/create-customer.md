# Creating a Customer

We strongly recommend creating customers by integrating [Customer Registration](./customer-registration.html#customer-registration). 
However creating a customer can also be done via a call to the customer creation endpoint.
When integrating through the endpoint the customer can be initialized with [`Contact information`](../../integrate/acquiring/reference.html#contact) 
and [`payment methods`](./customer-methods.html#customer-methods) if you already have tokenized card information.

#### Request
``` {1}
POST https://merchant.intergiro.com/customer
Authentication: Bearer <public.api.key> or Bearer <private.api.key>

{
    "number": "<Customer identifier>",
    "contact":"<Contact Information>",
    "method": "<Customer Method Creatable array>"
}
```

#### Response
``` JSON
{
  "id": "<Intergiro customer identifier>",
  "number": "<your customer identifier>",
  "customer": "<contact Information>",
  "method": "<Customer Method array>",
  "status": "<Customer Status>",
  "schedule": "<customer payment schedule>",
  "currency": "<customer currency>"
}
```

<!-- Part of the reponse
"total": "<total customer balance>",
"balance": "<items paid with customer balance>", -->