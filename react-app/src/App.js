import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllDrinks from "./components/AllDrinks";
import SingleDrink from "./components/SingleDrink";
import SingleCustomization from './components/SingleCustomization'
import CurrentCustomization from './components/ManageCustomization'
import CurrentCart from './components/ManageCart'
import AfterCheckOut from "./components/AfterCheckOut";
import AllCarts from "./components/ViewAllCarts";
import UnprocessedCarts from "./components/UnprocessedCarts";
import LandingPage from "./components/LandingPage";
import AllPosts from "./components/Feed";
import SinglePost from "./components/SinglePost";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Footer from "./components/Footer";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/drinks">
            <AllDrinks />
          </Route>
          <Route exact path="/drinks/:drinkId">
            <SingleDrink />
          </Route>
          <Route exact path="/customizations">
            <CurrentCustomization />
          </Route>
          <Route exact path="/customizations/:customizationId">
            <SingleCustomization />
          </Route>
          <Route exact path="/carts">
            <AllCarts />
          </Route>
          <Route exact path="/carts/unprocessed">
            <UnprocessedCarts />
          </Route>
          <Route exact path="/cart">
            <CurrentCart />
          </Route>
          <Route exact path="/aftercheckout">
            <AfterCheckOut />
          </Route>
          <Route exact path="/posts">
            <AllPosts />
          </Route>
          <Route exact path="/posts/new">
            <CreatePost />
          </Route>
          <Route exact path="/posts/:postId/edit">
            <EditPost />
          </Route>
          <Route exact path="/posts/:postId">
            <SinglePost />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
