import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ShopState {
  sId: number | null
}

const initialState: ShopState = {
  sId: null
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopId: (state, action: PayloadAction<number>) => {
      state.sId = action.payload
    }
  }
})

export const { setShopId } = shopSlice.actions
export default shopSlice.reducer