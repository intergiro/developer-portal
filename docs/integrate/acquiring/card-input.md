# Card Input

Must have public or customer api-key

The `card-input` can be styled using the `cosmetic` and `layout` properties.

#### Cosmetic

```html
<intergiro-card-input
    payfunc-card-input api-key="<public.api.key>" 
    cosmetic='{
        "background": "hsl(340, 60%, 88%)",
        "gap": "1em",
        "border": {"color": "0,0,255", "width": "1px", "style": "dashed", "radius": "0.5em"},
        "text": {"background": "rgb(255,255,155)", "color": "#080"},
        "fontFamily": "Arial, Verdana, Helvetica",
        "dangerColor": "#f03030"
    }'
    layout="standard">
</payfunc-card-inputpayfunc-card-input>
```
![card-input cosmetic properties](/assets/img/integrate/acquiring/card-input-cosmetic.png)

Specific styling attributes (all available styling options are seen in the figure above) can be changed using the cosmetic attribute. This is done by sending in a stringified JSON object. The color attributes can be send in using rgb, hsl, hex codes (both `"#rgb"` and `"#rrggbb"`) and color names. Colors can also be specified using RGB comma seperated string e.g."0,0,255"for blue. Note: Colors specified with alpha value will not work.


`layout` can be set to the string `"standard"`, `"row"` or `"column"`.

| `layout`     | Gap                                                               | Gap not specified                                                     |
|--------------|-------------------------------------------------------------------|-----------------------------------------------------------------------|
| `"standard"` | ![standard gap](/assets/img/integrate/acquiring/standard-gap.png) | ![standard nogap](/assets/img/integrate/acquiring/standard-nogap.png) |
| `"row"`      | ![row gap](/assets/img/integrate/acquiring/row-gap.png)           | ![row nogap](/assets/img/integrate/acquiring/row-nogap.png)           |
| `"column"`   | ![column gap](/assets/img/integrate/acquiring/column-gap.png)     | ![column nogap](/assets/img/integrate/acquiring/column-nogap.png)     |