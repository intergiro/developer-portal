# Cards as a Service

<img :src="$withBase('/assets/img/card-programmes-splash.jpg')" alt="Card programmes">

We provide, processing and banking, so you can create a programme with a single contract:
- Issue virtual and physical cards
- Real-time funding
- PCI-certified APIs
- Dynamic spend controls
- Live data feeds

## PCI compliance

Using our PCI-compliant API allows you to develop your custom solutions without waiting for certification. By connecting to our API, you avoid handling unnecessary personal data while the data is hosted on secure, PCI-compliant servers and encrypted for transmission. We’re fully PCI compliant and regulated in Sweden as an EMI.

<img :src="$withBase('/assets/img/integrate/card-programmes/pci-redirect.png')" alt="PCI redirect flow">

In order to bring your PCI obligations to the minimum, we rely on hosted pages that the user is redirected to, which helps us practically eliminate the risks associated with handling sensitive card information on your end.

## Order card

Every card is linked to an account, so make sure to get an account in place first.

Example virtual card order request:

```{1}
POST /v3/cards

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "individual_id": "bd4af0ff-0a72-4e09-b247-c6d8c2391496",
  "account_id": "3c4c7a7b-2266-47a5-b774-d6d1a299e85c",
  "display_name": "Expenses",
  "exp_month": "12",
  "exp_year": "2024",
  "type": "virtual"
}
```

Response:

```{1}
HTTP 200 OK

{
  "id": "3cb11f6a-0da4-486c-9745-6f6c6c05d26d",
  "display_name": "Expenses",
  "type": "virtual",
  "brand": "visa",
  "region": "europe",
  "exp_month": "12",
  "exp_year": "2024",
  "last4": "3770",
  "currency": "EUR",
  "account_id": "3c4c7a7b-2266-47a5-b774-d6d1a299e85c",
  "individual_id": "bd4af0ff-0a72-4e09-b247-c6d8c2391496",
  "status": "not_activated"
}
```

## Activate card

Physical cards require activation in order to be used.

Example activate card request:

```{1}
PATCH /v3/cards/a1c5ad61-5506-4c90-ab93-11221af2abdc

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "return_url": "https://example.com/activate_card_cb"
}
```

Response

```{1,4}
HTTP 200 OK

{
  "redirect_url": "https://integrate.intergiro.com/activate_card?...",
  "expires_at": "2021-02-08T14:09:15.000Z"
}
```

Next you'll need to send the end user to the url from the response, where they will be able to set up their initial PIN and activate the card.

<img :src="$withBase('/assets/img/integrate/card-programmes/activate-card-redirect.png')" alt="Activate card flow">

## Freeze / unfreeze card

You can report the card stolen or lost as well as put it on a temporary or permanent block by sending a card update request. 

Example freeze card request:

```{1,8}
PATCH /v3/cards/a1c5ad61-5506-4c90-ab93-11221af2abdc

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "status": "frozen"
}
```

In order to make a card active again, use the same request with `status: active`:

```{1,8}
PATCH /v3/cards/a1c5ad61-5506-4c90-ab93-11221af2abdc

Content-Type: application/json
Authorization: Bearer <access_token>

{
  "status": "active"
}
```

The following actions are terminating, meaning there is no way to use the card again:
- `block` - permanent block
- `stolen` - report card as stolen
- `lost` - report card as lost


## Card limits and controls
