import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  buildModules: ['@vueuse/core/nuxt', 'nuxt-windicss'],
  head: {
    title: 'ACNH Database',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },
  windicss: {
    analyze: true,
  },
});
