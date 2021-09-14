# Authentication

Our API uses three different API-keys in forms of JWTs for authentication:
- public
- private 
- customer

## Public API-keys

Public API-keys are used to create new orders, new customers and new card tokens. 
The public API-key is safe to use in the browser of your consumers.

## Private API-keys

Private API-keys should be protected and only be used on systems you trust. 
Private API-keys can among other things be used to list all your orders and charge, cancel and refund orders.

## Customer API-keys

Customer API-keys are unique to a each [customer](../customer/reference.html). 
It enable your users to update their address, payment methods and also to view their order history.
