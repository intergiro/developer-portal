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
          { text: 'Acquiring', link: '/integrate/acquiring/' },
          { text: 'Merchant', link: '/integrate/merchant/' },
          { text: 'API reference', link: 'https://b2b.intergiro.com/v3/docs' },
        ]
      },
      // { text: 'Business banking', link: '/direct/' },
    ],
    sidebar: {
      '/integrate/': getIntegrateSidebar(),
      '/integrate/getting-started/': getIntegrateSidebar(),
      '/integrate/onboarding/': getIntegrateSidebar(),
      '/integrate/card-programmes/': getIntegrateSidebar(),
      '/integrate/embedded-finance/': getIntegrateSidebar(),
      '/integrate/acquiring/': getIntegrateSidebar(),
      '/integrate/merchant/': getIntegrateSidebar(),
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
    {
      title: 'Acquiring',
      collapsable: false,
      children: [
        '/integrate/acquiring/introduction',
        '/integrate/acquiring/api',
        '/integrate/acquiring/reference',
        '/integrate/acquiring/rules',
      ]
    },
    {
      title: 'Merchant',
      collapsable: false,
      children: [
        '/integrate/merchant/account-page',
      ]
    },
  ]
}
