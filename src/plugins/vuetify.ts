/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Theme Colors
const LIGHT_THEME = {
  dark: false,
  colors: {
    primary: '#1C4587',
    secondary: '#1C1C1C',
    indigo: '#C9DAF8',
    info: '#B7B7B7',
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FB8C00',
    background: '#FFFFFF',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'LIGHT_THEME',
    themes: {
      LIGHT_THEME,
    },
  },
})
