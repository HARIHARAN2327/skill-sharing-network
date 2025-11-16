import React from "react";

function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 my-3">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`btn ${active === cat ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
