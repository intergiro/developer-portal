(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{566:function(t,r,e){"use strict";e.r(r);var s=e(62),a=Object(s.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"create"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create"}},[t._v("#")]),t._v(" Create")]),t._v(" "),e("p",[t._v("To create an order, post an "),e("RouterLink",{attrs:{to:"/merchant/order/reference.html#order"}},[t._v("Order Creatable")]),t._v(" to the order endpoint. The "),e("code",[t._v("payment")]),t._v(" field must be a "),e("RouterLink",{attrs:{to:"/merchant/order/reference.html#card-payment"}},[t._v("Card Payment Creatable")]),t._v(".")],1),t._v(" "),e("h4",{attrs:{id:"request"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[t._v("#")]),t._v(" Request")]),t._v(" "),e("div",{staticClass:"language-JSON extra-class"},[e("div",{staticClass:"highlight-lines"},[e("div",{staticClass:"highlighted"},[t._v(" ")]),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br")]),e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[t._v("POST /v1/order\n\nHost"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" merchant.intergiro.com\nContent-Type"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" application/json\nAccept"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" application/json\nAuthentication"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Bearer <customer.api.key> | Bearer <private.api.key>\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"items"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <number or item information or array of items objects>"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"currency"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<currency of the transaction>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"payment"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"card"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"card"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<card JWT>"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"client"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"browser"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"color_depth"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("24")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"resolution"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2560")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1440")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"java"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"javascript"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"locale"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sv-SE"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"timezone"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("-60")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"parent"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://your.webshop.com"')]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("See "),e("RouterLink",{attrs:{to:"/merchant/common/reference.html#browser"}},[t._v("browser")]),t._v(" section for information on how to get the browser information above.")],1),t._v(" "),e("p",[e("strong",[t._v("Note:")]),t._v(" Including "),e("code",[t._v("application/json")]),t._v(" in the Accept header will return the Order as a JSON, otherwise the Order will be in a signed JWT.")]),t._v(" "),e("h4",{attrs:{id:"response"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("p",[t._v("On success, the response will be an "),e("RouterLink",{attrs:{to:"/merchant/order/reference.html#order-2"}},[t._v("Order")]),t._v(".")],1),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Identifier of order in Intergiro\'s system>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"created"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<datetime of order>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"items"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<numer or item information or array of items objects>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"currency"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Currency of order>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"payment"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Card payment>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("On failure, an "),e("RouterLink",{attrs:{to:"/merchant/common/error.html"}},[t._v("Error")]),t._v(" will be returned together with the id of the order. If a "),e("code",[t._v("verification required")]),t._v(" error is returned, "),e("RouterLink",{attrs:{to:"/merchant/card-api/verification.html"}},[t._v("verification")]),t._v(" needs to be performed.")],1),t._v(" "),e("p",[e("strong",[t._v("Note: Include the "),e("code",[t._v("id")]),t._v(" from the error response in the request body for all following calls to the order-create endpoint, concerning the same order.")]),t._v(" This is important to keep a correct "),e("RouterLink",{attrs:{to:"/merchant/authorization/reference.html#history"}},[t._v("History")]),t._v(" of the authorization creation, and to make sure 3DS is done correctly. The id field in an Order Creatable should never be populated with any id other than the id received from the order endpoint.")],1)])}),[],!1,null,null,null);r.default=a.exports}}]);