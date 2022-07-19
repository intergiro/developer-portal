(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{501:function(e,t,s){"use strict";s.r(t);var n=s(62),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"strong-customer-authentication"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#strong-customer-authentication"}},[e._v("#")]),e._v(" Strong Customer Authentication")]),e._v(" "),s("p",[e._v("New PSR2 RTS requirements have been rolled out across Europe to protect online payments. At Intergiro we proudly welcome the new regulation and endorse the mission to give users control over their payment experience and security online.")]),e._v(" "),s("p",[e._v("Now, some user actions require their explicit consent and authorisation:")]),e._v(" "),s("ul",[s("li",[e._v("KYC & Onboarding")]),e._v(" "),s("li",[e._v("accessing individual's payment history")]),e._v(" "),s("li",[e._v("external payments")]),e._v(" "),s("li",[e._v("accessing sensitive card details")])]),e._v(" "),s("img",{attrs:{src:e.$withBase("/assets/img/integrate/getting-started/sca-tooltip.png"),alt:"Business banking"}}),e._v(" "),s("h2",{attrs:{id:"enrollment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#enrollment"}},[e._v("#")]),e._v(" Enrollment")]),e._v(" "),s("p",[e._v("As part of the "),s("a",{attrs:{href:"/3d/onboarding"}},[e._v("KYC & Onboarding process")]),e._v(" we take care of the user registration, i.e. the user creates a passcode, confirms their phone number and enrolls their biometry device. This is fully transparent and doesn't require you to store any user secrets on your end.")]),e._v(" "),s("p",[e._v("When it comes to Bank payments and Cards, however, the users will have to provide their explicit authorisation directly to Intergiro by means of a URL redirect.")]),e._v(" "),s("h2",{attrs:{id:"consent-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#consent-api"}},[e._v("#")]),e._v(" Consent API")]),e._v(" "),s("p",[e._v("Consent API is designed to help the end user provide explicit consent, authorise payments and access sensitive card details.")]),e._v(" "),s("p",[e._v("A pending Consent request object is returned as a "),s("code",[e._v("412 Precondition Failed")]),e._v(" HTTP response to an action:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("div",{staticClass:"highlight-lines"},[s("div",{staticClass:"highlighted"},[e._v(" ")]),s("br"),s("br"),s("br"),s("div",{staticClass:"highlighted"},[e._v(" ")]),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('HTTP 412 Precondition Failed\n\n{\n  "consent": {\n    "id": "e1dd9cd7-1650-42b3-8496-a970fb40ed3f",\n    "status": "pending"\n    "scope": [\n      "make_payment"\n    ],\n    "expires_at": "2021-05-11T09:55:17.000Z"\n  }\n}\n')])])]),s("p",[e._v("Here you can see what kind of consent is required, its status and when it expires. Once the time is right to prompt the user, grab that "),s("code",[e._v("consent.id")]),e._v(" and make a request to "),s("code",[e._v("POST /consents/<consent_id>")]),e._v(" in order to initiate the consent process:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("div",{staticClass:"highlight-lines"},[s("div",{staticClass:"highlighted"},[e._v(" ")]),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('POST /v3/consents/e1dd9cd7-1650-42b3-8496-a970fb40ed3f\n\nContent-Type: application/json\nAuthorization: Bearer <access_token>\n\n{\n  "return_url": "https://example.com/payment_finished"\n}\n')])])]),s("p",[e._v("The response will contain a Consent Method with instructions on how to complete the process:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("div",{staticClass:"highlight-lines"},[s("div",{staticClass:"highlighted"},[e._v(" ")]),s("br"),s("br"),s("br"),s("div",{staticClass:"highlighted"},[e._v(" ")]),s("br"),s("br"),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('HTTP 200 OK\n\n{\n  "method": {\n    "redirect_url": "https://integrate.intergiro.com/sca/consent?token=eyJjb...",\n    "expires_at": "2021-05-11T09:55:17.000Z"\n  }\n}\n')])])]),s("p",[e._v("Now you'll need to open the browser and send the user to the "),s("code",[e._v("redirect_url")]),e._v(" received.")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("Consider using iOS "),s("a",{attrs:{href:"https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("SFSafariViewController")]),s("OutboundLink")],1),e._v(" and Android "),s("a",{attrs:{href:"https://developer.chrome.com/docs/android/custom-tabs/overview/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Chrome Custom Tabs"),s("OutboundLink")],1),e._v(" in-app or standalone browser experience to take advantage of a more streamlined process using native Biometry support on mobile.")])]),e._v(" "),s("p",[e._v("Once the user finishes, they will be redirected back to the "),s("code",[e._v("return_url")]),e._v(" provided.")])])}),[],!1,null,null,null);t.default=r.exports}}]);