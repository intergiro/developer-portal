
# Security

At Intergiro, we proudly support strong security measures and endorse the mission to give users control over their payment experience and security online.

For this reason, some actions cannot be fully automated and require explicit user actions to be completed. For example, it is not possible to create and send payments without user involvement.

To approve or reject payments, the user will be asked to go through SCA (`Secure Customer Authentication`) to send payments. To send payments via 2d API, the first step is to send POST /v1/bulk_payments with one or more payment details and source account id. After a payment is created, a user with proper permissions should navigate to the Intergiro `/portal/payments/api-payments` page and explicitly approve payments. This will require applying SCA.

## Send payment(s) via 2d API

As part of the payment sending process, the 2d API `POST /v1/bulk_payments` endpoint should be used to create payment(s) that have a pending approval status. Created payments can then be found on the Intergiro `/portal/payments/api-payments` page. As a second and final step, portal users with appropriate permissions should approve/reject the list of payments created via 2d API.
