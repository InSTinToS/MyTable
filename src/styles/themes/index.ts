import light from './light'
import dark from './dark'

export { light, dark }

export interface ThemeAttributes {
  name: string

  colors: {
    primary: string
    secondary: string
    tertiary: string
  }
}
