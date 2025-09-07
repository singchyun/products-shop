import React from "react";

export interface ProductFormModalProps {
  show: boolean;
  mode: "create" | "edit";
  product: {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    enabled: boolean;
    image_url?: string;
  } | null;
  error: string | null;
  onChange: (product: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ show, mode, product, error, onChange, onSubmit, onClose }) => {
  if (!show || !product) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          minWidth: 320,
          maxWidth: 400,
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>{mode === "create" ? "Create Product" : "Edit Product"}</h4>
        <form onSubmit={onSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              required
              value={product.name}
              onChange={(e) => onChange({ ...product, name: e.target.value })}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              required
              value={product.description}
              onChange={(e) => onChange({ ...product, description: e.target.value })}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Price (in SGD)</label>
            <input
              type="number"
              className="form-control"
              required
              min={0}
              step={0.01}
              value={product.price}
              onChange={(e) => onChange({ ...product, price: parseFloat(e.target.value) })}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              required
              min={0}
              value={product.stock_quantity}
              onChange={(e) => onChange({ ...product, stock_quantity: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">
              Image URL <span style={{ fontWeight: 400, color: "#888", fontSize: 12 }}>(optional)</span>
            </label>
            <input
              className="form-control"
              type="url"
              placeholder=""
              value={product.image_url ?? ""}
              onChange={(e) => onChange({ ...product, image_url: e.target.value })}
            />
          </div>
          <div className="mb-3 text-start">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="enabledCheckbox"
                checked={!!product.enabled}
                onChange={(e) => onChange({ ...product, enabled: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="enabledCheckbox">
                Enabled on shop front
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "create" ? "Create" : "Save"}
            </button>
          </div>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
