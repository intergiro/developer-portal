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
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', { defer: true, ['data-domain']: 'intergiro.github.io', src: 'https://plausible.io/js/plausible.js' }],
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
        text: 'Intergiro 3d',
        ariaLabel: 'Intergiro 3d Menu',
        link: '/3d/',
        items: [
          { text: 'Getting started', link: '/3d/getting-started/' },
          { text: 'Onboarding', link: '/3d/onboarding/' },
          { text: 'Accounts', link: '/3d/embedded-finance/' },
          { text: 'Cards', link: '/3d/card-programmes/' },
          { text: 'API reference', link: 'https://3d.intergiro.com/v3/docs' },
        ]
      },
      {
        text: 'Intergiro 2d',
        ariaLabel: 'Intergiro 2d Menu',
        link: '/2d/',
        items: [
          { text: 'Getting started', link: '/2d/getting-started/' },
          { text: 'Services', link: '/2d/services/' },
          { text: 'API reference', link: 'https://2d.intergiro.com/v1/docs' },
        ]
      },
      {
        text: 'Card Acquiring',
        ariaLabel: 'Card Acquiring Menu',
        link: '/merchant/',
        items: [
          { text: 'Get Started', link: '/merchant/integration-guide/introduction' },
          {
            text: 'Acquiring',
            items: [
              { text: 'Overview', link: '/merchant/integration-guide/acquiring/overview' },
              { text: 'Authorization', link: '/merchant/authorization/create' },
              { text: 'Settlement', link: '/merchant/settlement/list' },
              { text: '3D Secure', link: '/merchant/3d-secure/introduction' },
              //{ text: 'Merchant', link: '/merchant/merchant/create' }    
            ]
          },
          {
            text: 'Payment Gateway', 
            items: [
              { text: 'Overview', link: '/merchant/integration-guide/psp/overview' },
              { text: 'Checkout UI', link: '/merchant/checkout/embed' },
              { text: 'Card Input UI', link: '/merchant/card-input/embed' },
              { text: 'Customers', link: '/merchant/customer/registration-ui' },
              { text: 'Order API', link: '/merchant/order/create' },
              { text: 'Card API', link: '/merchant/card-api/create' },
              //{ text: 'Common References', link: '/merchant/common/reference' }    
            ]
          }
        ]
      }
    ],
    sidebar: {
      '/3d/': getIntegrateSidebar(),
      '/3d/getting-started/': getIntegrateSidebar(),
      '/3d/onboarding/': getIntegrateSidebar(),
      '/3d/embedded-finance/': getIntegrateSidebar(),
      '/3d/card-programmes/': getIntegrateSidebar(),
      '/2d/': getDirectSidebar(),
      '/2d/getting-started/': getDirectSidebar(),
      '/2d/services/': getDirectSidebar(),
      '/merchant/': getMerchantSidebar()
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
    {
      title: 'Accounts as a Service',
      collapsable: false,
      children: [
        '/3d/embedded-finance/accounts',
        '/3d/embedded-finance/payments',
        '/3d/embedded-finance/account-funding',
      ],
    },
    '/3d/card-programmes/',
  ]
}

function getDirectSidebar() {
  return [
    {
      title: 'Getting started',
      collapsable: false,
      children: [
        '/2d/getting-started/introduction',
        '/2d/getting-started/apikey',
        '/2d/getting-started/authentication',
        '/2d/getting-started/sca',
        '/2d/getting-started/environments',
        '/2d/getting-started/specification',
        '/2d/versioning'
      ],
    },
    {
      title: 'Services',
      collapsable: false,
      children: [
        '/2d/services/accounts',
        '/2d/services/transactions',
        '/2d/services/payments',
      ],
    }
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
      title: 'Acquiring',
      collapsable: true,
      sidebarDepth: 1,
      // path: '/merchant/integration-guide/acquiring/api',
      children: [
        {
          title: 'Overview',
          path: '/merchant/integration-guide/acquiring/overview'
        },
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
        }
        // {
        //   title: 'Merchant',
        //   collapsable: true,
        //   sidebarDepth: 1,
        //   children: [
        //     '/merchant/merchant/create',
        //     '/merchant/merchant/update',
        //     '/merchant/merchant/get',
        //     '/merchant/merchant/list',
        //     '/merchant/merchant/rules',
        //     '/merchant/merchant/functions',
        //     '/merchant/merchant/reference',
        //     '/merchant/merchant/postman',
        //   ]
        // },
      ]
    },
    {
      title: 'Payment Gateway',
      sidebarDepth: 1,
      collapsable: true,
      // path: '/merchant/integration-guide/psp/overview',
      children: [
        {
          title: 'Overview',
          path: '/merchant/integration-guide/psp/overview'
        },
        // '/merchant/integration-guide/balance',
        // '/merchant/integration-guide/create-top-up-payment',
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
