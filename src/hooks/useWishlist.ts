"use client"

import { useDispatch, useSelector } from "react-redux"
import {
  toggleWishlist,
  removeFromWishlist,
  markForRemoval,
  confirmRemoval,
  clearWishlist,
  openDrawer,
  toggleDrawer,
} from "@/store/slices/wishlistSlice"
import type { RootState } from "@/store/index"
import type { WishlistItem } from "@/types"

export function useWishlist() {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.wishlist.items)
  const removingIds = useSelector(
    (state: RootState) => state.wishlist.removingIds
  )
  const isDrawerOpen = useSelector(
    (state: RootState) => state.wishlist.isDrawerOpen
  )

  const ids = items.map((i) => i.id)
  const isWishlisted = (productId: string) => ids.includes(productId)

  const toggle = (product: WishlistItem) => {
    dispatch(toggleWishlist(product))
  }

  const remove = (productId: string) => dispatch(removeFromWishlist(productId))

  const removeWithAnimation = (productId: string) => {
    dispatch(markForRemoval(productId))
    setTimeout(() => {
      dispatch(confirmRemoval(productId))
    }, 300)
  }

  const clear = () => dispatch(clearWishlist())
  const openWishlistDrawer = () => dispatch(openDrawer())
  const closeWishlistDrawer = () => dispatch(toggleDrawer())

  return {
    items,
    ids,
    removingIds,
    isDrawerOpen,
    count: items.length,
    isWishlisted,
    toggle,
    remove,
    removeWithAnimation,
    clear,
    openWishlistDrawer,
    closeWishlistDrawer,
  }
}
