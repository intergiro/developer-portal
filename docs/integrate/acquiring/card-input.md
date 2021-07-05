# Card Input

## Import the card input 
Add this code to the header to import the card-input element.
```html
<script 
    type="module" 
    src="https://ui.payfunc.com/component/payfunc-component/payfunc-component.esm.js">
</script>
```

## Card Input Element

```html
<intergiro-card-input
    api-key="<public.api.key | customer.api.key>" 
    cosmetic='{
        "background": "hsl(340, 60%, 88%)",
        "gap": "1em",
        "border": {"color": "0,0,255", "width": "1px", "style": "dashed", "radius": "0.5em"},
        "text": {"background": "rgb(255,255,155)", "color": "#080"},
        "fontFamily": "Arial, Verdana, Helvetica",
        "dangerColor": "#f03030"
    }'
    layout="standard">
</intergiro-card-input>
```
Use the card input element like a regular html element.
## Styling 

The `card-input` can be styled using the `cosmetic` and `layout` properties.

The `cosmetic` property can be set with a stringified JSON object as seen above.

![card-input cosmetic properties](/assets/img/integrate/acquiring/card-input-cosmetic.png)

All available styling options are seen in the figure above. 

::: tip
The color attributes can be set using rgb, hsl, hex codes (both `"#rgb"` and `"#rrggbb"`) or color names (e.g. `"red"`). 
Colors can also be specified using RGB comma seperated string e.g.`"0,0,255"` for blue. 

**Note:** Colors specified with alpha value will not work.
:::


`layout` can be set to the string `"standard"`, `"row"` or `"column"`.
The borders will be placed differently depending on if the `gap` attribute is set in `cosmetic`.

| `layout`     | Gap not set                                                           | Gap set                                                           |
|--------------|-----------------------------------------------------------------------|-------------------------------------------------------------------|
| `"standard"` | ![standard nogap](/assets/img/integrate/acquiring/standard-nogap.png) | ![standard gap](/assets/img/integrate/acquiring/standard-gap.png) |
| `"row"`      | ![row nogap](/assets/img/integrate/acquiring/row-nogap.png)           | ![row gap](/assets/img/integrate/acquiring/row-gap.png)           |
| `"column"`   | ![column nogap](/assets/img/integrate/acquiring/column-nogap.png)     | ![column gap](/assets/img/integrate/acquiring/column-gap.png)     |

The width of the card-input is `"100%"` and is therefore as wide as its parent container.