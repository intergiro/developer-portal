# Payment Gateway Overview

| Service                                                            | UI                                                           | API                                    |
|--------------------------------------------------------------------|--------------------------------------------------------------|----------------------------------------|
| Creating orders for one off relations with your users.             | [Checkout](../../checkout/embed.html)                        | [Order](../../order/create.html)       |
| Registering payment options for ongoing relations with your users. | [Customer Registration](../../customer/registration-ui.html) | [Customer](../../customer/create.html) |
| Tokenizing sensitive card information to minimize your PCI scope.  | [Card Input](../../card-input/embed.html)                    | [Card](../../card-api/create.html)     |

## [Creating orders UI](../../checkout/embed.html)
Checkout is used for creating orders and authorize payments associated with orders for one off relations. 
Take a look at [Checkout UI](../../checkout/embed.html) for code examples and a more detailed description, where information about how to customize the component is available under [Checkout Cosmetics](../../checkout/cosmetics.html) and [Checkout Features](../../checkout/features.html).

## [Registering Customers UI](../../customer/registration-ui.html) 
The [Intergiro Customer Registration UI](../../customer/registration-ui.html) component lets your users register contact and card information that gets authorized for future payments, such as subscriptions or other recurring payments.

## Minimize PCI scope
If you need a separate card tokenization there is an UI solution in addition to an API solution.

::: warning
If you handle any card data you are expected to provide us with a valid PCI AoC, indicating you are allowed to store, process and manage card data. If you do not wish to handle any card data please use [Intergiro Checkout UI](../../checkout/embed.html) to create orders or [Card Input UI](../../card-input/embed.html) to tokenize cards.
:::
### [Card Input UI](../../card-input/embed.html)
Intergiro Card Input is an embeddable component for card tokenization that can be integrated as a normal html component, that can be customized if desired trough [styling](../../card-input/style.html). 

Card Input is also capable of doing 3D Secure, more information and code examples can be found at [Card Input Verification](../../card-input/verification.html). 

For more information and code example please read more at [Intergiro Card Input](../../card-input/embed.html) 

### [Card API](../../card-api/create.html)
[Card API](../../card-api/create.html) can create card tokens and handle 3D Secure if desired. 


## API only (S2S)

### Card API 

- [Card tokenization](../../card-api/create.html)
- [3D Secure handling](../../card-api/verification.html)
### Order API

- [Creating orders](../../order/create.html)
- [Changing orders](../../order/change.html)

### Customer API

- [Creating customers](../../customer/create.html) 
- [Subscriptions](../../customer/subscriptions.html)
- [Recurring payments](../../customer/create-order.html)


## 3D Secure
There are three ways to perform 3D Secure when using the PSP API.

### [Checkout](../../checkout/embed.html)
3D Secure is built into the [Intergiro Checkout UI](../../checkout/embed.html) and will trigger 3D Secure authentication when authentication is needed.

### [Verification UI](../../card-input/verification.html)

When using [Card Input UI](../../card-input/index.html) follow this [Verification Guide](../../card-input/verification.html).

### [Verification API](../../card-api/verification.html)
When using the [Order API](../../order/create.html) or the [Customer API](../../customer/create.html), follow the [Verification guide](../../card-api/verification.html) to perform 3D Secure.



## Authentication

Our API uses three different API-keys in forms of JWTs for authentication:
- public
- private 
- customer

### Public API-keys

Public API-keys are used to create new orders, new customers and new card tokens. 
The public API-key is safe to use in the browser of your consumers.

### Private API-keys

Private API-keys should be protected and only be used on systems you trust. 
Private API-keys can among other things be used to list all your orders and charge, cancel and refund orders.

### Customer API-keys

Customer API-keys are unique to a each [customer](../../customer/reference.html). 
It enable your users to update their address, payment methods and also to view their order history.
