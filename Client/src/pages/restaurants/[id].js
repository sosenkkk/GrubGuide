import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/baseUrl";
import { Spinner } from "@nextui-org/react";
import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar, FaCheck, FaTimes } from "react-icons/fa";
import { countryCurrencyMap } from "../../../utils/countryCode";
import dynamic from "next/dynamic";

// Dynamically import the StaticMap component with SSR disabled
const StaticMap = dynamic(() => import("../../../components/MapComponent"), {
  ssr: false,
});
import Head from "next/head";

const RestaurantDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await fetch(BASE_URL + `/api/restaurant/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch restaurant details");
          }
          const data = await response.json();
          setRestaurant(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchRestaurant();
    }
  }, [id]);
  const featureClass = (value) => (value ? "text-green-500" : "text-red-500");

  return (
    <>
      <Head>
        <title>GrubGuide - Restaurants</title>
      </Head>
      {loading && (
        <div className="min-h-screen pt-20 transition-colors bg-[#ffffff] dark:bg-[#171717]  p-4 sm:px-8 py-0 flex items-center justify-around">
          <Spinner size="lg" color="success" />
        </div>
      )}
      {!loading && (
        <div className="min-h-screen pt-12 transition-colors max-w-screen-xl  bg-[#ffffff] dark:bg-[#171717] m-auto p-4 sm:px-8 pb-4 flex justify-around">
          <div
            id="bg-wallpaper"
            className="absolute min-h-[360px] opacity-85 dark:opacity-70 "
          ></div>

          <Card className=" w-full shadow-2xl h-fit sm:w-3/4 mt-12">
            <CardHeader className="flex  gap-3">
              <div className="flex  w-full flex-col">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl pl-2 sm:pl-4 ">
                    {restaurant.Restaurant_Name}
                  </p>
                  <div>
                    <div
                      className={`ms-1 p-1 flex items-center max-w-[40px] rounded  font-medium ${
                        restaurant.Aggregate_rating >= 4.5
                          ? "bg-green-800"
                          : restaurant.Aggregate_rating >= 4
                          ? "bg-green-600"
                          : restaurant.Aggregate_rating >= 3
                          ? "bg-yellow-500"
                          : restaurant.Aggregate_rating >= 2
                          ? "bg-orange-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {restaurant.Aggregate_rating}{" "}
                      <FaStar size={12} style={{ display: "inline" }} />
                    </div>
                    <span>{restaurant.Votes} votes</span>
                  </div>
                </div>
                <div className="flex my-2 flex-wrap gap-2 ">
                  {restaurant.Cuisines.split(",").map((cuisine, index) => (
                    <span
                      key={index}
                      className="border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 px-3 py-1  rounded-full bg-transparent"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
                <span className="text-gray-800 dark:text-gray-200 opcaity-75 mb-2  text-sm">
                  <CiLocationOn size={24} style={{ display: "inline" }} />
                  {restaurant.Address}
                </span>
                <div className="mb-4">
                  <p className="text-gray-700">
                    Average Cost for Two:{" "}
                    <span className="font-semibold">
                      {" "}
                      {countryCurrencyMap[restaurant.Country_Code].currency}
                      {restaurant.Average_Cost_for_two}
                    </span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="mb-4 flex flex-col md:flex-row items-center md:items-start flex-wrap md:flex-nowrap justify-between ">
                <div className="w-full md:w-1/2 pb-4 px-12 md:px-2">
                  <h3 className="text-lg font-semibold">Features:</h3>
                  <ul className="space-y-2 mt-2">
                    <li
                      className={`flex items-center ${featureClass(
                        restaurant.Has_Table_booking
                      )}`}
                    >
                      {restaurant.Has_Table_booking ? <FaCheck /> : <FaTimes />}
                      <span className="ml-2">Table Booking</span>
                    </li>
                    <li
                      className={`flex items-center ${featureClass(
                        restaurant.Has_Online_delivery
                      )}`}
                    >
                      {restaurant.Has_Online_delivery ? (
                        <FaCheck />
                      ) : (
                        <FaTimes />
                      )}
                      <span className="ml-2">Online Delivery</span>
                    </li>
                    <li
                      className={`flex items-center ${featureClass(
                        restaurant.Is_Delivering_now
                      )}`}
                    >
                      {restaurant.Is_Delivering_now ? <FaCheck /> : <FaTimes />}
                      <span className="ml-2">Delivering Now</span>
                    </li>
                    <li
                      className={`flex items-center ${featureClass(
                        restaurant.Switch_to_order_menu
                      )}`}
                    >
                      {restaurant.Switch_to_order_menu ? (
                        <FaCheck />
                      ) : (
                        <FaTimes />
                      )}
                      <span className="ml-2">Switch to Order Menu</span>
                    </li>
                  </ul>
                </div>
                <StaticMap
                  lat={restaurant.Location.coordinates[1]}
                  lng={restaurant.Location.coordinates[0]}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default RestaurantDetail;
