import React from 'react'
import { CartItemType } from '../CartItemType'
import { ChevronDown, ChevronUp } from '../icons'
import { removeItem, increase, decrease } from '../features/cart/cartSlice'
import { useAppDispatch } from '../app/hooks'

interface Props {
  item: CartItemType
}

const CartItem = ({ item }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <article className="cart-item">
      <img src={item.img} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <h4 className="item-price">${item.price}</h4>
        <button
          className="remove-btn"
          onClick={() => dispatch(removeItem(item.id))}
        >
          Remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase(item.id))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{item.amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (item.amount === 1) {
              dispatch(removeItem(item.id))
            } else {
              dispatch(decrease(item.id))
            }
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem
