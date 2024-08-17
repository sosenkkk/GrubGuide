import Link from "next/link";
import { AiFillInfoCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

import { countryCurrencyMap } from "../../utils/countryCode";

export default function RestaurantCard(props) {
  function numberWithCommas(x) {
    return x.toLocaleString("en-IN");
  }
  const filledStars = Math.floor(props.rating);
  const emptyStars = 5 - filledStars;
  const cuisineArray = props.cuisines
    .split(",")
    .map((cuisine) => cuisine.trim());
    const countryInfo = countryCurrencyMap[props.countryCode];
  return (
    <>
      <div className="w-full hover:scale-105 dark:bg-[#202020]  rounded-lg shadow-lg    productContainer  ">
        <div className="px-5 productName">
          <div className="flex justify-between items-center">
            <Link href={`/restaurants/${props.id}`}>
              <h5 className="text-2xl hover:underline font-semibold tracking-tight text-gray-800 dark:text-gray-200">
                {props.name}
              </h5>
            </Link>
            <h6 className=" text-gray-500 dark:text-gray-400">{props.model}</h6>
          </div>
          <h6 className="text-sm text-gray-500 dark:text-gray-400 text-right">
            Price for two - {countryInfo.currency} {numberWithCommas(props.price)}
          </h6>

          <span className="text-gray-800 dark:text-gray-200 opcaity-75 mb-2  text-sm">
            <CiLocationOn size={24} style={{ display: "inline" }} />
            {props.location}
          </span>
          <div className="flex items-center justify-between sm:flex-col productprice">
            <span className="text-3xl font-bold  text-gray-800 dark:text-gray-200"></span>
          </div>
          <div className="flex flex-wrap gap-2 ">
            {cuisineArray.map((cuisine, index) => (
              <span
                key={index}
                className="border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 px-3 py-1 text-xs rounded-full bg-transparent"
              >
                {cuisine}
              </span>
            ))}
          </div>
          <div className="flex items-center w-full justify-end pb-4">
            {[...Array(filledStars)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}

            {[...Array(emptyStars)].map((_, i) => (
              <svg
                key={i + filledStars}
                className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <p
              className={`ms-1 text-sm font-medium ${
                props.rating >= 4.5
                  ? "text-green-800"
                  : props.rating >= 4
                  ? "text-green-600"
                  : props.rating >= 3
                  ? "text-yellow-500"
                  : props.rating >= 2
                  ? "text-orange-500"
                  : "text-red-500"
              } dark:text-gray-400`}
            >
              {props.rating.toFixed(2)}
            </p>
          </div>
          <Link
            href={`/restaurants/${props.id}`}
            className="cartBtn cartBtnWidth"
          >
            <span className="cartIconContainer">
              <AiFillInfoCircle />
            </span>
            <p className="text">Details</p>
          </Link>
        </div>
      </div>
    </>
  );
}
