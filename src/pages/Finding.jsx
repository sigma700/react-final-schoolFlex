import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { Form, Link } from "react-router-dom";
import { Slidetabs } from "./components/navbar-lg";
import { useRef } from "react";

export default function Finding() {
  const [schools, setSchools] = useState([]);
  const [collection, setCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const bgImageRef = useRef(null);
  // const apiUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const img = new Image();
    img.src = "/milad-fakurian-GJKx5lhwU3M-unsplash.jpg";
    img.onload = () => setBgLoaded(true);
    bgImageRef.current = img;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const backUrl = import.meta.env.VITE_BACKEND_URL;
        console.log(backUrl);

        const url = searchQuery
          ? //INTRODUCE REACT HOOK FOR DEBOUNCE
            `${backUrl}/api/schools/search-exact?name=${encodeURIComponent(
              searchQuery
            )}`
          : `${backUrl}/api/schools`;

        const response = await fetch(url);
        console.log(response);

        if (!response.ok) throw new Error("Network response was not ok");

        const { data } = await response.json();
        console.log("data", data);

        // Adjust this block to handle both array, object, and nested array responses
        let schoolsArray = [];
        if (Array.isArray(data)) {
          schoolsArray = data;
        } else if (Array.isArray(data.data)) {
          schoolsArray = data.data;
        } else if (data && typeof data === "object") {
          schoolsArray = [data];
        }

        setSchools(schoolsArray);

        console.log(schoolsArray);

        // console.log(schools.dat);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]); // runs again when search Query exists

  //function for handling submissions
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");
    setSearchQuery(query);
  };

  //function for adding to collection

  const addToCollection = async (school) => {
    try {
      const response = await fetch("http://localhost;4000/api/collections", {
        method: "POST",
        headers: {
          "Content-Type ": "application/json",
        },
        body: JSON.stringify({ schoolId: school._id }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to add to collection");
      }
      setCollection((prev) => [...prev, school]);
      alert(`${school.name} added to collections`);
    } catch (error) {
      console.error("Error adding school to the collections");
      alert("Failed to add to collection");
    }
  };

  return (
    <main
      className={`bg-[#fbf4da] h-full text-black relative ${
        bgLoaded ? "" : "bg-gray-200"
      }`}
    >
      {!bgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="loader"></div>
        </div>
      )}
      <style>
        {`
          main {
            min-height: full;
            width: 100vw;
            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin: 0;
            padding: 0;
            opacity : ${bgLoaded ? 1 : 0}
          }
          
          /* Added loader styles */
          .loader {
            width: 48px;
            height: 48px;
            border: 5px solid rgba(0, 24, 34, 0.2);
            border-bottom-color: #001822;
            border-radius: 50%;
            display: inline-block;
            animation: rotation 1s linear infinite;
          }
          
          @keyframes rotation {
            0% { transform: rotate(0deg) }
            100% { transform: rotate(360deg) }
          }
          
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            width: 100%;
          }
        `}
      </style>
      <div className="flex gap-[3px] items-center">
        <h1 className="lg:p-[10px] lg:text-[30px]">
          Edu<span className="text-blue-700 font-bold text-[35px]">Find</span>
        </h1>
        <div>
          <Link to={"/"}>
            <img
              className="w-[60px] rounded-[50%] border"
              src="Gemini_Generated_Image_17nrxp17nrxp17nr.png"
              alt="logo for the website"
            />
          </Link>
        </div>
      </div>
      <Navbar />
      {/* <NavLarge /> */}

      <div className="mt-[30px]">
        <Form
          onSubmit={handleSearchSubmit}
          method="post"
          action=""
          className="ml-[20px] flex items-center gap-[20px] lg:gap-[10px] text-white lg:justify-center"
        >
          <input
            className="p-[10px] bg-[#001822] rounded-[10px] lg:w-[500px] lg:p-[10px]"
            type="text"
            placeholder="Enter school name"
            name="search"
            defaultValue={searchQuery}
          />
          <button
            className="bg-white p-[10px] rounded-[50%] border border-black lg:hover:cursor-pointer lg:hover:bg-transparent lg:rounded-[10px] lg:hover:rounded-[50%] lg:hover:transition-all lg:hover:duration-[0.3s] duration-[0.4s]"
            type="submit"
          >
            <img src="/search.svg" alt="" />
          </button>
          <div className="hidden lg:flex gap-[10px]">
            <Slidetabs />
            {/* <Toggler /> */}
          </div>
        </Form>
        <div>
          {schools.length > 0 && searchQuery && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto mt-[30px] h-full">
              <h2 className="text-2xl font-bold mb-4">{schools[0].name}</h2>
              {schools[0].images?.length > 0 && (
                <img
                  src={schools[0].images[0]}
                  alt={`${schools[0].name} - Cover`}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              )}
              <p className="mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {schools[0].description || "No description available"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {schools[0].location.county || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Type:</span>{" "}
                {schools[0].type || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Minimum fee: </span> KES{" "}
                {schools[0].fee.min || "N/A"}
              </p>
              {/* Add more fields as needed */}
              <button className="bg-[#e1eaeb] p-[10px] rounded-[10px] font-light border hover:bg-[#001822] hover:text-white hover:border hover:border-none hover:transition-colors hover:duration-[0.4s] hover:cursor-pointer duration-[0.3s] mt-4">
                Add to collection
              </button>
            </div>
            // <div className="space-y-6">
            //   {schools.map((school) => (
            //     <div
            //       key={school._id}
            //       className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto"
            //     >
            //       <h2 className="text-2xl font-bold mb-4">{school.name}</h2>
            //       {school.images?.length > 0 && (
            //         <img
            //           src={school.images[0]}
            //           alt={`${school.name} - Cover`}
            //           className="w-full h-64 object-cover rounded mb-4"
            //         />
            //       )}
            //       <p className="mb-2">
            //         <span className="font-semibold">Description:</span>{" "}
            //         {school.description || "No description available"}
            //       </p>
            //       <p className="mb-2">
            //         <span className="font-semibold">Location:</span>{" "}
            //         {school.location || "N/A"}
            //       </p>
            //       <p className="mb-2">
            //         <span className="font-semibold">Type:</span>{" "}
            //         {school.type || "N/A"}
            //       </p>
            //       <p className="mb-2">
            //         <span className="font-semibold">Founded:</span>{" "}
            //         {school.founded || "N/A"}
            //       </p>
            //       {/* Add more fields as needed */}
            //       <button className="bg-[#e1eaeb] p-[10px] rounded-[10px] font-light border hover:bg-[#001822] hover:text-white hover:border hover:border-none hover:transition-colors hover:duration-[0.4s] hover:cursor-pointer duration-[0.3s] mt-4">
            //         Add to collection
            //       </button>
            //     </div>
            //   ))}
            // </div>
          )}
          <h2 className="text-[30px] text-center mt-[20px]">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "All schools"}
          </h2>

          {isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          ) : error ? (
            <p>Error : {error}</p>
          ) : schools.length > 1 || !searchQuery ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {schools.map((school) => (
                <div
                  key={school._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2">{school.name}</h3>
                  {school.images?.[0] && (
                    <Link to={`/finding/${school._id}`}>
                      <img
                        src={school.images[0]}
                        alt={`${school.name} - Cover`}
                        className="w-full h-48 object-cover rounded hover:opacity-[0.7] hover:cursor-pointer hover:transition-all hover:duration-[0.4s] hover:scale-[1.009]"
                      />
                    </Link>
                  )}
                  <p className="mt-2 text-gray-600">
                    {school.description || "No description available"}
                  </p>
                  <button className="bg-[#e1eaeb] p-[10px] rounded-[10px] font-light border hover:bg-[#001822] hover:text-white hover:border hover:border-none hover:transition-colors hover:duration-[0.4s] hover:cursor-pointer duration-[0.3s]">
                    Add to collection
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex"></div>
    </main>
  );
}
