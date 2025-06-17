import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customTheme = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#fcecff' },
          100: { value: '#f6d4ff' },
          200: { value: '#eaaeff' },
          300: { value: '#d18cff' },
          400: { value: '#b97aff' },
          500: { value: '#a068ff' },
          600: { value: '#8a59e5' },
          700: { value: '#6e45cc' },
          800: { value: '#4d2f99' },
          900: { value: '#2d1a66' },
        },
        secondary: {
          50: { value: '#e7f1ff' },
          100: { value: '#c7e2ff' },
          200: { value: '#a8d3ff' },
          300: { value: '#89c3ff' },
          400: { value: '#6cb2ff' },
          500: { value: '#519fff' },
          600: { value: '#3d8ce6' },
          700: { value: '#2d6fbd' },
          800: { value: '#1d4f8a' },
          900: { value: '#102d59' },
        },
      },
      fonts: {
        body: { value: 'Poppins, sans-serif' },
        heading: { value: 'Poppins, sans-serif' },
      },
    },
  },
});

export default createSystem(defaultConfig, customTheme);
