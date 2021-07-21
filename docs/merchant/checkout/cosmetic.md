# Cosmetics
Intergiro Checkout can be stylized in many different ways to enable you to fit it to your theme.
The cosmetic parameter should be set to a JSON object or stringified JSON as described below. Cosmetics are optional and can be used in parts.
``` tsx
cosmetic={{
	header: { background: "134, 146, 166", color: "0, 32, 84" },
	text: { background: "212, 213, 214", color: "0, 32, 84" },
	submit: { background: "112, 145, 124", color: "212, 213, 214" },
	border: { color: "134, 146, 166" },
	fontFamily: "Ubuntu",
	dangerColor: "131, 21, 3",
}}
```
``` tsx
cosmetic={JSON.stringify({
	header: { background: "134, 146, 166", color: "0, 32, 84" },
	text: { background: "212, 213, 214", color: "0, 32, 84" },
	submit: { background: "112, 145, 124", color: "212, 213, 214" },
	border: { color: "134, 146, 166" },
	fontFamily: "Ubuntu",
	dangerColor: "131, 21, 3",
})}
```
## Fonts
The fontFamily field can consist of several fonts and are separated by comma. The `text.color` property changes the color of the text.
``` tsx
cosmetic={{ 
	text: {color: "0, 32, 84"},
	fontFamily: "Arial, Verdana",
}}
```

## Borders
The border color inside the card input fields can be changed through the `border.color` parameter.


``` tsx
cosmetic={border: color: "134, 146, 166"}
```

## Colors
Colors should be specified in rgb values.

- The text color is changed through the `"text.color"` property.
- The background color of the card input fields is changed through the `"text.background"` property.
- The border color of the card input fields is changed through the `"border.color"` property.
- The color of the error symbol is changed through the `"dangerColor"` property.

 ``` tsx
cosmetic={dangerColor: "222, 71, 71"}
```

## Example

<img :src="$withBase('/assets/img/merchant/checkout/greyBlueExample.png')" alt="Row">

``` tsx
cosmetic={{
	header: { background: "134, 146, 166", color: "0, 32, 84" },
	text: { background: "212, 213, 214", color: "0, 32, 84" },
	submit: { background: "112, 145, 124", color: "212, 213, 214" },
	border: { color: "134, 146, 166" },
	fontFamily: "Ubuntu",
	dangerColor: "131, 21, 3",
}}
```