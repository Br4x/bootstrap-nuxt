import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetGrid } from 'unocss-preset-grid'

export default defineConfig({
  safelist: [
    ...Array.from({ length: 13 }, (_, i) => `flex-[0_0_${i}/12]`),
    ...Array.from({ length: 13 }, (_, i) => `sm:flex-[0_0_${i}/12]`),
    ...Array.from({ length: 13 }, (_, i) => `md:flex-[0_0_${i}/12]`),
    ...Array.from({ length: 13 }, (_, i) => `lg:flex-[0_0_${i}/12]`),
    ...Array.from({ length: 13 }, (_, i) => `xl:flex-[0_0_${i}/12]`),
    ...Array.from({ length: 13 }, (_, i) => `max-w-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `sm:max-w-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `md:max-w-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `lg:max-w-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `xl:max-w-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `ml-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `sm:ml-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `md:ml-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `lg:ml-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `xl:ml-${i}/12`),
    ...Array.from({ length: 13 }, (_, i) => `sm:order-${i}`),
    ...Array.from({ length: 13 }, (_, i) => `md:order-${i}`),
    ...Array.from({ length: 13 }, (_, i) => `lg:order-${i}`),
    ...Array.from({ length: 13 }, (_, i) => `xl:order-${i}`),
    ...Array.from({ length: 13 }, (_, i) => `order-${i}`),
  ],
  theme: {
    // ...
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      info: '#17a2b8',
      warning: '#ffc107',
      danger: '#dc3545',
      light: '#f8f9fa',
      dark: '#343a40',
      lightPrimary: '#b8daff',
      lightSecondary: '#d6d8db',
      lightSuccess: '#c3e6cb',
      lightInfo: '#bee5eb',
      lightWarning: '#ffeeba',
      lightDanger: '#f5c6cb',
      lightLight: '#fdfdfe',
      lightDark: '#c6c8ca',
      darkPrimary: '#004085',
      darkSecondary: '#383d41',
      darkSuccess: '#155724',
      darkInfo: '#0c5460',
      darkWarning: '#856404',
      darkDanger: '#721c24',
      darkLight: '#818182',
      darkDark: '#1b1e21',
    },
  },
  shortcuts: [
  ],
  presets: [
    presetGrid(),
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // Include Storybook stories
        'src/**/*.stories.{js,ts}',
        'stories/**/*',
      ],
    },
  },
})
