import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "product 1" },
  { id: "p2", title: "product 2" },
  { id: "p3", title: "product 3" },
];

export default function Products() {
  return (
    <>
      <h1>The Proucuts Pages</h1>
      <ul>
        {PRODUCTS.map((pro) => (
          <li key={pro.id}>
            <Link to={pro.id}>{pro.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
