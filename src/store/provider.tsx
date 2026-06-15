"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "./index"
import { hydrateWishlist } from "./slices/wishlistSlice"
import type { WishlistItem } from "@/types"

const WISHLIST_KEY = "mygiftnurs_wishlist"

function PersistGate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // migrate old string[] format to WishlistItem[]
          if (parsed.length > 0 && typeof parsed[0] === "string") {
            localStorage.removeItem(WISHLIST_KEY)
          } else {
            store.dispatch(hydrateWishlist(parsed as WishlistItem[]))
          }
        }
      }
    } catch {
      // corrupted storage — start with an empty wishlist
    }

    return store.subscribe(() => {
      const items = store.getState().wishlist.items
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
    })
  }, [])

  return children
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate>{children}</PersistGate>
    </Provider>
  )
}
