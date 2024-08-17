import { useState, useEffect } from "react";
import { Select, SelectItem, Input, Button, Divider } from "@nextui-org/react";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/router";
import { sortCategory } from "../../utils/countryOnlyCode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsSearch } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";

export default function ProductBar(props) {
  const router = useRouter();
  const [range, setRange] = useState(5);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [sea, setsea] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [minSp, setMinSp] = useState(0);
  const [maxSp, setMaxSp] = useState(1000000);
  
  const resetHandler = () => {
    
    router.reload();
    
  };

  useEffect(() => {
    const { latitude, longitude, radius, search,cuisine,minSpend, maxSpend } = router.query;
    if (latitude) setLat(latitude);
    if (longitude) setLong(longitude);
    if (radius) setRange(radius);
    if (search) setsea(search);
    if (cuisine) setSelectedCuisine(cuisine);
    if (minSpend) setMinSp(minSpend);
    if (maxSpend) setMaxSp(maxSpend);
  }, [router.query]);

  const searchByDistance = (event) => {
    event.preventDefault();
    if (range && lat && long) {
      props.searchByDistance({ range: range, lat, long });
    } else {
      toast.error("Please enter latitude, longitude and range altogether.");
    }
  };
  const handleSliderChangeEnd = () => {
    
      props.onPriceChange({ minSp, maxSp });
    
    
  };
  

  const countryChangeHandler = (event) => {
    console.log(event.target.value);
    setSelectedCountry(event.target.value);
    props.onCountry(event.target.value);
  };

  

  const searchHandler = (e) => {
    if (document.getElementById("search-box").value.trim().length === 0) {
      console.log("Enter Something to search.");
    } else {
      let search = document.getElementById("search-box").value.trim();
      props.onsearchName({ search: search });
    }
  };

  const cuisineHandler = (e) => {
    if (document.getElementById("cuisine").value.trim().length === 0) {
      console.log("Enter Something to search.");
    } else {
      let cuisine = document.getElementById("cuisine").value.trim();
      props.onsearchCuisine({ cuisine: cuisine });
    }
  };
  const filterHideHandler=()=>{
    document.getElementById("filter_options").classList.toggle("hidden");
  }
  return (
    <>
    <Button className="flex sm:hidden mx-auto" onClick={filterHideHandler}>Filter Options <RiArrowDownSLine size={20} className="pt-1" /> </Button>
    <div id="filter_options" className="w-100 relative hidden sm:flex  bg-white dark:bg-[#171717] rounded-xl dark:text-white flex flex-wrap gap-4 max-w-xs mx-auto  p-2 flex-row">
       <p className="text-center hidden sm:flex w-full">Filter Options  </p>
      <div className="w-full flex justify-end">
        <Input
          className="max-w-lg"
          id="search-box"
          value={sea}
          onChange={(e) => setsea(e.target.value)}
          placeholder="Search Restraunt by name."
          startContent={<BsSearch />}
        />
        <Button  type="submit" className="text-white  bg-green-400 dark:bg-green-800 ml-2"  onClick={searchHandler}>
          Search
        </Button>
      </div>
      <Divider />
      <Select
        onChange={countryChangeHandler}
        size="sm"
        label="Select Country"
        // className="max-w-xs "
        selectedKeys={props.selectedCountry ? [props.selectedCountry] : ""}
        placeholder="Select Country"
      >
        {sortCategory.map((category) => (
          <SelectItem
            className=" dark:text-white"
            key={category.value}
            value={category.value}
          >
            {category.label}
          </SelectItem>
        ))}
      </Select>
      <div className="w-full flex justify-end">
        <Input
          
          id="cuisine"
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          placeholder="Search cuisines."
          startContent={<BsSearch />}
        />
        <Button type="submit" className="text-white  bg-green-400 dark:bg-green-800 ml-2" onClick={cuisineHandler}>
          Search
        </Button>
      </div>
      <Divider />
      <form
        onSubmit={searchByDistance}
        className=" flex flex-col  w-full  gap-2"
      >
        <Slider
          id="range-slider"
          label={`Range: ${range} km`}
          step={0.5}
          maxValue={100}
          minValue={0}
          color="success"
          value={range}
          onChange={(value) => setRange(value)}
          className="min-w-[200px]  "
        />

        <Input
          className="min-w-[200px]  "
          type="number"
          label="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <Input
          className="min-w-[200px]  "
          type="number"
          label="Longitude"
          value={long}
          onChange={(e) => setLong(e.target.value)}
        />
        <Button className="mt-2 min-w-[70px]  bg-green-400 text-white dark:bg-green-800" type="submit">
          Search
        </Button>
      </form>
      <Slider
          id="min-slider"
          label={`Price: ${minSp}`}
          step={10}
          maxValue={100000}
          minValue={0}
          color="success"
          value={minSp}
          onChange={(value) => setMinSp(value)}
          className="min-w-[200px]  "
          onChangeEnd={handleSliderChangeEnd}
        />
        <Slider
          id="max-slider"
          label={`Price: ${maxSp}`}
          step={10}
          maxValue={1000000}
          minValue={1}
          color="success"
          value={maxSp}
          onChange={(value) => setMaxSp(value)}
          className="min-w-[200px] "
          onChangeEnd={handleSliderChangeEnd}
        />
        <Button onClick={resetHandler} className="text-white w-full bg-green-400 dark:bg-green-800">Reset Filters</Button>
      
      <ToastContainer />
    </div>
    </>
  );
}
