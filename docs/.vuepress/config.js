const path = require('path')
const { description } = require('../../package')

module.exports = {
  // when changing base make sure to update
  // font loading paths in styles/palette.styl
  base: '/developer-portal/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Intergiro developer portal',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: '/assets/img/logo_black.svg' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    logo: '/assets/img/logo_black.svg',
    smoothScroll: true,
    nav: [
      {
        text: 'Integrate',
        ariaLabel: 'Integrate Menu',
        link: '/integrate/',
        items: [
          { text: 'Getting started', link: '/integrate/getting-started/' },
          { text: 'Onboarding', link: '/integrate/onboarding/' },
          { text: 'Card programmes', link: '/integrate/card-programmes/' },
          { text: 'Embedded finance', link: '/integrate/embedded-finance/' },
          { text: 'Payment gateway', link: '/integrate/payment-gateway/' },
          { text: 'API reference', link: 'https://b2b.intergiro.com/v3/docs' },
        ]
      },
      {
        text: 'Merchant',
        ariaLabel: 'Merchant Menu',
        link: '/merchant/',
        items: [
          { text: 'Integration Guide', link: '/merchant/integration-guide/introduction' },
          { text: 'Checkout UI', link: '/merchant/checkout/embed' },
          { text: 'Order API', link: '/merchant/order/create' },
          { text: 'Card Input UI', link: '/merchant/card-input/embed' },
          { text: 'Card API', link: '/merchant/card-api/create' },
          { text: 'Customer API', link: '/merchant/customer/registration-ui' },
          { text: 'Authorization', link: '/merchant/authorization/create' },
          { text: 'Settlement', link: '/merchant/settlement/list' },
          { text: 'Verification', link: '/merchant/verification/create' },
          { text: 'Merchant', link: '/merchant/merchant/create' },
          { text: 'Common References', link: '/merchant/common/reference' }
        ]
      },
      { text: 'Business banking', link: '/direct/' },
    ],
    sidebar: {
      '/integrate/': getIntegrateSidebar(),
      '/integrate/getting-started/': getIntegrateSidebar(),
      '/integrate/onboarding/': getIntegrateSidebar(),
      '/integrate/embedded-finance/': getIntegrateSidebar(),
      '/integrate/card-programmes/': getIntegrateSidebar(),
      '/integrate/payment-gateway/': getIntegrateSidebar(),
      '/merchant/': getMerchantSidebar(),
      '/direct/': [
        '',
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}

function getIntegrateSidebar() {
  return [
    {
      title: 'Getting started',
      collapsable: false,
      children: [
        '/integrate/getting-started/introduction',
        '/integrate/getting-started/environments',
        '/integrate/getting-started/authentication',
        '/integrate/versioning',
        '/integrate/simulation',
        '/integrate/getting-started/sca',
      ],
    },
    '/integrate/onboarding/',
    '/integrate/embedded-finance/',
    '/integrate/card-programmes/',
    '/integrate/payment-gateway/',
  ]
}
function getMerchantSidebar() {
  return [
    {
      title: 'Integration Guide',
      collapsable: false,
      children: [
        '/merchant/integration-guide/introduction',
        '/merchant/integration-guide/psp/api',
        // '/merchant/integration-guide/balance',
        // '/merchant/integration-guide/create-top-up-payment',
      ]
    },
    {
      title: 'Checkout UI',
      collapsable: false,
      children: [
        '/merchant/checkout/embed',
        // '/merchant/checkout/redirect',
        '/merchant/checkout/features',
        '/merchant/checkout/cosmetic',
      ]
    },
    {
      title: 'Order API',
      collapsable: false,
      children: [
        '/merchant/order/create',
        '/merchant/order/change',
        '/merchant/order/list',
        '/merchant/order/reference',
      ]
    },
    {
      title: 'Card Input UI',
      collapsable: false,
      children: [
        '/merchant/card-input/embed',
        '/merchant/card-input/verification',
        '/merchant/card-input/style',
      ]
    },
    {
      title: 'Card API',
      collapsable: false,
      children: [
        '/merchant/card-api/create',
      ]
    },
    {
      title: 'Customer',
      collapsable: false,
      children: [
        '/merchant/customer/registration-ui',
        '/merchant/customer/create',
        '/merchant/customer/create-api-key',
        '/merchant/customer/create-order',
        '/merchant/customer/balance',
        '/merchant/customer/update-details',
        '/merchant/customer/update-contact-information',
        '/merchant/customer/get',
        '/merchant/customer/list',
        '/merchant/customer/create-app-login',
        '/merchant/customer/payment-methods',
        '/merchant/customer/subscriptions',
        '/merchant/customer/app',
        '/merchant/customer/reference',
      ]
    },
    {
      title: 'Authorization',
      collapsable: false,
      children: [
        '/merchant/authorization/create',
        '/merchant/authorization/capture',
        '/merchant/authorization/cancel',
        '/merchant/authorization/refund',
        '/merchant/authorization/states',
        '/merchant/authorization/list',
        '/merchant/authorization/get',
        '/merchant/authorization/reference',
        '/merchant/authorization/postman',
      ]
    },
    {
      title: 'Settlement',
      collapsable: false,
      children: [
        '/merchant/settlement/list',
        '/merchant/settlement/reference',
      ]
    },
    {
      title: 'Verification',
      collapsable: false,
      children: [
        '/merchant/verification/create',
        '/merchant/verification/reference',
        '/merchant/verification/postman',
      ]
    },
    {
      title: 'Merchant',
      collapsable: false,
      children: [
        '/merchant/merchant/create',
        '/merchant/merchant/update',
        '/merchant/merchant/get',
        '/merchant/merchant/rules',
        '/merchant/merchant/list',
        '/merchant/merchant/reference',
        '/merchant/merchant/postman',
      ]
    },
    {
      title: 'Common',
      collapsable: false,
      children: [
        '/merchant/common/reference',
        '/merchant/common/error',
      ]
    },
  ]
}
