import { theme as LightTheme } from './light'

export const colors = {
  background: '#111212',
  text: '#fff',
  primary: '#005CDD',
  secondary: '#6D59F0',
  muted: '#f6f6f9',
  gray: '#888',
  highlight: 'hsla(205, 100%, 40%, 0.125)',
  black: '#FFF',
  white: '#111212',
}

export const theme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    ...colors,
  },
}
