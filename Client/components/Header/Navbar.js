import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";
import DarkModeToggle from "./ThemeToggle";
import { GrRestaurant } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nearbyUrl, setNearbyUrl]= useState('/');
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Restaurants", link: "/restaurants" },
  ];
  const [userLocation, setUserLocation] = useState(null);
  
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => reject(error)
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };
  const router = useRouter();
  useEffect(() => {
    const fetchLocationAndFilter = async () => {
      try {
        const location = await getUserLocation();
        
        setUserLocation(location);
        setNearbyUrl(`/restaurants/nearby?latitude=${location.lat}&longitude=${location.lon}&radius=70`);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocationAndFilter();
  }, []);
  const navigateHandler = () => {
    console.log('Navigating with URL:', nearbyUrl);
    router.push(nearbyUrl);
  };
  return (
    <>
      <div className="mobileNavbar">
        <Navbar
          isBordered
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="sm:hidden " justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="start">
            <NavbarBrand>
              <Link href="/" className="font-bold  text-inherit">
                GrubGuide
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="end">
          <NavbarItem>
              <button
                className="text-green-600 dark:text-[#41B06E] "
                onClick={navigateHandler}
              >
                Near By <GrRestaurant style={{ display: "inline" }} />
              </button>
            </NavbarItem>
            <NavbarItem>
              <DarkModeToggle />
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.name}-${index}`}>
                <Link
                  className="w-full"
                  color={
                    index === 2
                      ? "warning"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href={item.link}
                  size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
      <div className="pcNavbar hidden shadow-xl">
        <Navbar>
          <NavbarBrand>
            <Link
              href="/"
              className="font-bold text-xl text-green-600 dark:text-[#41B06E] "
            >
              GrubGuide
            </Link>
          </NavbarBrand>
          <NavbarContent
            className=" flex gap-4"
            justify="center"
          ></NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Link className="text-green-600 dark:text-[#41B06E]" href="/">
                Home
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link
                className="text-green-600 dark:text-[#41B06E]"
                href="/restaurants"
              >
                Restaurants
              </Link>
            </NavbarItem>
            <NavbarItem>
              <button
                className="text-green-600 dark:text-[#41B06E] "
                onClick={navigateHandler}
              >
                Near By <GrRestaurant style={{ display: "inline" }} />
              </button>
            </NavbarItem>
            <NavbarItem>
              <DarkModeToggle />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
}
