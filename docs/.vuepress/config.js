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
        text: 'Intergiro 3D',
        ariaLabel: 'Intergiro 3D Menu',
        link: '/3d/',
        items: [
          { text: 'Getting started', link: '/3d/getting-started/' },
          { text: 'Onboarding', link: '/3d/onboarding/' },
          { text: 'Card programmes', link: '/3d/card-programmes/' },
          { text: 'Embedded finance', link: '/3d/embedded-finance/' },
          { text: 'Payment gateway', link: '/3d/payment-gateway/' },
          { text: 'API reference', link: 'https://3d.intergiro.com/v3/docs' },
        ]
      },
      {
        text: 'Card Acquiring',
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
          { text: '3D Secure', link: '/merchant/3d-secure/introduction' },
          { text: 'Merchant', link: '/merchant/merchant/create' },
          { text: 'Common References', link: '/merchant/common/reference' }
        ]
      },
      { text: 'Business banking', link: '/2d/' },
    ],
    sidebar: {
      '/3d/': getIntegrateSidebar(),
      '/3d/getting-started/': getIntegrateSidebar(),
      '/3d/onboarding/': getIntegrateSidebar(),
      '/3d/embedded-finance/': getIntegrateSidebar(),
      '/3d/card-programmes/': getIntegrateSidebar(),
      '/3d/payment-gateway/': getIntegrateSidebar(),
      '/merchant/': getMerchantSidebar(),
      '/2d/': [
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
        '/3d/getting-started/introduction',
        '/3d/getting-started/environments',
        '/3d/getting-started/specification',
        '/3d/getting-started/authentication',
        '/3d/versioning',
        '/3d/simulation',
        '/3d/getting-started/sca',
      ],
    },
    '/3d/onboarding/',
    '/3d/embedded-finance/',
    '/3d/card-programmes/',
    '/3d/payment-gateway/',
  ]
}
function getMerchantSidebar() {
  return [
    {
      title: 'Get Started',
      collapsable: false,
      path: '/merchant/integration-guide/introduction',
    },
    {
      title: 'PSP',
      sidebarDepth: 1,
      collapsable: true,
      // path: '/merchant/integration-guide/psp/api',
      children: [
        '/merchant/integration-guide/psp/api',
        // '/merchant/integration-guide/balance',
        // '/merchant/integration-guide/create-top-up-payment',
        {
          title: 'Order API',
          sidebarDepth: 1,
          collapsable: true,
          children: [
            '/merchant/order/create',
            '/merchant/order/change',
            '/merchant/order/list',
            '/merchant/order/callback',
            '/merchant/order/reference',
            '/merchant/order/postman',
          ]
        },
        {
          title: 'Customer',
          sidebarDepth: 1,
          collapsable: true,
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
            '/merchant/customer/postman',
          ]
        },
        {
          title: 'Checkout UI',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/checkout/embed',
            // '/merchant/checkout/redirect',
            '/merchant/checkout/features',
            '/merchant/checkout/cosmetic',
          ]
        },
        {
          title: 'Card Input UI',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/card-input/embed',
            '/merchant/card-input/verification',
            '/merchant/card-input/style',
          ]
        },
        {
          title: 'Card API',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/card-api/create',
            '/merchant/card-api/update',
            '/merchant/card-api/get',
            '/merchant/card-api/verification',
            '/merchant/card-api/postman',
            '/merchant/card-api/reference',
          ]
        },
      ]
    },
    {
      title: 'Acquiring',
      collapsable: true,
      sidebarDepth: 1,
      // path: '/merchant/integration-guide/acquiring/api',
      children: [
        '/merchant/integration-guide/acquiring/api',
        '/merchant/integration-guide/authentication',
        {
          title: 'Authorization',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/authorization/create',
            '/merchant/authorization/capture',
            '/merchant/authorization/cancel',
            '/merchant/authorization/refund',
            '/merchant/authorization/redirect',
            '/merchant/authorization/states',
            '/merchant/authorization/list',
            '/merchant/authorization/get',
            '/merchant/authorization/reference',
            '/merchant/authorization/postman',
          ]
        },
        {
          title: 'Settlement',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/settlement/list',
            '/merchant/settlement/reference',
          ]
        },
        {
          title: '3D Secure',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/3d-secure/introduction',
            '/merchant/3d-secure/automated',
            '/merchant/3d-secure/interactive',
            '/merchant/3d-secure/controlled',
            '/merchant/3d-secure/external',
          ]
        },
        {
          title: 'Merchant',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/merchant/merchant/create',
            '/merchant/merchant/update',
            '/merchant/merchant/get',
            '/merchant/merchant/list',
            '/merchant/merchant/rules',
            '/merchant/merchant/functions',
            '/merchant/merchant/reference',
            '/merchant/merchant/postman',
          ]
        },
      ]
    },
    {
      title: 'Common',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '/merchant/common/reference',
        '/merchant/common/error',
        '/merchant/common/test-cards'
      ]
    },
  ]
}
