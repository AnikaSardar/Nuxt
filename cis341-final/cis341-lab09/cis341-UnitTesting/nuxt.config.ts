/**  Resources -
 * NUXT:https://nuxt.com/docs/api/configuration/nuxt-config 
 * Manage state: https://dev.to/hannahadora/managing-state-with-pinia-and-nuxt-3-using-a-simple-add-to-cart-instance-1faf 
 * Solution to ERESOLVE: https://pinia.vuejs.org/ssr/nuxt.html 
*/
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils/module', '@pinia/nuxt']
})
