// src/components/ProductCategory.jsx
import { useParams } from "react-router-dom";

const productData = {
  poultry: [
    { name: "Whole Chicken", desc: "Frozen whole chicken" },
    { name: "Chicken Wings", desc: "Frozen wings packed fresh" },
    { name: "Chicken Drumsticks", desc: "Frozen drumsticks ready for cooking" },
  ],
  beef: [
    { name: "Beef Snout", desc: "Premium frozen beef snout", image:'/tripe.jpg'},
    { name: "Beef Ribs", desc: "Frozen ribs for grilling" },
    { name: "Beef Brisket", desc: "Frozen brisket cut" },
  ],
  seafood: [
    { name: "Hake", desc: "Frozen Hake 15+" },
    { name: "Jack Mackerel", desc: "Frozen shrimp" },
    { name: "Shellfish", desc: "Frozen assorted shellfish" },
  ],
};

export default function ProductCategory() {
  const { category } = useParams();
  const products = productData[category] || [];

  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-semibold text-navy capitalize">
        {category} Products
      </h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.name} className="p-6 border rounded bg-ice">
            <h3 className="text-lg font-semibold text-navy">{p.name}</h3>
            <p className="mt-2 text-steel text-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
