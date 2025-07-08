import { useGetLatestProducts } from "@/api/product";
import EcommerceNavbar from "@/components/Nav2";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router";

function NewArrivals() {
  const { data, isError } = useGetLatestProducts();

  if (isError) {
    return (
      <div>
        Unable to reterive data! Try again later{" "}
        <Link to={"/"} className="text-blue-800 font-bold underline">
          Home
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        Unable to reterive data! Try again later{" "}
        <Link to={"/"} className="text-blue-800 font-bold underline">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <EcommerceNavbar />
      <ProductCard products={data.data.products} />
    </div>
  );
}

export default NewArrivals;
