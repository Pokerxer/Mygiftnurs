import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { WishlistItem } from "@/types"

interface WishlistState {
  items: WishlistItem[]
  isDrawerOpen: boolean
  removingIds: string[]
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    isDrawerOpen: false,
    removingIds: [],
  } as WishlistState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const product = action.payload
      const index = state.items.findIndex((i) => i.id === product.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(product)
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
      state.removingIds = state.removingIds.filter((id) => id !== action.payload)
    },
    markForRemoval(state, action: PayloadAction<string>) {
      if (!state.removingIds.includes(action.payload)) {
        state.removingIds.push(action.payload)
      }
    },
    confirmRemoval(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
      state.removingIds = state.removingIds.filter((id) => id !== action.payload)
    },
    clearWishlist(state) {
      state.items = []
      state.removingIds = []
    },
    hydrateWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload
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
  toggleWishlist,
  removeFromWishlist,
  markForRemoval,
  confirmRemoval,
  clearWishlist,
  hydrateWishlist,
  toggleDrawer,
  openDrawer,
  closeDrawer,
} = wishlistSlice.actions
export default wishlistSlice.reducer
