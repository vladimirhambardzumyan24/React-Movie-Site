import { useEffect, useMemo, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { loadState, saveState } from "../helpers/localStorage";
import Favorites from "./Favorites";
import Films from "./Films";
import Login from "./Login";
import axios from "axios";
import FilmInfo from "./FilmInfo";

const fetchData = async (p) => {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${p}&with_watch_monetization_types=flatrate`;
  let response = await axios(apiUrl);
  let data = response.data;
  return data;
};

const searchData = async (p, search) => {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US&query=${search}&page=${p}&include_adult=false`;
  let response = await axios(apiUrl);
  let data = response.data;
  return data;
};

export default function General() {
  const [usersValue, setUsersValue] = useState([]);
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  // const [isExist, setIsExist] = useState(true);
  let history = useHistory();

  const getData = useMemo(
    () => (searchValue ? searchData : fetchData),
    [searchValue]
  );

  let isExistUser = [];

  function handleGivUsersValue(values) {
    let users = loadState("users") ? loadState("users") : [];
    if (loadState("users")) {
      isExistUser = loadState("users").filter(
        (user) => user.email === values.email
      );
    } else {
      setUsersValue([...usersValue, { ...values, favorites: [] }]);
      saveState("users", [...users, { ...values, favorites: [] }]);
      saveState("thisUser", values.email);
    }

    if (isExistUser.length === 0) {
      setUsersValue([...usersValue, { ...values, favorites: [] }]);
      saveState("users", [...users, { ...values, favorites: [] }]);
      saveState("thisUser", values.email);
    }
  }

  const scrollHandler = (event) => {
    if (
      event.target.documentElement.scrollHeight ===
      event.target.documentElement.scrollTop + window.innerHeight
    ) {
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    getData(page, searchValue).then((data) => {
      setState((s) => [...s, ...data.results]);
    });
  }, [getData, page, searchValue]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  function handleChange(value) {
    setSearchValue(value);
    setState([]);
  }

  function handleAddFavorites(film) {
    let thisUser = loadState("thisUser");
    let users = loadState("users");

    users.forEach((user) => {
      if (user.email === thisUser) {
        let isChecked = user.favorites.filter((item) => film.id === item.id);
        if (!isChecked.length) {
          saveState("users", [
            ...users,
            (user.favorites = [...user.favorites, { ...film, adult: true }]),
          ]);
        } else {
          saveState("users", [
            ...users,
            (user.favorites = user.favorites.filter((item) => {
              if (item.id === film.id) {
                item.adult = false;
                return false;
              } else {
                return true
              }
            })),
          ]);
        }
      }
    });
  }

  function handleClickInfo(idd) {
    history.push(`/films/${idd}`);
    const apiUrl = `https://api.themoviedb.org/3/movie/${idd}?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US`;
    const fetchData = async () => {
      let response = await axios(apiUrl);
      let data = response.data;
      saveState("filmInfo", data);
    };
    fetchData();
  }

  return (
    <>
      <Switch>
        <Route exact path={["/login", "/"]}>
          <Login handleGivUsersValue={handleGivUsersValue} />
        </Route>
        <Route exact path="/films">
          <Films
            handleChange={handleChange}
            state={state}
            handleAddFavorites={handleAddFavorites}
            // isExist={isExist}
            handleClickInfo={handleClickInfo}
          />
        </Route>
        <Route exact path="/films/favorites">
          <Favorites
            handleAddFavorites={handleAddFavorites}
            // isExist={isExist}
            handleClickInfo={handleClickInfo}
          />
        </Route>
        <Route exact path="/films/:id">
          <FilmInfo />
        </Route>
      </Switch>
    </>
  );
}
