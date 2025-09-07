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
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onBack: () => void;
};

export default function Checkout({ products, cart, setCart, onBack }: CheckoutProps) {
  const cartItems = products.filter((p) => cart[p.id]);
  const total = cartItems.reduce(
    (sum, p) => sum + (cart[p.id] || 0) * p.price,
    0
  );

  return (
    <main className="container-lg py-4">
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
            {cartItems.map((p) => {
              const imgSrc = p.image_url || p.imageUrl;
              return (
                <tr key={p.id}>
                  <td>
                    <div className="d-flex flex-column align-items-center">
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={p.name}
                          style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, marginBottom: 4 }}
                        />
                      )}
                      <div>{p.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary px-2"
                        style={{ minWidth: 28 }}
                        onClick={() => {
                          setCart((prev) => {
                            const qty = (prev[p.id] || 0) - 1;
                            if (qty <= 0) {
                              const { [p.id]: _, ...rest } = prev;
                              return rest;
                            }
                            return { ...prev, [p.id]: qty };
                          });
                        }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ minWidth: 24, textAlign: "center" }}>{cart[p.id]}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary px-2"
                        style={{ minWidth: 28 }}
                        onClick={() => {
                          setCart((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));
                        }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>${((cart[p.id] || 0) * p.price).toFixed(2)}</td>
                </tr>
              );
            })}
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
    </main>
  );
}
