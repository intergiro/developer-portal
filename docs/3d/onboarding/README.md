# Onboarding

<img :src="$withBase('/assets/img/onboarding.jpg')" alt="Business banking">

Individuals represent end users and it's important to have them properly registered before they can use accounts or cards. This process is called onboarding.

## Create individual

The first step is to provide some basic personal information about an the individual.

Example create individual request:

``` {1}
POST /v3/individuals

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "first_name": "John",
  "last_name": "de Mayor",
  "email": "m6dreey@goes.es",
  "phone_number": "46627211111",
  "date_of_birth": "1991-12-06",
  "address": {
  	"country_code": "SE",
  	"street1": "Mälarö torg 2",
  	"city": "Ekerö",
  	"region": "Ekerö",
  	"postal_code": "178 30"
  }
}
```

Address is optional.

Once created, you can query an individual by calling `GET /v3/individuals/:id`.


## Initiate onboarding

Onboarding process involves redirecting the end user to an URL, where we collect all necessary information required to open an account.

### Obtaining onboarding form URL

First you'll need to initiate individual onboarding to get the `redirect_url`:

``` {1,8}
POST /v3/individuals/9c017aec-c952-4713-aa10-11708cb0d11a/onboard

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "return_url": "https://example.com/onboarding_callback"
}
```

Response:

``` {1,4}
HTTP 200 OK

{
  "redirect_url": "https://integrate.intergiro.com/onboarding/...",
  "expires_at": "2021-02-08T14:09:15.000Z"
}
```

### Sending the user to the form

Now you'll need to open the browser and send the user to the `redirect_url` provided earlier.

::: tip
Consider using iOS [`SFSafariViewController`](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) and Android [Chrome Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs/overview/) in-app or standalone browser experience to take advantage of a more streamlined process using native Biometry support on mobile.
:::

Once initiated, wait for `IndividualOnboardingDataProvided` webhook event that will be delivered as soon as the user successfully completes the form. That will mean the ball is on Intergiro side as we'll be receiving the data for approval.

## Getting notified about the result

### Data provided

Once the user submits all neccessary information a webhook is sent and individual's status changes to `onboarding_data_provided`.

Example `IndividualOnboardingDataProvided` event webhook payload:

```
{
  "id": "d08fb891-40be-4579-90c4-92c648b973f0",
  "name": "IndividualOnboardingDataProvided",
  "created_at": "2021-02-08T14:09:15.000Z"
}
```

Use the `id` from the webhook to get more details about the event.

Example `IndividualOnboardingDataProvided` event payload:

``` {1}
GET /v3/events/d08fb891-40be-4579-90c4-92c648b973f0

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

``` {1}
HTTP 200 OK

{
  "id": "d08fb891-40be-4579-90c4-92c648b973f0",
  "name": "IndividualOnboardingDataProvided",
  "payload": {
  	"individual_id": "bd4af0ff-0a72-4e09-b247-c6d8c2391496"
  },
  "created_at": "2021-02-08T14:09:15.000Z"
}
```

::: warning
There may be cases when the user drops off without completing the form or doing something similar. For this reason it is recommended that you periodically check individuals who have stuck in `onboarding_requested` status, and send them to the onboarding form by calling `POST /individuals/:id/onboard` once again.
:::

### Onboarding complete

Eventually, depending on the outcome, you'll receive another webhook event saying the individual was successfully onboarded (`IndividualActivated` event) or rejected (`IndividualBlocked` event).

Example `IndividualActivated` event webhook payload:

```
{
  "id": "859edbaa-e110-482d-9054-1d187179aaee",
  "name": "IndividualActivated",
  "created_at": "2021-02-08T14:09:15.000Z"
}
```

Use the `id` from the webhook to get more details about the event.

Example `IndividualActivated` event payload:

``` {1}
GET /v3/events/859edbaa-e110-482d-9054-1d187179aaee

Content-Type: application/json
Authorization: Bearer <access_token>
```

Response:

``` {1}
HTTP 200 OK

{
  "id": "859edbaa-e110-482d-9054-1d187179aaee",
  "name": "IndividualActivated",
  "payload": {
  	"individual_id": "bd4af0ff-0a72-4e09-b247-c6d8c2391496"
  },
  "created_at": "2021-02-08T14:09:15.000Z"
}
```


## Troubleshooting

### The URL doesn't work in an `<iframe>`

We do not support iframes and you should not try to embed the url but rather send the user to it.

### We do not collect user's address, can we skip it?

Yes, `address` section of `POST /v3/individuals` request body is optional.
