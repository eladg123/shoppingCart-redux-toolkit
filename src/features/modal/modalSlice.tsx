import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface modalState {
  isOpen: boolean
}

const initialState: modalState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state: modalState) => {
      state.isOpen = true
    },
    closeModal: (state: modalState) => {
      state.isOpen = false
    },
  },
})

export default modalSlice.reducer
export const { openModal, closeModal } = modalSlice.actions
