# Acquiring overview

An acquirer processes card payments on behalf of the merchant and the PSP.


## Authorization

An authorization is the reservation of a specified amount of money on a cardholder's credit/debit card. 
An authorization often require a verification. 
A verification is usually needed if the amount is large enough or when creating an initial recurring authorization.
A verification is a Strong Customer Authentication (SCA) supported by the issuing bank. 

The [Authorization API](../../authorization/create.html#create) let's you create authorizations for single time payments as well as recurring payments.
After creating an authorization, the authorization can be [captured](../../authorization/capture.html), [canceled](../../authorization/cancel.html) or [refunded](../../authorization/refund.html).

### Minimize PCI scope

If you want to avoid handling card information to minimize the PCI scope of your system, you can use the [Card Input UI](../../card-input/embed.html#embeddable-component).
The Intergiro Card Input UI can perform 3D-Secure by using the 3D-Secure API. ([Read more here](../../card-input/verification.html#verification)).
Intergiro Card Input UI can also be [customized](../../card-input/style.html#styling) to better suit the style of a given website.

## 3D-Secure
There are three different methods to perform 3D Secure. 
- If you want to perform 3D Secure in one automated flow, follow the steps in the [Automated](../../3d-secure/automated.html) section. 
- If you want control of what happens between the steps in the 3D cycle, follow the steps in the [Interactive](../../3d-secure/interactive.html) section. 
- If you want full control of the 3D flow, follow the steps in the [Controlled](../../3d-secure/controlled.html) section.
- If you want perform 3Ds using an external 3Ds service, follow the steps in the [External](../../3d-secure/external.html)  section.


## Settlement

To see settlements from previous authorizations the [Settlement API](../../settlement/list.html#list) can list the settlements.


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

Customer API-keys are unique to a each [customer](../customer/reference.html). 
It enable your users to update their address, payment methods and also to view their order history.
