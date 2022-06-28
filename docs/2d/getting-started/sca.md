
# Strong Customer Authentication

At Intergiro we proudly support security measures  and endorse the mission to give users control over their payment experience and security online.

Now, some actions can not be fully automated and requires explicit user actions to be completed. For example it is not possible to create and send payments without user involvement.
To approve or reject payments, the user will be asked to go through SCA (`Secure Customer Authentication`) to send payments. To send payments via 2d API, the first step is to send POST /v1/bulk_payments with one or more payment details and source account id. After a payment is created, a user with proper permissions should navigate to the Intergiro `/portal/payments/api-payments` page and explicitly approve payments. This will require applying SCA.

## Send payment(s) via 2d API

As part of the send payment(s) process first, 2d API `POST /v1/bulk_payments` endpoint should be used to create payment(s) having status of pending approval. Created payments can be found on Intergiro `/portal/payments/api-payments` page. As a second and final step portal users with appropriate permissions should approve/reject list of payments created via 2d API.
