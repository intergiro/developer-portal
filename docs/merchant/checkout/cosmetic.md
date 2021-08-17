# Cosmetics
Intergiro Checkout can be stylized in many different ways to enable you to fit it to your theme.
The cosmetic parameter should be set to a JSON object or stringified JSON as described below. Cosmetics are optional and can be used in parts.
``` jsx
cosmetic={{
	header: { background: "134, 146, 166", color: "0, 32, 84" },
	text: { background: "212, 213, 214", color: "0, 32, 84" },
	submit: { background: "112, 145, 124", color: "212, 213, 214" },
	border: { color: "134, 146, 166" },
	font_family: "Ubuntu",
	danger_color: "131, 21, 3",
}}
```
``` json
cosmetic='{
	"header": { "background": "134, 146, 166", "color": "0, 32, 84" },
	"text": { "background": "212, 213, 214", "color": "0, 32, 84" },
	"submit": { "background": "112, 145, 124", "color": "212, 213, 214" },
	"border": { "color": "134, 146, 166" },
	"font_family": "Ubuntu",
	"danger_color": "131, 21, 3"}'
```
## Fonts
The font_family field can consist of several fonts and are separated by comma. The `text.color` property changes the color of the text.
``` tsx
cosmetic={{ 
	text: { color: "0, 32, 84" },
	font_family: "Arial, Verdana",
}}
```

## Borders
The border color inside the card input fields can be changed through the `border.color` parameter.


``` tsx
cosmetic={{ border: { color: "134, 146, 166" } }}
```

## Colors
Colors should be specified in rgb values.

- The text color is changed through the `"text.color"` property.
- The background color of the card input fields is changed through the `"text.background"` property.
- The border color of the card input fields is changed through the `"border.color"` property.
- The color of the error symbol is changed through the `"danger_color"` property.

 ``` tsx
cosmetic={{ danger_color: "222, 71, 71" }}
```

## Example 1

<img :src="$withBase('/assets/img/merchant/checkout/greyBlueExample.png')" alt="Row">

``` json
cosmetic='{
	"header": { "background": "134, 146, 166", "color": "0, 32, 84" },
	"text": { "background": "212, 213, 214", "color": "0, 32, 84" },
	"submit": { "background": "112, 145, 124", "color": "212, 213, 214" },
	"border": { "color": "134, 146, 166" },
	"font_family": "Ubuntu",
	"danger_color": "131, 21, 3"}'
```

## Example 2

<img :src="$withBase('/assets/img/merchant/checkout/greenBlackExample.png')" alt="Row">

``` json
cosmetic='{
		"header": { "background": "0, 109, 119", "color": "204, 226, 228" },
		"text": { "background": "245, 248, 250", "color": " 51, 71, 91" },
		"submit": { "background": "50, 51, 50", "color": "255, 255, 255" },
		"border": { "color": "134, 146, 166" },
		"font_family": "Ubuntu",
		"danger_color": "255, 0, 0"}'
```