# Styling
Intergiro Card Input can be stylized in many different ways to enable you to fit it to your theme.

- The layout lets you change the structure of the input fields.

- The cosmetic lets you change the color and shape of the inputs.
## Layout
The layout parameter is optional and has three possible values: standard, row or column.

### Standard 
```html
<intergiro-card-input api-key="<public.api.key>" layout="standard"></intergiro-card-input>
```
<img :src="$withBase('/assets/img/merchant/card-input/standard.png')" alt="Standard">

### Row

```html
<intergiro-card-input api-key="<public.api.key>" layout="standard"></intergiro-card-input>
```
<img :src="$withBase('/assets/img/merchant/card-input/row.png')" alt="Row">

### Column

```html
<intergiro-card-input api-key="<public.api.key>" layout="standard"></intergiro-card-input>
```

<img :src="$withBase('/assets/img/merchant/card-input/column.png')" alt="Column">

## Cosmetics
The cosmetic parameter should be set to a JSON or a stringified JSON as described below. Cosmetics are optional and can be used in parts.
``` html
<intergiro-card-input
  api-key="<public-api-key>"
  cosmetic='{ 
		"gap": "0.3em", 
		"text": {"background": "#e7e7e7", "color": "black"}, 
		"border": {"width": "1px", "radius": "5px", "color": "#000", "style": "solid"},
		"background": "white",
		"fontFamily": "Arial, Verdana",
		"dangerColor": "#de4747"
	}'>
</intergiro-card-input>
```
### Fonts
The fontFamily field can consist of several fonts and are separated by comma. The property `text.color` changes the text color.
``` html
<intergiro-card-input
  api-key="<public-api-key>"
  cosmetic='{ 
        "text": {"color": "#566c68"},
		"fontFamily": "Arial, Verdana",
	}'>
</intergiro-card-input>
```

### Borders
The borders inside the component can be changed with four parameters.
- `"width"` can be set to pixels (px) or em values. Changes the witdh of the borders.
- `"radius"` can be set to pixels (px) or em values. Changes the "roundness" of the corners.
- `"color"` can be set to rgb or hex vales. Changes the color of the borders.
- `"style"` can be set to `"dotted"`, `"dashed"`, `"solid"`, `"double"`, `"groove"`, `"ridge"`, `"inset"`, `"outset"`, `"none"` or `"hidden"`. Changes the border effect.

``` JSON
cosmetic='{"border": {"width": "1px", "radius": "5px", "color": "#000", "style": "solid"}}'
```
### Gap
To change the distance between the input fields the `"gap"` parameter can be used with either pixel (px) or em values.

```JSON
cosmetic='{"gap": "1em"}'
```

### Colors
Colors should be specified in rgb or hex values.

- The text color is changed through the `"text.color"` property.
- The background color is changed through the `"text.background"` property.
- The border color is changed through the `"border.color"` property.
- The color of the error symbol is changed through the `"dangerColor"` property.

 ``` JSON
cosmetic='{"dangerColor": "#de4747"}'
```
or 
 ``` JSON
cosmetic='{"dangerColor": "rgb(222, 71, 71)"}'
```

### Example 1
<img :src="$withBase('/assets/img/merchant/card-input/greenExample.png')" alt="Row">

``` html
<intergiro-card-input
    api-key="<public.api.key>"
    cosmetic='{ 
		"gap": "0.2em", 
		"text": {"background": "#ccfff0", "color": "#566c68"}, 
		"border": {"radius": "10px", "style": "none"},
		"fontFamily": "Ubuntu",
		"dangerColor": "#de4747"
	    }' 
    layout="row">
</intergiro-card-input>
```
### Example 2
<img :src="$withBase('/assets/img/merchant/card-input/yellowExample.png')" alt="Row">

```html 
<intergiro-card-input 
    api-key="<public.api.key>"
	cosmetic='{
	    "text": {"background": "#fff8d9", "color": "#202020"}, 
	    "border": {"width": ".5px", "radius": "0px", "color": "#e9d789", "style": "solid"},
	    "fontFamily": "Georgia",
	    "dangerColor": "#de4747"
	    }' 
	layout="standard">
</intergiro-card-input>
``` 
### Example 3

<img :src="$withBase('/assets/img/merchant/card-input/greyExample.png')" alt="Row">

```html
<intergiro-card-input
    api-key="<public.api.key>"
    cosmetic='{ 
        "gap": "0.3em", 
        "text": {"background": "#e7e7e7", "color": "black"}, 
        "border": {"width": "1px", "radius": "5px", "color": "#000", "style": "solid"},
        "fontFamily": "Arial, Verdana",
        "dangerColor": "#de4747"
    }' 
    layout="column">
</intergiro-card-input>
```