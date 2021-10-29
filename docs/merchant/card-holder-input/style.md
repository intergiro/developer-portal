# Styling

Intergiro Card Holder Input can be stylized in many different ways to enable you to fit it to your theme.

- The layout lets you change the structure of the input fields.

- The cosmetic lets you change the color and shape of the inputs.

## Layout

The layout parameter is optional and has three possible values: `"standard"`, `"row"` or `"column"`.

### Standard
The `"standard"` layout is default if no layout is specified.
``` html
<intergiro-card-holder-input api-key="<public.api.key>" layout="standard">
```

<img style="width: 60%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/card-holder-input/standard-card-holder.png')" alt="intergiro-card-holder-input with layout 'standard'">

### Column

``` html
<intergiro-card-holder-input api-key="<public.api.key>" layout="column">
```


<img style="width: 60%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/card-holder-input/column-card-holder.png')" alt="intergiro-card-holder-input with layout 'column'">

### Row

``` html
<intergiro-card-holder-input api-key="<public.api.key>" layout="row">
```


<img style="width: 100%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/card-holder-input/row-card-holder.png')" alt="intergiro-card-holder-input with layout 'row'">

## Cosmetic
The cosmetic parameter should be set to a JSON or a stringified JSON as described below. All cosmetics fields are optional and can be used in parts.

The cosmetic attribute has the same structure as in [card-input](../card-input/style.html#cosmetics)

Example:
``` html
<intergiro-card-holder-input api-key="<public.api.key>" cosmetic='{
	text: { background: "rgb(230,230,250)", color: "#000" },
	border: { color: "hsl(220, 50%, 70%)", width: "3px", style: "solid", radius: "0px" },
	dangerColor: "#f03030"
}'></intergiro-card-holder-input>
```

<img style="width: 60%; display: block; margin: auto" :src="$withBase('/assets/img/merchant/card-holder-input/standard-card-holder-blue.png')" alt="intergiro-card-holder-input with layout 'standard'">