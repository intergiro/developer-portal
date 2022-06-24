# Authentication

All Intergiro API endpoints are protected and require a valid JWT **access token** supplied with each request.
qweqwe

Example API request using `access_token`:

```{1,4}
GET /v3/individuals

Content-Type: application/json
Authorization: Bearer <access_token>
```

## Session

API keys are used for logging in and are provided separately. Make sure to secure it properly and feel free to contact the Integration manager in case of questions.

Session API endpoints allow you to obtain and subsequently renew access tokens.

### Logging in

Example Login request:

```{1,6}
POST /v3/auth/login

Content-Type: application/json

{
  "api_key": "c5f90f4b-9d69-416a-8611-8a8c8d605c36"
}
```

Response:

```{1,4}
HTTP 200 OK

{
  "access_token": "eyJraWQiOiIxIiwiYWxnIjoi...",
  "refresh_token": "eyJzZXNzaW9uSWQiOiJmMjUa..."
}
```

Successful login request returns `access_token` and `refresh_token`.

::: warning
It is important that you keep `refresh_token` around, in case the session expires and you need to renew the access token.
Not relying on refresh tokens may trigger fraud prevention mechanisms that may lead to service disruption.
:::

### Refreshing token

Whenever an API call returns `401 Unauthorized` response, it means the session has expired and the access token must be renewed. This can be achieved by calling `POST /auth/refresh` endpoint.

Example refresh access token request:

```{1,6}
POST /v3/auth/refresh

Content-Type: application/json

{
  "refresh_token": "c5f90f4b-9d69-416a-8611-8a8c8d605c36"
}
```

Response

```{1,4}
HTTP 200 OK

{
  "access_token": "eyJraWQiOiIxIiwiYWxnIjoi...",
  "refresh_token": "eyJzZXNzaW9uSWQiOiJmMjUa..."
}
```

Whether it's the first time logging in or refreshing existing expired session, always keep the latest `refresh_token` for the next renewal.

::: warning
Please be aware that token refresh attempt should be performed only after access token has expired. Attempts to prematurely refresh token will end with an error.
:::
