# Authentication

All Intergiro API endpoints are protected and require a valid JWT **access token** supplied with each request.

Example API request using `access_token`:

```{1,4}
GET /v1/transactions

Content-Type: application/json
Authorization: Bearer <access_token>
```

## Session

API keys are used for logging in and are provided separately. Each API key has specific permissions assigned, which can only be specified when creating a new API key. Only users having a set of API key manage permissions can create, renew, list or delete API keys. 

A key does not have an identity. It acts on behalf of a company. Thus, it's very important to make sure it is properly secured. In case of any issues or questions with API keys, it is highly recommended to contact the Integration manager.

Session API endpoints allow you to obtain and subsequently renew access tokens.

### Logging in

Example Login request:

```{1,6}
POST /v1/auth/login

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

Whenever an API call returns a `401 Unauthorized` response, it means the session has expired and the access token must be renewed. This can be achieved by calling `POST /auth/refresh` endpoint.

Example refresh access token request:

```{1,6}
POST /v1/auth/refresh

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

Whether it's the first time logging in or refreshing an existing expired session, always keep the latest `refresh_token` for the next renewal.

::: warning
Please be aware that a token refresh attempt should be performed only after the access token has expired. Attempts to prematurely refresh a token will result in an error.
:::
