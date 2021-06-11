# How to write a Rule 

A Rule is a string that can be parsed and divided into the folloing parts.

`action` `event` if `condition`

- `action` is as of yet limited to `"reject"`.
- `event` is can be set as `"capture"`, `"refund"` and ...
- `condition` is the more complicated part of the rule.

e.g.:

`"reject capture if merchant.captured > 250000"`



# Rules object
A Rules object is a `Record<string, Rule[]>` Where one key must be `"master"`