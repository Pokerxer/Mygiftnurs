import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const GIFT_WRAP_PRICE = 7500
export const FREE_SHIPPING_THRESHOLD = 112500

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  qty: number
  stock: number
  giftWrap: boolean
}

export interface PromoCode {
  code: string
  discount: number // percentage
  label: string
}

const VALID_PROMOS: Record<string, PromoCode> = {
  WELCOME15: { code: "WELCOME15", discount: 15, label: "15% off" },
  GIFTFREE: { code: "GIFTFREE", discount: 100, label: "Free gift wrap" },
  SAVE10: { code: "SAVE10", discount: 10, label: "10% off" },
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  promo: PromoCode | null
  removingIds: string[] // items currently animating out
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isDrawerOpen: false,
    promo: null,
    removingIds: [],
  } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const payload = action.payload
      const existing = state.items.find(i => i.productId === payload.productId)
      if (existing) {
        existing.qty = Math.min(existing.qty + payload.qty, existing.stock)
        if (payload.giftWrap) existing.giftWrap = true
      } else {
        state.items.push(payload)
      }
    },
    markForRemoval(state, action: PayloadAction<string>) {
      if (!state.removingIds.includes(action.payload)) {
        state.removingIds.push(action.payload)
      }
    },
    confirmRemoval(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.productId !== action.payload)
      state.removingIds = state.removingIds.filter(id => id !== action.payload)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.productId !== action.payload)
      state.removingIds = state.removingIds.filter(id => id !== action.payload)
    },
    updateQty(state, action: PayloadAction<{ productId: string; qty: number }>) {
      const item = state.items.find(i => i.productId === action.payload.productId)
      if (item) {
        item.qty = Math.max(1, Math.min(action.payload.qty, item.stock))
      }
    },
    toggleGiftWrap(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.productId === action.payload)
      if (item) item.giftWrap = !item.giftWrap
    },
    applyPromo(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase().trim()
      state.promo = VALID_PROMOS[code] ?? null
    },
    removePromo(state) {
      state.promo = null
    },
    clearCart(state) {
      state.items = []
      state.promo = null
      state.removingIds = []
    },
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    openDrawer(state) {
      state.isDrawerOpen = true
    },
    closeDrawer(state) {
      state.isDrawerOpen = false
    },
  },
})

export const {
  addItem,
  markForRemoval,
  confirmRemoval,
  removeItem,
  updateQty,
  toggleGiftWrap,
  applyPromo,
  removePromo,
  clearCart,
  toggleDrawer,
  openDrawer,
  closeDrawer,
} = cartSlice.actions
export default cartSlice.reducer
