import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/baseUrl";
import ProductBar from "../../../components/Header/ProductBar";
import { Pagination, Spinner, Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import RestaurantCard from "../../../components/Card/productCard";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState(router?.query.search);
  const [cuisine, setcuisine] = useState("");
  const [sort, setSort] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [range, setRange] = useState("");
  const [searchByArea, setSearchByArea] = useState(false);
  const [country, setCountry] = useState("");
  const [minSpend, setMinSpend] = useState(0);
  const [maxSpend, setMaxSpend] = useState(1000000);

  const isValidLatitude = (lat) => {
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
  };

  const isValidLongitude = (long) => {
    const num = parseFloat(long);
    return !isNaN(num) && num >= -180 && num <= 180;
  };
  const fetchProducts = async () => {
    let uri = `${BASE_URL}/api/restaurants?page=${page}`;

    if (search) uri += `&search=${search}`;
    if (cuisine) uri += `&cuisines=${cuisine}`;
    if (country) uri += `&country=${country}`;
    if (lat && long && range) {
      uri += `&latitude=${lat}&longitude=${long}&radius=${range}`;
    }
    if (minSpend) uri += `&minSpend=${minSpend}`;
    if (maxSpend) uri += `&maxSpend=${maxSpend}`;

    console.log(uri);

    try {
      const result = await fetch(uri);
      const res = await result.json();
      if (result.status === 200) {
        setRestaurants(res.restaurants);
        setTotalPage(res.totalPages);
        setProductsLoaded(true);
      } else {
        toast.error("Failed to fetch products: ", res);
        console.error("Failed to fetch products:", res);
      }
    } catch (error) {
      toast.error("Failed to fetch products: ", res);
      console.error("Error fetching products:", error);
    }
  };

  

  useEffect(() => {
    if (router.isReady) {
      setProductsLoaded(false);
      
      fetchProducts();

      router.push(
        {
          pathname: router.pathname,
          query: {
            page,
            country,
            search,
            cuisine,
            latitude: lat,
            longitude: long,
            radius: range,
            minSpend,
            maxSpend,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [
    page,
    country,
    search,
    lat,
    cuisine,
    minSpend,
    maxSpend,
    long,
    range,
    router.isReady,
  ]);

  const paginationHandler = (event) => {
    setPage(event);
  };

  const changeProductsHandler = ({ range, lat, long }) => {
    const isRangeValid = !isNaN(parseFloat(range)) && isFinite(range);
    const isLatValid = isValidLatitude(lat);
    const isLongValid = isValidLongitude(long);

    if (isRangeValid && isLatValid && isLongValid) {
      setRange(range);
      setLat(lat);
      setLong(long);
      setSearchByArea(true);
    } else {
      toast.error("Invalid range, latitude, or longitude values.");
      console.error("Invalid range, latitude, or longitude values.");
    }
  };

  const searchHandler = ({ search }) => {
    if (search.trim().length != 0) {
      setSearch(search);
    }
  };
  const cuisineHandler = ({ cuisine }) => {
    if (cuisine.trim().length != 0) {
      setcuisine(cuisine);
    }
  };

  const countryHandler = (event) => {
    setCountry(event);
    setPage(1);
  };

  const priceHandler = ({ minSp, maxSp }) => {
    console.log(minSp, maxSp);
    if (parseInt(minSp) <= parseInt(maxSp)) {
      setMinSpend(minSp);
      setMaxSpend(maxSp);
    } else {
      toast.error("Invalid range values for min and max spend.");
    }
  };

  return (
    <>
      <Head>
        <title>GrubGuide - Restaurants</title>
      </Head>

      <div className="pt-[240px] min-h-screen transition-colors md:pt-[250px] bg-[#f9f9f9] dark:bg-[#171717] p-4 sm:px-8 py-0">
        <div
          id="bg-wallpaper"
          className="absolute min-h-[260px] opacity-85 dark:opacity-70 "
        ></div>

        <div className="flex-wrap sm:flex-nowrap flex gap-2 w-full">
          <div className=" w-full sm:w-1/4 min-w-[250px] mt-8">
            <ProductBar
              searchByDistance={changeProductsHandler}
              onCountry={countryHandler}
              selectedCountry={country}
              onsearchName={searchHandler}
              onsearchCuisine={cuisineHandler}
              onPriceChange={priceHandler}
            />
          </div>
          {productsLoaded ? (
            <div className=" w-full sm:w-3/4 mt-8 gap-4 gap-y-8 productContainerHolder">
              {restaurants.length != 0 &&
                restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant._id}
                    id={restaurant.Restaurant_ID}
                    countryCode={restaurant.Country_Code}
                    name={restaurant.Restaurant_Name}
                    cuisines={restaurant.Cuisines}
                    rating={restaurant.Aggregate_rating}
                    price={restaurant.Average_Cost_for_two}
                    location={`${restaurant.Address}`}
                  />
                ))}
              {restaurants.length == 0 && (
                <div className="flex flex-col gap-2 p-8">
                  <div className="text-3xl font-bold">
                    {" "}
                    No Restraunts found.
                  </div>
                  <div className="text-2xl opacity-80">
                    {" "}
                    Try changing filter values.
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="min-h-screen  transition-colors  bg-[#f9f9f9] dark:bg-[#171717] flex  w-full  md:w-3/4 items-center justify-around">
              <Spinner size="lg" color="success" />
            </div>
          )}
        </div>
        {
          totalPage != 0 && (
            <div className="flex justify-center py-4 bg-[#f9f9f9]  dark:bg-[#171717] transition">
          <Pagination
            showShadow
            color="success"
            total={totalPage}
            initialPage={1}
            page={page}
            onChange={paginationHandler}
          />
        </div>
          )
        }
        
        <ToastContainer />
      </div>
    </>
  );
}
