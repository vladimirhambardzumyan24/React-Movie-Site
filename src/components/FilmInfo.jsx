import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { loadState } from "../helpers/localStorage";
import Navbar from "./Navbar";

export default function FilmInfo() {
  let filmInfo = loadState("filmInfo");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    });
  }, []);

  return (
    <>
      <Navbar />
      {!isLoad ? (
        <div className="pt-20 bg-gray-300 relative flex justify-center items-center h-36">
          <div className="rounded animate-spin ease duration-300 w-5 h-5 border-2 border-gray-800"></div>
        </div>
      ) : (
        <div className="pt-16 min-w-screen min-h-screen bg-gray-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <img
                    src={
                      filmInfo.backdrop_path
                        ? "https://image.tmdb.org/t/p/w500/" +
                          filmInfo.backdrop_path
                        : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                    }
                    className="w-full relative z-10 mb-8"
                    alt=""
                  />
                  <span className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-md px-10 py-2 font-semibold">
                    Released: {filmInfo.release_date}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {filmInfo.title}
                  </h1>
                  <h6 className="font-bold uppercase  mb-1">
                    {filmInfo.tagline}
                  </h6>
                  <p className="text-sm">{filmInfo.overview} </p>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-10">
              {filmInfo.production_companies.map((comp) => (
                <img
                  key={comp.id}
                  className="h-16 w-18 inline-block"
                  src={
                    comp.logo_path
                      ? "https://image.tmdb.org/t/p/w500/" + comp.logo_path
                      : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                  }
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

FilmInfo.propTypes = {
  filmInfo: PropTypes.object,
};
