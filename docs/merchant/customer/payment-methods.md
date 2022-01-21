# Payment Methods
Adding payment methods on an existing customer can be done using the [Customer Registration UI](./customer-registration.html#customer-registration) or by making an [api call](#create-payment-method) with already tokenized card information. A customer can also add a payment method through the [Customer App](./app.html).


### Create payment method
A request to this endpoint can either be made with a `private` authorization key or with the `customer` authorization key. 
When using `private` authorization, specify the customer id of the customer you wish to update in the url.
However, with the `customer` authorization key, specify `me` as the customer id.

The body should be a [Customer Method Creatable](./reference.html#creatable-2) including a valid [Card Token](../card-api/create.html). The response body will be a [Customer Method](./reference.html#customermethod-2) with type `card`.

#### Request
```{1} JSON
POST /v1/customer/:customer_id/method

Host: merchant.intergiro.com
Authentication: Bearer <public.api.key> | Bearer <private.api.key>

{
  "type": "token",
  "card": "<card token>",
  "client": {
    "browser": {
      "color_depth": 24,
      "resolution": [2560,1440],
      "java": false,
      "javascript": true,
      "locale": "sv-SE",
      "timezone": -60,
      "parent": "https://your.webshop.com"
    }
  }
}
```
See [browser](../common/reference.html#browser) section for information on how to get the browser information above.

#### Response
```json
{
  "type": "card",
  "scheme": "visa",
  "iin": "411111",
  "last4": "1111",
  "expires": [2, 22],
  "acquirer": "intergiro",
  "created": "2021-10-25T13:57:36.599Z",
  "token": "<card token>"
}
```

### Create Payment Method with an Order or a Subscription
Creating a new payment method and making a payment in one call can be done by adding an `order` field in the request. Put the [Customer Method Creatable](./reference.html#creatable-2) on the field `method`, and on the `order` field set one or a list of [`Order Creatables`](../order/reference.html#order) without the `payment` or `contact` field set.  3D Secure will be performed with the total amount of the order (the first order if multiple orders are being created).

[`Subscriptions`](./reference.html#subscription) can be added in a similar way, by populating the `subscrption` field to one or a list of [`Subscriptions Creatables`](./reference.html#subscription).

#### Request
``` {1} JSON
POST /v1/customer/:customer_id/method

Host: merchant.intergiro.com
Authentication: Bearer <public.api.key> | Bearer <private.api.key>

{
  "method": {
    "type": "token",
    "card": "<tokenized card information>",
    "client": {
      "browser": {
        "color_depth": 24,
        "resolution": [2560,1440],
        "java": false,
        "javascript": true,
        "locale": "sv-SE",
        "timezone": -60,
        "parent": "https://your.webshop.com"
      }
    }
  },
  "order": {
    "items": <number or item information or array of items objects>,
    "currency": "<currency of the transaction>"
  }
}
```
#### Response
``` json
{
    "method": {
      "type": "card",
      "scheme": "visa",
      "iin": "411111",
      "last4": "1111",
      "expires": [2, 22],
      "acquirer": "intergiro",
      "created": "2021-10-25T13:57:36.599Z",
      "token": "<card token>"
    },
    "order": "<signed order token>"
}
```

## Selecting Customer Method
To select a customer method to make an order with, the customer method first needs to be converted into a [card payment](../order/reference.html#card-payment). For this, the function `Customer.Method.toPayment()` should be used which can be accessed through the npm package <a target="_blank" href="https://www.npmjs.com/package/@payfunc/model">@payfunc/model</a>. 

``` js
const payment = await model.Customer.Method.toPayment({
			type: "card",
			scheme: "visa",
			iin: "411111",
			last4: "1111",
			expires: [2, 22],
			acquirer: "intergiro",
			created: "2021-10-25T13:57:36.599Z",
			token:
				"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTcwNDQ4LCJhdWQiOiJwcm9kdWN0aW9uIiwidHlwZSI6ImNhcmQiLCJjYXJkIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKallYSmtJaXdpYVdGMElqb3hOak0xTVRjd01qVTJMQ0poZFdRaU9pSndjbTlrZFdOMGFXOXVJaXdpWlc1aklqb2lNakV3TWk1aldGZGxTa1ZCTW0xd1NtSjZWbHAzWWpaM2RUZG5Ma1ZrTm1sbGRuRklia05xYW5ObE5teHJVVGxNZFU4MFJXVnpiMUIzYTJSNWFYcFNhV3hoYUhOMVoyOGlMQ0o0Y0hJaU9sc3lMREl5WFgwLkt4TC1aY2RMZXRoOHd1TDJyOVVUMHZaUlk3eS1KWHZUVE9MVkE4RE1VT0xXNWhTS1lBM1ZGNDFlcEVwOW1HSV9CZmxMMVIwRVFsQ2hnSW1wbk10N0pCMVVfOUk4U245NUVvVVVvTnd0dlJFcXVWdjBYQ1BESGJscUppeVhiSEYwTDlPR3d2Q3I0ZkN1QXNIUDZETlVrNjY5S25nTTdCMk1TRDVSaDA0cy1mLTdZRjdlaWtWenJYYW5PY3dnLXAzNVMtVjJGeVZITW5TTmJuRUhlQWJOM0Q4WUlrWVo4Rmp4ZEhZRldoRDF0WDh4OVA0WHVoYS0wY1l1Y3RFXy1KYkdraWNrWWUtTDdrM3ZlWWYtNExKZmJyZy1vTnJVSEF2NEdfVGg3dnE2em1ET3Q3Rjd4UWQ5R0NRWVNwWVYyVHkwWVJMYkQ5VjJvc19pUVBVaHN1UkRIQSIsInNjaGVtZSI6InZpc2EiLCJpaW4iOiI0MTExMTEiLCJsYXN0NCI6IjExMTEiLCJleHBpcmVzIjpbMiwyMl0sInJlZmVyZW5jZSI6Ik1DQTE1NTczNTEwMjUiLCJhY3F1aXJlciI6ImludGVyZ2lybyIsImNyZWF0ZWQiOiIyMDIxLTEwLTI1VDEzOjU3OjM2LjU5OVoifQ.oVsdkb_2sEYn6d5URHOyqosVhGaxX7snALekZVcSPa4DzHyWwu_fgwBWTd91qtX4NaYMHIbGBZ1odqe5VNlptjLok7TzI6cCnpuumEzNC236y575GTcbc6wr1IiwaYk_qCeLSMa86jahunYVe_td3J6mAf_zBX5WTnkQGyqJFeEaBJLhM9EcNwU8B_L28hkH316D1dhxndoYtc-9YHvJYfbx7O9pSgKxLN1uS3flhtST4G18ivexRkH_0-uBOuEe7WLFmaeXTRgPZwMc7hnMmL0KU7GxIzPvds81NGkOgEX6JImC1qsARIOL84EzjtxrIfGtUOUb7s1E68NADL_1Dw",
})
```

Create an [Order Creatable](../order/reference.html#creatable) object with the card payment populated on the `payment` field, and the customer ID populated on the `customer` field, and POST to the [order endpoint](../order/create.html).

Example of an [Order Creatable](../order/reference.html#creatable) with the selected payment method:
``` json
{
    "items": 20,
    "currency": "EUR",
    "customer": "TjbHYXXn6yEdhLgS",
    "payment": {
        "card": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNjM4NDUwMDAwLCJhdWQiOiJwcm9kdWN0aW9uIiwiZW5jIjoiMjEwMi5RcnkxSGYwTjlWNVlsdVlabllWeEZnLkhON25FdTVuSTBkanFUSEp0WVF5MGtWTHREZ25fM1N2X21YcWYzSzNzUm8iLCJ4cHIiOlsiMiIsIjIyIl19.A--M75_7_xXYwO3ryudSaP-GIuL_LGxFfBR_-jpu1anulg1OP6q2rHo0ybUJh3YU15eNuYuHT4CWs2twDCjAraD2_vQxVAVaiGZ4eV1oNIFNiJES_CuikM_6E37xfeZEs27smy9cEWeWb9F6u4ScqI6zQ1Xx8FVtN0O0O_DYDUlWMcdyrZjaVif3mira186z1gEHIA1CP_-BeLP2akBGR3vJS_H_8LqDMbm8rFASSpg3X9pKloBBAu6aWrFsxGN0w-tLA7lFrud94jdcT0tqSdPS61bVCkPoVGVxES1JA0DSW3PD8GfVWTDf_XdZtIO2OsJ0-PJ-5CSxrQ4m9HrkJw",
        "reference": "MCA1400001202",
        "category": "subsequent",
        "type": "card"
    }
}
```

## Remove or Reorder Payment Methods
To remove or prioritize in between payment methods for an already existing [`Customer`](./reference.html#customer), use the set payment method endpoint. Use the existing payment methods list of the customer you wish to modify and change the order of the payment methods and/or remove payment methods.

### Example of Remove or Reorder Payment Methods 
For a customer with three payment methods registered with the cards 400000...0000, 411111...1111 and 422222...2222 that wants to remove card 400000...0000 because it's expired and wants to prioritize card 422222...2222 over the remaining card the payment method list can be modified as follows and can be sent to the endpoint:

#### Before:

``` JSON
[
  {
    "type": "card",
    "scheme": "visa",
    "iin": "400000",
    "last4": "0000",
    "expires": [
      2,
      19
    ],
    "acquirer": "intergiro",
    "created": "2021-08-20T12:34:20.907Z",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
  },
  {
    "type": "card",
    "scheme": "visa",
    "iin": "411111",
    "last4": "1111",
    "expires": [
      2,
      22
    ],
    "acquirer": "intergiro",
    "created": "2021-08-20T12:34:20.907Z",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
  },
  {
    "type": "card",
    "scheme": "visa",
    "iin": "422222",
    "last4": "2222",
    "expires": [
      2,
      26
    ],
    "acquirer": "intergiro",
    "created": "2021-08-20T12:34:20.907Z",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
  }
]
```

#### Example Request:

```{1} JSON
PUT /v1/customer/:customer_id/methods

Host: merchant.intergiro.com
Authentication: Bearer <private.api.key> | Bearer <customer.api.key> 

[
  {
    "type": "card",
    "scheme": "visa",
    "iin": "422222",
    "last4": "2222",
    "expires": [
      2,
      26
    ],
    "acquirer": "intergiro",
    "created": "2021-08-20T12:34:20.907Z",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
  },
  {
    "type": "card",
    "scheme": "visa",
    "iin": "411111",
    "last4": "1111",
    "expires": [
      2,
      22
    ],
    "acquirer": "intergiro",
    "created": "2021-08-20T12:34:20.907Z",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
  }
]
```

#### Example Response:

``` JSON
{
  "number": "<your customer identifier>",
  "method": [
    {
      "type": "card",
      "scheme": "visa",
      "iin": "422222",
      "last4": "2222",
      "expires": [
        2,
        26
      ],
      "acquirer": "intergiro",
      "created": "2021-08-20T12:34:20.907Z",
      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
    },
    {
      "type": "card",
      "scheme": "visa",
      "iin": "411111",
      "last4": "1111",
      "expires": [
        2,
        22
      ],
      "acquirer": "intergiro",
      "created": "2021-08-20T12:34:20.907Z",
      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXlmdW5jIiwiaWF0IjoxNjM1MTY5ODU1LCJhdWQiOiJkZXZlbG9wbWVudCIsInR5cGUiOiJjYXJkIiwiY2FyZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSmpZWEprSWl3aWFXRjBJam94TmpJNU5EWXlPRFl3TENKaGRXUWlPaUprWlhabGJHOXdiV1Z1ZENJc0ltVnVZeUk2SWpJd01ERXVXRzlyZFZGV2F6WnlibmxZUlV0ME9GTjBUVVJ0UVM1aVJVSjZWM0ZSYm1sUE1XMTNhMTl6Wm5kSFprSk5jbFl3ZEVkaU1ERlFNRkp4V2xwak5EWkVWa2c0SWl3aWVIQnlJanBiTWl3eU1sMTkuQzdudExYVlFtUHF1eXgwTmh5QWxDOVhGNXVqczh0VWtjQktJVnZqNUVYcVlDWHQyS3BpNVVtZFBGTllVQ1lodXNLeG9EY2p2R1lwRzFRN0tSTzgtdmtxNzhYSHRIOGwtVU1TQncxMk1SY2t3ZHJuUFlxSEt6Y3F2b3hEcURlMjVEUEM3bllMV0NXejF2YlpwWUhQYTZWU08ta1JmcWxzMGwzM05fbTN2dkRrSV96VEszZktzYjhscnA5VGNIbFNSbmw5Nlg0b0tPSEd6akVUSjREaWJuOFZzYmpTOUR5SzVyQ1RmMjFOcThKZncwZG8xaDRxXzZNUW90NmNhV1JuUkphQUE2MkhEU2c2SXNMLTZ5ZThOeEtSUnpxSUpZVDdmU2RlQ3VHamJwZWVOclN1SGxSY2tpeUpDdkJicEVaeGZKeVp2Njk2YW5yTWdObVViRU9kSTNBIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMTExMSIsImxhc3Q0IjoiMTExMSIsImV4cGlyZXMiOlsyLDIyXSwicmVmZXJlbmNlIjoiTUNBMTQzNDIwMDgyMCIsImFjcXVpcmVyIjoiaW50ZXJnaXJvIiwiY3JlYXRlZCI6IjIwMjEtMDgtMjBUMTI6MzQ6MjAuOTA3WiJ9.c-kh0-kgIR9SsZnBKWoSerGiakYxfanNbimrg1FI7CCZNTtk_r7IKJBpxyku936s3Zcdc8hyJq6t7p_B4jlTlE-xn0Ezuz_D1jX9HfPIjpZCuptjKaw5dElN9iKgP0If75tw0YpQQcFcdN5kUY0g1_nNx1NmCnlCx1PIEtKBqZuZIvFkzz-dYye2dWYZNQA16RWv0IyNEQR-CXrA7oj0qvAU0FYNWd2m55Z7CXXq9eQY2TcIhXUcwK-VgDTyeHugZ2FJvJXNKUttTIkjLirbPZIfmUaIFibeEJp9m3Kopd6sb8YvAjSyti8asNM8LZiD62ryIj4jWi3NMT4lPH_vHQ"
    }
  ],
  "contact": {
    "name": "Example Customer",
    "email": "example.customer@email.com"
  },
  "status": "active",
  "total": 0,
  "balance": [],
  "currency": "SEK",
  "schedule": "monthly",
  "subscription": [
    {
      "start": "2021-08-20",
      "items": 7,
      "currency": "EUR",
      "schedule": "daily",
      "callback": "https://your.api.com/callback",
      "id": "12aB",
      "due": "2021-08-20"
    }
  ],
  "id": "1234567890123456"
}
```
