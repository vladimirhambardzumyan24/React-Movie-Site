import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Favorites from "./Favorites";
import Films from "./Films";
import Login from "./Login";
import Navbar from "./Navbar";

export default function General() {

  const [emailValue,setEmailValue]=useState("")
  const [passwordValue,setPasswordValue]=useState("")

const handleGivEmail=(e)=>{
  setEmailValue(e)
  console.log(emailValue)
}

  return (
    <>
      
      <Switch>
      <Route exact path={["/login", "/"]}>
        <Login handleGivEmail={handleGivEmail} emailValue={emailValue}/>
      </Route>
        <Route exact path="/films">
          <Films />
        </Route>
        <Route exact path="/films/favorites">
          <Favorites />
        </Route>
      </Switch>
    </>
  );
}
