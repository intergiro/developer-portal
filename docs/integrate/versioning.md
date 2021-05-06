# Versioning

We use Semantic Versioning to evolve our APIs and adapt quickly to customer needs. For that to work we rely on customers making sure they're always running the latest version of the API and if not, take some time to upgrade.

`/v3/individuals/:id/onboard`

We put major API version in the URL to emphasize it is a breaking change. It means the change might be impacting your integration one way or another and it's worth looking at it closer.

## Breaking changes

Whether it is due to changes in the regulation, an improvement or simply we're releasing a new product, the immediate effect on the API can be either breaking or not. Here are a few examples.

**We consider breaking changes:**
 - Request body or query parameter contract becomes more strict. For example a new required parameter added.
 - Response contract changes. This also includes changing/removing optional parameters.
 - Endpoint URL changes.

**What changes we don't consider breaking:**
 - New optional request body or query parameter is added.
 - A new optional or required parameter is added to response contract.
 - New endpoint is introduced.
