import { loadState } from "../helpers/localStorage";
import dataGenre from "./DataGenre";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Favorites({ handleAddFavorites, handleClickInfo }) {
  let thisUser = loadState("thisUser");
  let users = loadState("users");
  let user = users ? users.filter((user) => user.email === thisUser) : [];

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap  bg-indigo-100 pt-16">
        <div className="container ml-auto mr-auto">
          {user[0].favorites.map((film) => (
            <div
              key={film.id}
              className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2 inline-block heightCard"
            >
              <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                <figure className="mb-2">
                  <img
                    onClick={() => handleClickInfo(film.id)}
                    src={
                      film.backdrop_path
                        ? "https://image.tmdb.org/t/p/w500/" +
                          film.backdrop_path
                        : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                    }
                    alt=""
                    className="h-64 ml-auto mr-auto"
                  />
                </figure>
                <div className="rounded-lg p-4 bg-gray-600	 flex flex-col">
                  <div>
                    <h5 className="text-white text-2xl font-bold leading-none ">
                      {film.title}
                    </h5>
                  </div>
                  <div className="p-2">
                    {dataGenre.map((item) => {
                      return film.genre_ids.includes(item.id) ? (
                        <span
                          className="p-px break-all text-white"
                          key={item.name}
                        >
                          | {item.name} |
                        </span>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        handleAddFavorites(film);
                      }}
                      className="rounded-full bg-gray-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex  transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-current m-auto"
                      >
                        {!film.adult ? (
                          <>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </>
                        ) : (
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Favorites.propTypes = {
  handleAddFavorites: PropTypes.func,
  handleClickInfo: PropTypes.func,
};
