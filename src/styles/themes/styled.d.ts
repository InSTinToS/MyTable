/* eslint-disable @typescript-eslint/no-empty-interface */
import { ThemeAttributes } from './index'

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeAttributes {}
}
