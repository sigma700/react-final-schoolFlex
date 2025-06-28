import AOS from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./components/loader";
import Footer from "./components/footer";

export function meta() {
  return [
    { title: "Home" },
    { name: "Edufind", content: "Welcome to React Router!" },
  ];
}

//project plan
//Welcome we hope you find a school that fits your preferences
//After that the person needs to begin searching for the prefered school

export default function Home() {
  const [serverData, setBackendData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    console.log(url);

    fetch(`${url}/api/schools/category/${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setBackendData(data);
      });
  }, [selectedCategory]);

  console.log({ serverData });

  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
    });
  });

  //prefetch logic to improve the performance of the website so as to improve the user xperience with ease

  const preFetch = (path) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    link.as = "document";
    document.head.appendChild(link);

    if (path === "/finding") {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
        } /api/schools`
      )
        .then((response) => response.json())
        .catch(() => {});
    }
  };

  return (
    <main>
      <div className=" h-full p-[10px]">
        <div
          className="flex flex-col justify-center items-center h-screen"
          style={{
            backgroundImage: "url('/female-teacher-talking-with-students.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: "0.9",
          }}
        >
          {/* for mobile */}
          <h1 className="text-black text-[30px] lg:text-[40px] mb-[30px] font-extrabold text-center">
            We understand that education is key we simply help you find it
          </h1>
          <p className="text-black text-center m-[10px] font-bold">
            Discover the best schools near your area that fit your{" "}
            <span className="text-white">needs</span>
          </p>
          <div
            data-aos="slide-left"
            className="p-[30px] text-center gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
          >
            <h1 className="text-[30px] text-black">Welcome</h1>
            <small className="text-black text-[20px]">Do you want to : </small>
            <div className="flex gap-[20px] mt-[30px]">
              <Link
                to={"/finding"}
                className="
             text-white bg-black p-[10px] font-bold border-yellow-500 border active:bg-[#00df82] active:border-none active:text-black hover:bg-[#00df82] hover:border-none hover:cursor-pointer hover:transition-colors hover:duration-[0.2s] duration-[0.3s]"
              >
                Find a School
              </Link>
              <Link
                to={"/signup"}
                className="text-white bg-black p-[10px] font-bold border-yellow-500 border active:bg-[#00df82] active:border-none active:text-black hover:bg-[#00df82] hover:border-none hover:cursor-pointer hover:transition-colors hover:duration-[0.2s] duration-[0.3s]"
              >
                List your School
              </Link>
            </div>
          </div>
        </div>

        <h2 className="font-bold text-center lg:text-[30px] mt-[30px]">
          Featured Categories
        </h2>

        <div>
          <form
            className="grid grid-cols-1 gap-[30px] lg:grid-cols-4 lg:gap-[10px] md:grid-cols-2"
            action="post"
          >
            <Input
              type="radio"
              name="SchoolCategory"
              checked={selectedCategory === "Primary"}
              onChange={() => setSelectedCategory("Primary")}
              value="Primary
           "
            >
              <img
                className="w-[400px] h-[400px] object-cover rounded-2xl opacity-[0.8] hover:opacity-[1.0] hover:transition-all hover:duration-[0.3s] duration-[0.3s] hover:scale-[1.007]"
                src="https://images.pexels.com/photos/8088231/pexels-photo-8088231.jpeg"
                alt=""
              />
              <h1 className="font-extrabold text-gray-600 text-[50px] absolute top-1/2 left-1/2 -translate-x-1/2">
                Primary
              </h1>
            </Input>

            <Input
              type="radio"
              name="SchoolCategory"
              checked={selectedCategory === "High School"}
              onChange={() => setSelectedCategory("High School")}
              value="High School
           "
            >
              <img
                className="w-[400px] h-[400px] object-cover rounded-2xl opacity-[0.8] hover:opacity-[1.0] hover:transition-all hover:duration-[0.3s] duration-[0.3s] hover:scale-[1.007]"
                src="https://images.pexels.com/photos/31039030/pexels-photo-31039030.jpeg"
                alt=""
              />
              <h1 className="font-extrabold text-gray-600 text-[50px] absolute top-1/2 left-1/2 -translate-x-1/2">
                Secondary
              </h1>
            </Input>

            <Input
              type="radio"
              name="SchoolCategory"
              checked={selectedCategory === "Hybrid"}
              onChange={() => setSelectedCategory("Hybrid")}
              value="Hybrid
           "
            >
              <img
                className="w-[400px] h-[400px] object-cover rounded-2xl opacity-[0.8] hover:opacity-[1.0] hover:transition-all hover:duration-[0.3s] duration-[0.3s] hover:scale-[1.007]"
                src="https://images.pexels.com/photos/11010068/pexels-photo-11010068.jpeg"
                alt=""
              />
              <h1 className="font-extrabold text-gray-600 text-[50px] absolute top-1/2 left-1/2 -translate-x-1/2">
                Hybrid
              </h1>
            </Input>

            <Input
              type="radio"
              name="SchoolCategory"
              checked={selectedCategory === "Higher Education"}
              onChange={() => setSelectedCategory("Higher Education")}
              value="Higher Education
           "
            >
              <img
                className="w-[400px] h-[400px] object-cover rounded-2xl opacity-[0.8] hover:opacity-[1.0] hover:transition-all hover:duration-[0.3s] duration-[0.3s] hover:scale-[1.007]"
                src="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg"
                alt=""
              />
              <h1 className="font-extrabold text-gray-600 text-[50px] absolute top-1/2 left-1/2 -translate-x-1/2">
                Higher <br /> Education
              </h1>
            </Input>
          </form>
          {!serverData ? (
            <Loader />
          ) : Array.isArray(serverData) ? (
            <div>
              {serverData.map((school) => (
                <div key={school._id}>
                  <h3>{school.name}</h3>
                  {school.images?.[0] && <img src={school.images[0]} alt="" />}
                  <p>{school.description}</p>
                </div>
              ))}
            </div>
          ) : serverData.data ? (
            <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[30px]">
              {serverData.data.map((school) => (
                <div className="p-[10px] relative" key={school._id}>
                  <h3 className="font-bold text-center mb-[20px] lg:text-[20px]">
                    {school.name}
                  </h3>
                  {school.images?.[0] && (
                    <img
                      className="lg:w-full lg:h-[400px] object-cover rounded-2xl"
                      src={school.images[0]}
                      alt=""
                    />
                  )}
                  <p className="bg-amber-50 p-[10px] font-bold lg:h-[150px] mt-[10px] rounded-2xl">
                    {school.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            //this area shows in case the data is not available
            <div className="mt-[30px]">
              <img
                className="justify-self-center lg:w-[600px]"
                src="/undraw_no-data_ig65.svg"
                alt=""
              />
              <p className="text-center lg:text-[30px] font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Sorry the data is not available at the moment !
              </p>
            </div>
          )}
          <Link
            onMouseEnter={() => preFetch("/finding")}
            onTouchStart={() => preFetch("/finding")}
            to={"/finding"}
            className="float-right bg-gradient-to-r from-violet-600 to-indigo-600 p-[10px] font-light text-white m-[30px] hover:bg-transparent hover:text-black
          hover:border hover:transition-all hover:duration-[0.5s] duration-[0.4s]"
          >
            Browse All schools
          </Link>
        </div>
      </div>
    </main>
  );
}

export function Input({ name, value, checked, onChange, children }) {
  return (
    <label
      className="relative"
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      <input
        className="relative"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }} // Hide the default radio
      />
      {children} {/* This is where the <img> will be rendered */}
    </label>
  );
}
