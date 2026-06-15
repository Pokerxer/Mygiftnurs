"use client"

import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { addItem, applyPromo, removePromo, markForRemoval, confirmRemoval, GIFT_WRAP_PRICE, FREE_SHIPPING_THRESHOLD } from "@/store/slices/cartSlice"
import type { RootState } from "@/store/index"
import type { Product } from "@/types"

export function useCart() {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const promo = useSelector((state: RootState) => state.cart.promo)
  const removingIds = useSelector((state: RootState) => state.cart.removingIds)

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const giftWrapTotal = items.filter(i => i.giftWrap).reduce((sum, i) => sum + i.qty * GIFT_WRAP_PRICE, 0)

  const promoDiscount = promo
    ? promo.code === "GIFTFREE"
      ? giftWrapTotal
      : subtotal * (promo.discount / 100)
    : 0

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15000
  const total = subtotal + giftWrapTotal - promoDiscount + shipping
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  const add = (product: Product, qty: number = 1, giftWrap: boolean = false) => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
        stock: product.stock,
        giftWrap,
      })
    )
    const msg = qty > 1 ? `Added ${qty} to cart ✓` : "Added to cart ✓"
    toast.success(msg, { description: product.name })
  }

  const removeWithAnimation = (productId: string, itemName: string) => {
    dispatch(markForRemoval(productId))
    setTimeout(() => {
      dispatch(confirmRemoval(productId))
    }, 300)
    toast.info(`Removed ${itemName}`, {
      action: {
        label: "Undo",
        onClick: () => {
          // re-add would need the full item — for now just dismiss
        },
      },
    })
  }

  const setPromo = (code: string) => {
    dispatch(applyPromo(code))
  }

  const clearPromo = () => {
    dispatch(removePromo())
  }

  return {
    items,
    count,
    subtotal,
    giftWrapTotal,
    promo,
    promoDiscount,
    shipping,
    total,
    freeShippingProgress,
    amountToFreeShipping,
    removingIds,
    add,
    removeWithAnimation,
    setPromo,
    clearPromo,
  }
}
