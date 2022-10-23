import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { CartItemType } from '../CartItemType'
import { RootState } from '../app/store'
import CartItem from './CartItem'
import { openModal } from '../features/modal/modalSlice'

const CartContainer = () => {
  const { cartItems, total, amount } = useAppSelector(
    (store: RootState) => store.cart,
  )
  const dispatch = useAppDispatch()

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item: CartItemType) => {
          return <CartItem key={item.id} item={item} />
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          Clear Cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
