# Strong Customer Authentication

New PSR2 RTS requirements have been rolled out across Europe to protect online payments. At Intergiro we proudly welcome the new regulation and endorse the mission to give users control over their payment experience and security online.

Now, some actions can not be fully automated and requires explicit user actions to be completed. For example due to regulations it is not possible to create and send payments without user involvement. It is mandatory to apply sca(`Secure Customer Authentication`) to send payment(s). To send payment(s) via 2D API the first step is to send POST /v1/bulk_payments with one or more payment details and source account id. After payment(s) are created a user with proper permissions should navigate to Intergiro `/portal/payments/api-payments` page and explicitly approve payments. This will require SCA to be applied.

<img :src="$withBase('/assets/img/integrate/getting-started/sca-tooltip.png')" alt="Business banking">

## Send payment 2D API

As part of the send payment(s) process first, 2D API `POST /v1/bulk_payments` endpoint should be used to create payment(s) having status of pending approval. Created payments can be found on Intergiro `/portal/payments/api-payments` page. As a second and final step portal users with appropriate permissions should approve/reject list of payments created via 2D API followed by mandatory SCA step.
