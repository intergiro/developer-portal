(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{540:function(t,r,s){"use strict";s.r(r);var e=s(62),a=Object(e.a)({},(function(){var t=this,r=t.$createElement,s=t._self._c||r;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"creating-an-order"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-an-order"}},[t._v("#")]),t._v(" Creating an Order")]),t._v(" "),s("p",[t._v("To create a customer order post an "),s("RouterLink",{attrs:{to:"/merchant/order/reference.html#order"}},[t._v("Order Creatable")]),t._v(" to the order endpoint,\nthe "),s("code",[t._v("customer")]),t._v(" field must be set to a customer id and the "),s("code",[t._v("payment")]),t._v(" field must be a "),s("RouterLink",{attrs:{to:"/merchant/customer/reference.html#customer-payment"}},[t._v("Customer Payment Creatable")]),t._v(".")],1),t._v(" "),s("p",[t._v("An order can also be created with a specific customer method by "),s("RouterLink",{attrs:{to:"/merchant/customer/payment-methods.html#select-customer-method"}},[t._v("Selecting Customer Method")]),t._v(".")],1),t._v(" "),s("h4",{attrs:{id:"request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[t._v("#")]),t._v(" Request")]),t._v(" "),s("div",{staticClass:"language-JSON extra-class"},[s("div",{staticClass:"highlight-lines"},[s("div",{staticClass:"highlighted"},[t._v(" ")]),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[t._v("POST /v1/order\n\nHost"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" merchant.intergiro.com\nContent-Type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" application/json\nAuthentication"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Bearer <customer.api.key> | Bearer <private.api.key>\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"number"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <your order identifier>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"items"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <number or item information or array of items objects>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"customer"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <customer id>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <currency of the transaction>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"payment"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"customer"')]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Identifier of order in Intergiro\'s system>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"created"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<datetime of order>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"customer"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<id of customer or contact information>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"items"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<numer or item information or array of items objects>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Currency of order>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"payment"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Card payment>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);r.default=a.exports}}]);