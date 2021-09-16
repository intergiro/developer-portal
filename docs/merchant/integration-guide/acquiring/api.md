# Acquiring APIs

An acquirer processes card payments on behalf of the merchant and the PSP.


## Authorization

An authorization is the reservation of a specified amount of money on a cardholder's credit/debit card. 
An authorization often require a verification. 
A verification is usually needed if the amount is large enough or when creating an initial recurring authorization.
A verification is a Strong Customer Authentication (SCA) supported by the issuing bank. 

The [Authorization API](../../authorization/create.html#create) let's you create authorizations for single time payments as well as recurring payments.
After creating an authorization, the authorization can be [captured](../../authorization/captute.html), [canceled](../../authorization/cancel.html) or [refunded](../../authorization/refund.html).

### Minimize PCI scope

If you want to avoid handling card information to minimize the PCI scope of your system, you can use the [Card Input UI](../../card-input/embed.html#embeddable-component).
The Intergiro Card Input UI can perform 3D-Secure by using the Verification API ([Read more here](../../card-input/verification.html#verification)).
Intergiro Card Input UI can also be [customized](../../card-input/style.html#styling) to better suit the style of a given website.

### Verification 

You can perform your own custom 3D-Secure with the [Authorization API](../../authorization/create.html#create).
Alternatively you can use the [Verification API](../../verification/create.html#create) together with either the [Card API](../../card-api/create.html#create) or the [Card Input UI](../../card-input/embed.html#embeddable-component).

## Settlement

To see settlements from previous authorizations the [Settlement API](../../settlement/list.html#list) can list the settlements.
