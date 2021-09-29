# Strong Customer Authentication

New PSR2 RTS requirements have been rolled out across Europe to protect online payments. At Intergiro we proudly welcome the new regulation and endorse the mission to give users control over their payment experience and security online.

Now, some user actions require their explicit consent and authorisation:
  - KYC & Onboarding
  - accessing individual's payment history
  - external payments
  - accessing sensitive card details

<img :src="$withBase('/assets/img/integrate/getting-started/sca-tooltip.png')" alt="Business banking">

## Enrollment

As part of the [KYC & Onboarding process](/3d/onboarding) we take care of the user registration, i.e. the user creates a passcode, confirms their phone number and enrolls their biometry device. This is fully transparent and doesn't require you to store any user secrets on your end.

When it comes to Bank payments and Cards, however, the users will have to provide their explicit authorisation directly to Intergiro by means of a URL redirect.

## Consent API

Consent API is designed to help the end user provide explicit consent, authorise payments and access sensitive card details.

A pending Consent request object is returned as a `412 Precondition Failed` HTTP response to an action:

```{1,5}
HTTP 412 Precondition Failed

{
  "consent": {
    "id": "e1dd9cd7-1650-42b3-8496-a970fb40ed3f",
    "status": "pending"
    "scope": [
      "make_payment"
    ],
    "expires_at": "2021-05-11T09:55:17.000Z"
  }
}
```

Here you can see what kind of consent is required, its status and when it expires. Once the time is right to prompt the user, grab that `consent.id` and make a request to `POST /consents/<consent_id>` in order to initiate the consent process:

```{1}
POST /v3/consents/e1dd9cd7-1650-42b3-8496-a970fb40ed3f

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "return_url": "https://example.com/payment_finished"
}
```

The response will contain a Consent Method with instructions on how to complete the process:

```{1,5}
HTTP 200 OK

{
  "method": {
    "redirect_url": "https://integrate.intergiro.com/sca/consent?token=eyJjb...",
    "expires_at": "2021-05-11T09:55:17.000Z"
  }
}
```

Now you'll need to open the browser and send the user to the `redirect_url` received.

::: tip
Consider using iOS [`SFSafariViewController`](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) and Android [Chrome Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs/overview/) in-app or standalone browser experience to take advantage of a more streamlined process using native Biometry support on mobile.
:::

Once the user finishes, they will be redirected back to the `return_url` provided.
