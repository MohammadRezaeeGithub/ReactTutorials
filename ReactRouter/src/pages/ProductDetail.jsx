import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const param = useParams();
  return (
    <>
      <h1>Product Details</h1>
      <p>{param.productId}</p>
    </>
  );
}
