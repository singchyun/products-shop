import React from "react";

interface ImageModalProps {
  url: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ url, alt, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        zIndex: 4000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <img
        src={url}
        alt={alt}
        style={{
          maxWidth: "90vw",
          maxHeight: "80vh",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 2px 24px rgba(0,0,0,0.25)",
          padding: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default ImageModal;
