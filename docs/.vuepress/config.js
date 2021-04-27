const { description } = require('../../package')

module.exports = {
  // base: '/guides',
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
      '/integrate/getting-started/': getIntegrateSidebar(),
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
      ],
    },
    '/integrate/embedded-finance/',
    '/integrate/card-programmes/',
    '/integrate/merchants/',
    '/direct/',
  ]
}