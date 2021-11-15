# Create using API

We strongly recommend creating customers by integrating [Customer Registration](./registration-ui.html#registration-ui). 
However creating a customer can also be done via a call to the customer creation endpoint.
When integrating through the endpoint a customer can be initialized with [`Contact information`](../common/reference.html#contact) 
and a [`payment method`](./payment-methods.html) with a tokenized card. [Card Input](../card-input/embed.html) can be used to generate a card token.

#### Request
``` HTTP {1}
POST /v1/customer

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <public.api.key | private.api.key>

{
  "number": "customer-number-001",
  "method": [
    {
      "card": "<single-use.card.token>",
      "type": "token",
      "client": {
        "browser": {
          "color_depth": 24,
          "resolution": [
            2560,
            1440
          ],
          "java": false,
          "javascript": true,
          "locale": "en-GB",
          "timezone": -120,
          "parent": "<origin of current page url>"
        }
      }
    }
  ],
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  }
}
```

#### Response
``` JSON
{
  "id": "<Intergiro customer identifier>",
  "number": "<your customer number>",
  "contact": <contact information>,
  "method": [<payment method>],
  "status": "<Customer Status>",
  "total": <Customer Balance>,
  "schedule": "<customer payment schedule>",
  "currency": "<customer currency>"
}
```
``` JSON
{
  "id": "SMmmIYXgLFTgE8qW",
  "number": "customer-number-001",
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  },
  "method": [
    {
      "type": "card",
      "scheme": "<scheme>",
      "iin": "123456",
      "last4": "1234",
      "expires": [
        2,
        22
      ],
      "acquirer": "intergiro",
      "created": "1970-01-01T00:00:00.000Z",
      "token": "<card.token>"
    }
  ],
  "status": "active",
  "total": 0,
  "balance": [],
  "schedule": "monthly",
  "currency": "SEK"
}
```

## With initial Orders and Subscriptions


To add one or more [`Orders`](../order/reference.html#order) associated with the Customer, populate the `order` field with a list or a single [`Order.Creatable`](../order/reference.html#creatable) without the fields `"payment"` and `"customer"`. The `items` value of the `order`, or the first `order` in the list, is used to authorize the [`Customer Method`](./reference.html#customermethod). 


[Subscriptions](./reference.html#subscription) can be added in a similar way, by populating the Customer Creatable with [`Subscription Creatable`](./reference.html#subscription) or [`Subscription Creatable[]`](./reference.html#subscription).

The response will be a [`Customer`](./reference.html#customer-2) & { order: `tokenized.order` | `tokenized.order[]` } and can be validated 

#### Request
``` HTTP {1}
POST /v1/customer

Host: merchant.intergiro.com
Content-Type: application/json
Authentication: Bearer <public.api.key | private.api.key>

{
  "number": "customer-number-001",
  "method": [
    {
      "card": "<single-use.card.token>",
      "type": "token",
      "client": {
        "browser": {
          "color_depth": 24,
          "resolution": [
            2560,
            1440
          ],
          "java": false,
          "javascript": true,
          "locale": "en-GB",
          "timezone": -120,
          "parent": "<origin of current page url>"
        }
      }
    }
  ],
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  },
  "order": {
	  "items": 42,
	  "currency": "EUR",
  }
}
```

#### Response

``` JSON
{
  "id": "SMmmIYXgLFTgE8qW",
  "number": "customer-number-001",
  "contact": {
    "name": "Joe Smith",
    "email": "joe.smith@example.com"
  },
  "method": [
    {
      "type": "card",
      "scheme": "<scheme>",
      "iin": "123456",
      "last4": "1234",
      "expires": [
        2,
        22
      ],
      "acquirer": "intergiro",
      "created": "1970-01-01T00:00:00.000Z",
      "token": "<card.token>"
    }
  ],
  "status": "active",
  "total": 0,
  "balance": [],
  "schedule": "monthly",
  "currency": "SEK",
  "order": "ZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKd1lYbG1kVzVqSWl3aWFXRjBJam94TmpNMk5EWTBOREExTENKaGRXUWlPaUp3Y205a2RXTjBhVzl1SWl3aVkzSmxZWFJsWkNJNklqSXdNakV0TVRFdE1EbFVNVE02TWpZNk5EVXVNekE1V2lJc0ltbDBaVzF6SWpwYmV5SnVkVzFpWlhJaU9pSjBjekF3TVMxaUlpd2libUZ0WlNJNklrSmhjMmxqSUZRdGMyaHBjblFzSUdKc1lXTnJJaXdpY0hKcFkyVWlPakl3TUN3aWRtRjBJam8xTUN3aWNYVmhiblJwZEhraU9qVXNJbk4wWVhSMWN5STZXeUp2Y21SbGNtVmtJaXdpYjNKa1pYSmxaQ0lzSW05eVpHVnlaV1FpTENKdmNtUmxjbVZrSWl3aWIzSmtaWEpsWkNKZGZTeDdJbTUxYldKbGNpSTZJblJ6TURBeExYY2lMQ0p1WVcxbElqb2lRbUZ6YVdNZ1ZDMXphR2x5ZEN3Z2QyaHBkR1VpTENKd2NtbGpaU0k2TWpBd0xDSjJZWFFpT2pVd0xDSnhkV0Z1ZEdsMGVTSTZNVEFzSW5OMFlYUjFjeUk2V3lKdmNtUmxjbVZrSWl3aWIzSmtaWEpsWkNJc0ltOXlaR1Z5WldRaUxDSnZjbVJsY21Wa0lpd2liM0prWlhKbFpDSXNJbTl5WkdWeVpXUWlMQ0p2Y21SbGNtVmtJaXdpYjNKa1pYSmxaQ0lzSW05eVpHVnlaV1FpTENKdmNtUmxjbVZrSWwxOVhTd2lZM1Z5Y21WdVkza2lPaUpGVlZJaUxDSmpZWFJsWjI5eWVTSTZJbkIxY21Ob1lYTmxJaXdpYm5WdFltVnlJam9pWjJSU0xVdHdObTVrTXpVM0lpd2ljR0Y1YldWdWRDSTZleUowZVhCbElqb2lZMkZ5WkNJc0ltUmxjMk55YVhCMGIzSWlPaUlpTENKaGJXOTFiblFpT2pNM05UQXNJbU55WldGMFpXUWlPaUl5TURJeExURXhMVEE1VkRFek9qSTJPalEwTGpnME5Wb2lMQ0pqZFhKeVpXNWplU0k2SWtWVlVpSXNJbVY0Y0dseVpYTWlPbHN5TERJeVhTd2lhV2x1SWpvaU5ERXhNVEV4SWl3aWJHRnpkRFFpT2lJeE1URXhJaXdpYzJOb1pXMWxJam9pZG1sellTSXNJbk4wWVhSMWN5STZJbU55WldGMFpXUWlMQ0pqWVhKa0lqb2laWGxLYUdKSFkybFBhVXBUVlhwSk1VNXBTWE5KYmxJMVkwTkpOa2xyY0ZoV1EwbzVMbVY1U25Cak0wMXBUMmxLYWxsWVNtdEphWGRwWVZkR01FbHFiM2hPYWsweVRrUlpNRTVFUVhsTVEwcG9aRmRSYVU5cFNuZGpiVGxyWkZkT01HRlhPWFZKYVhkcFdsYzFha2xxYjJsTmFsbDFUVVp3ZVdGR1JtWlRla3BaVlRCT2IxUlhlRVJpYld0NFltcEtjMXA1TkRWYU1scFVUMGR3U0ZOVVkzUk1WV2MwV20wMWJrOVViSEphZWtaSFRYcFJNMDlHVG5aT2JrSlVXbXhXWVU1dVJuZGlXR2haVDFWYWJGa3lUakpaYkdkcFRFTktOR05JU1dsUGJITjVURVJKZVZoVGQybGtiVlo1U1dwd04wbHVValZqUjFWcFQybEthbUZIUm5OaVIxWjFXakpWYVV4RFNtdFpXRkpvU1dwd04wbHRSakZrUjJoc1ltNVNjRmt5UmpCaFZ6bDFTV3B2YVZsNlVrcE5TRnBvV1Zod1JWb3dNRFZhYlRrMFZWaGtOVlJFVlRWYVIwVnlZMFJDVWxCVFNYTkpiazR3V1ZoU01XTjVTVFpKYkd0cFRFTktlVnBYV214amJWWjFXVEpWYVU5dWMybGFSMng1V2xkT01HSXpTalZKYW05cFRWUkJkMWw2Ykd4UFZHdDBUbGRSTUUxcE1EQlBSR3hvVEZSbk5GbHFRWFJOZWxVelRucFJkMDVYV1RSTlZHdDRTV2wzYVdNeVZubGtiVlo1U1dwdmFWbDZZelZaVkVVMVRsZFpkRTFxWnpKWlV6QXdUMFJqTUV4VVp6TlpiVlYwVFcxT2FscFVhR3RaYlZKdFdXcFplVWx1TVRsbVdEQXVSVXRHZGpCcFdUWkdVWE52ZWsweldrdHZPWE5QYUhWYVRuVkZlVUoyZFRWSlQza3dMWFJ2UTBvMlUycGZTR3hSUzJvMUxYTmZjWEpNZDI5RFpqazRZMWhxUzI1NVJIVXhlbXRyT0dwSmRqVk5jMlJtVG01aWVqSXphV0o2VkRoaWNGUlRjSGMwY0hscFNVVXpaMWRxY1ZKb2NuUmZhbXh2ZGtjM2NYQkxSV2hYYjBwclRGOWhOMGgzT0dGeVZFUkpNMnhaVkRkRmEyWmlhWFZ1YkZKaU9GUnpVRXBUVURGU2J6RldUMjlCWDBGZk4xbGtWME5OYlc5c1ZIbFBUR0Y1TUZVdFNGZFdhbXc0V0dKS1gycHFNRkl0Y1hwTU5GTjRlRVJPVFcxMmJEWm5aakpmWmxkU2NrSnhhRkJ2VFZCTmRXVldiblpyV2taUGIzZEZWSGhRYWxWSVpEWlhhMU5vVkhWaFUxUXdZbUYxYVVGWlQzQnVkekl0ZEZFeE5tY3daVmcyUzFkME5HRkRjalJMYVVWRGJqWTNiRkphYWxsSlpqSTNWWHBMVEhSaE9HdE5OVXg1ZFdWTlpIcHBWVXRqTFV3MlltbEJJaXdpY21WbVpYSmxibU5sSWpvaVJUbHBkekpPUWxGVGVFdHJUbkJLY0NJc0luTmxjblpwWTJVaU9pSnBiblJsY21kcGNtOGlMQ0p6WTJobGJXVlNaV1psY21WdVkyVWlPaUpOUTBFeE5ESTJORFF4TVRBNUluMHNJbVYyWlc1MElqcGJleUowZVhCbElqb2liM0prWlhJaUxDSmtZWFJsSWpvaU1qQXlNUzB4TVMwd09WUXhNem95TmpvME5TNHpNRGxhSW4xZExDSnBaQ0k2SWxNNVpIVkpYMlY2Tm5ZM2J6UXhSM2NpTENKemRHRjBkWE1pT25zaWIzSmtaWEpsWkNJNk16YzFNSDE5LkZRaWM2c2hIcEsyYmVaLXNxek9SQ01XSjF5RmZNd3JUTjdSemNwaFgxSlMyU01mSFIteE5DSmF4MEtQb19MWG1WdnRHc3ZpSFIweS1hSnFxT2xTYmVtUWFGd0E4dkNMaFhoTUpVWUFpQlA1LUxWQ2h1UkNEbTlENGF1VkVSRUpnbFEtVldPb3VHaFpLT1dZWHhETWluRG5ZQm85NWs4Y0c0Z3NjSDdTaVp5QnYtS0czdGJJbmVGQlg0YWlUYXlNQXdRa2V3WE9HVjdIQ0xEa1EwMWpvZE9WdzJKOXBSbGxnNWlHNHptV1VIb3IzUzVpY193RnJRaWhMazRWREEzeTRJX2ZhaElRUjc4d2FaWE5MSW5UOGRVWTN5NkV3TGJRQzY5amt5bERWM1dGaEl1Qk5uSXIwTGhYMGlkd2RfRzBieXNpVUtzQ3AxOXVLQllxVmowUnBpQQ=="
}
```