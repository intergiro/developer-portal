# Strong Customer Authentication

New PSR2 RTS requirements has been rolled out across Europe to protect online payments. At Intergiro we proudly welcome the new regulation with the mission to give the users control over their payment experience and security online.

It means some user actions require their explicit consent and authorisation:
  - KYC & Onboarding
  - accessing individual's payment history
  - external payments
  - accessing sensitive card details

As part of the [KYC & Onboarding process](/integrate/onboarding) we take care of the user registration, i.e. the user creates a passcode, confirms their phone number and enrolls their biometry device. This is fully transparent and doesn't require to store any user secrets on your end.

When it comes to Bank payments and Cards, however, the users will have to provide their explicit authorisation directly to Intergiro by means of a URL redirect.

## Consent API

Consent API is designed to help the end user provide explicit consent, authorise payments and access sensitive card details.



<img :src="$withBase('/assets/img/integrate/getting-started/sca-tooltip.png')" alt="Business banking">
