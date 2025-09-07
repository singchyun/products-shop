import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  image_url?: string;
};

type Cart = { [id: string]: number };

type CheckoutProps = {
  products: Product[];
  cart: Cart;
  onBack: () => void;
};

export default function Checkout({ products, cart, onBack }: CheckoutProps) {
  const cartItems = products.filter((p) => cart[p.id]);
  const total = cartItems.reduce(
    (sum, p) => sum + (cart[p.id] || 0) * p.price,
    0
  );

  return (
    <div className="container py-4">
      <h3>Shopping Cart</h3>
      <button className="btn btn-link mb-3" onClick={onBack}>&larr; Back to Shop</button>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{cart[p.id]}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>${((cart[p.id] || 0) * p.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">Total</td>
              <td className="fw-bold">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <div className="alert alert-info mt-4">
        Payment and order placement coming soon!
      </div>
    </div>
  );
}
