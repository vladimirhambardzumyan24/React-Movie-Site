import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { saveState } from "../helpers/localStorage";
import Favorites from "./Favorites";
import Films from "./Films";
import Login from "./Login";
import axios from "axios";

export default function General() {
  const [usersValue, setUsersValue] = useState([]);
  const [state, setState] = useState();

  function handleGivUsersValue(values) {
    setUsersValue([...usersValue, values]);
    saveState("users", usersValue);
  }

  
  useEffect(() => {
    const apiUrl =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=f53e6b2f16ed0b466ebc6de372262155";
    const fetchData = async () => {
      let response = await axios(apiUrl);
      let user = await response.data;
      setState(user);
    };
    fetchData();
  }, []);

  console.log(state);

  return (
    <>
      <Switch>
        <Route exact path={["/login", "/"]}>
          <Login handleGivUsersValue={handleGivUsersValue} />
        </Route>
        <Route exact path="/films">
          <Films state={state} />
        </Route>
        <Route exact path="/films/favorites">
          <Favorites />
        </Route>
      </Switch>
    </>
  );
}
