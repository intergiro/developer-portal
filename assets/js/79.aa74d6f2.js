(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{537:function(t,e,a){"use strict";a.r(e);var s=a(62),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"balance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#balance"}},[t._v("#")]),t._v(" Balance")]),t._v(" "),a("p",[t._v("One of the main features of the customer is to charge items against the balance of the customer. For this there are three main features.\nAdding items to Balance, Adding funds to the Balance and settling the Balance.")]),t._v(" "),a("h3",{attrs:{id:"adding-items-to-balance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-items-to-balance"}},[t._v("#")]),t._v(" Adding items to Balance")]),t._v(" "),a("p",[t._v("If a customer pays for an item with their balance, you can add that item to the balance using the customer-balance-item endpoint.\nIn this case just make a simple post request.\nThe body of a valid request should either be a strictly positive, nonzero "),a("code",[t._v("number")]),t._v(", an "),a("RouterLink",{attrs:{to:"/merchant/common/reference.html#item"}},[a("code",[t._v("Item")])]),t._v(" or an array of "),a("RouterLink",{attrs:{to:"/merchant/common/reference.html#item"}},[a("code",[t._v("Items")])]),t._v(".")],1),t._v(" "),a("h4",{attrs:{id:"request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[t._v("#")]),t._v(" Request")]),t._v(" "),a("div",{staticClass:"language-JSON extra-class"},[a("div",{staticClass:"highlight-lines"},[a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[t._v("POST /v1/customer/"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("customer_id/balance\n\nHost"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" merchant.intergiro.com \nConent-Type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" application/json\nAuthentication"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Bearer <customer.api.key> | Bearer <private.api.key>\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"number"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<product number in your system>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<name or description of product>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"price"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<item price>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"quantity"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<quantity>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"unit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<unit>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"vat"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<vat>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"rebate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<rebate>"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),a("p",[t._v("A successful response will return the updated "),a("RouterLink",{attrs:{to:"/merchant/customer/reference.html#customer"}},[a("code",[t._v("Customer")])]),t._v(".")],1),t._v(" "),a("h3",{attrs:{id:"adding-funds-to-balance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-funds-to-balance"}},[t._v("#")]),t._v(" Adding funds to Balance")]),t._v(" "),a("p",[t._v("Adding funds to the balance can be done by sending an "),a("RouterLink",{attrs:{to:"/merchant/order/reference.html#order"}},[t._v("order creatable")]),t._v(" to the order endpoint.\nTo charge the balance of a customer, specify the "),a("code",[t._v("charge")]),t._v(" field of the Customer payment as "),a("code",[t._v('"balance"')]),t._v(".\nOnce the payment is authorized, it will automatically credit the balance with the total of the payment and "),a("a",{attrs:{href:"#"}},[t._v("charge")]),t._v(" the order.")],1),t._v(" "),a("p",[t._v("An order that failed authorization will set the Customer status to "),a("code",[t._v('"pending"')]),t._v(" and retry authorization as specified in "),a("a",{attrs:{href:"#"}},[t._v("retrying failed customer orders")]),t._v(".")]),t._v(" "),a("h4",{attrs:{id:"request-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request-2"}},[t._v("#")]),t._v(" Request")]),t._v(" "),a("div",{staticClass:"language-JSON extra-class"},[a("div",{staticClass:"highlight-lines"},[a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[t._v("POST /v1/order\n\nHost"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" merchant.intergiro.com\nContent-Type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" application/json\nAuthentication"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Bearer <customer.api.key> | Bearer <private.api.key>\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"number"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your order identifier"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"items"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Item or number indicating the charge to the balance>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"currency"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<Currency 3 digit identifier>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"customer"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<customer_id>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"payment"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"customer"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"charge"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"balance"')]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"response-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response-2"}},[t._v("#")]),t._v(" Response")]),t._v(" "),a("p",[t._v("A successful response will be as detailed in the "),a("a",{attrs:{href:"../order#card-customer-payment"}},[a("code",[t._v("Order Endpoint API")])]),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"settling-balance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#settling-balance"}},[t._v("#")]),t._v(" Settling Balance")]),t._v(" "),a("p",[t._v("Calling this endpoint will settle the balance and move all Items that are charged towards the balance, but have not been settled yet, to an Order.\nThus, all items charged to the balance will inevitably end up being added to an Order, so a receipt can be created for them.")]),t._v(" "),a("p",[t._v('A Request to this endpoint can either be made with a "private" authorization key or with the "customer" authorization key.\nWith the "customer" authorization key you have to specify "me" as the customer id, for "private" authorization specify the customer id of the customer you wish to settle or "all" if you want settle all customers tied to the customer.')]),t._v(" "),a("p",[t._v('If the balance already partially paid for the items specified in the "balance" field of the customer, that amount will be added to the order as its own item.')]),t._v(" "),a("p",[t._v('The order will be a customer order with the "charge" field in the "payment" field set to "balance" and will be automatically charged.\nOnly a successful payment will update the "total" field of the customer.\nA failed payment will retry authorization as specified in '),a("a",{attrs:{href:"../reference/order#retry-failed-customer-payments"}},[a("code",[t._v("retrying failed customer orders.")])])]),t._v(" "),a("h4",{attrs:{id:"request-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request-3"}},[t._v("#")]),t._v(" Request")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("div",{staticClass:"highlight-lines"},[a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("DELETE /v1/customer/:customer_id/balance\n\nHost: merchant.intergiro.com\nAuthentication: Bearer <customer.api.key> | Bearer <private.api.key>\n")])])]),a("h4",{attrs:{id:"response-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response-3"}},[t._v("#")]),t._v(" Response")]),t._v(" "),a("p",[t._v("A response will be a json object specifying how many customers updated their balance and how many customers generated an error instead.\nIf all customers are correctly set up, the errors field should always equal 0.")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"updated"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<amount of updated customers>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"errors"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<amount of customers generating an error>"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);