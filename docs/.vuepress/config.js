const path = require('path')
const { description } = require('../../package')

module.exports = {
  // when changing base make sure to update
  // font loading paths in styles/palette.styl
  base: '/developer-portal/',

  configureWebpack: {
    resolve: {
      alias: {
        '@assets': `${__dirname}/public/assets/`
      }
    }
  },
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Intergiro Developer Portal',
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
      { text: 'Card programmes', link: '/integrate/card-programmes/' },
      { text: 'Embedded finance', link: '/integrate/embedded-finance/' },
      { text: 'Merchants', link: '/integrate/merchants/' },
      { text: 'Business banking', link: '/direct/' },
      {
        text: 'Reference',
        ariaLabel: 'Reference Menu',
        items: [
          { text: 'Integrate API', link: 'https://b2b.intergiro.com/v3/docs' },
        ] 
      }
    ],
    sidebar: {
      '/integrate/': getIntegrateSidebar(),
      '/integrate/getting-started/': getIntegrateSidebar(),
      '/integrate/onboarding/': getIntegrateSidebar(),
      '/integrate/card-programmes/': getIntegrateSidebar(),
      '/integrate/embedded-finance/': getIntegrateSidebar(),
      '/integrate/merchants/': getIntegrateSidebar(),
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
      ],
    },
    '/integrate/onboarding/',
    '/integrate/embedded-finance/',
    '/integrate/card-programmes/',
    '/integrate/merchants/',
    '/direct/',
  ]
}
