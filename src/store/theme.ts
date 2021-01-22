import { dark, light, ThemeAttributes } from 'styles/themes'

import { createSlice } from '@reduxjs/toolkit'

const localTheme = localStorage.getItem('theme')

const initialState: ThemeAttributes = localTheme === 'light' || !localTheme ? light : dark

const Theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: state => {
      localStorage.setItem('theme', state.name === 'light' ? 'dark' : 'light')
      return state.name === 'light' ? dark : light
    },
  },
})

export type ThemeState = ThemeAttributes

export const ThemeActions = Theme.actions

export default Theme
