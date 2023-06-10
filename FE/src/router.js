import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import SingleBook from "./Pages/SingleBook";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import EditBook from "./Pages/EditBook";
import Test from "./Pages/Test";



const Router = () => 
{
    const [ customUser, setCustomUser ] = useState( [] )
    const [ loadUSer, setLoadUser ] = useState( false )
    const token = localStorage.getItem( "token" )
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) =>
                {
                    setCustomUser( data )
                    setLoadUser( true )
                } )
                .catch( ( err ) => console.log( err ) );
        }, [ token ]
    )
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={ Home } exact />
                <Route path="/admin"
                    render={ () => (
                        loadUSer ? (
                            token ? (
                                customUser.roles === 'ADMIN' ? <Admin /> : <Redirect to="/" />
                            ) : <Redirect to="/" />
                        ) : null
                    ) }
                    exact />
                <Route path="/profile" render={ () => (
                    loadUSer ? (
                        token ? <Profile /> : <Redirect to="/" />
                    ) : null
                ) } exact />
                <Route path="/login" render={ () => (
                    token ? <Redirect to="/" /> : <Login />
                ) } exact />
                <Route path="/test" component={ Test } exact />
                <Route path="/register" component={ Register } exact />
                <Route path="/book:id" component={ SingleBook } exact />
                <Route path="/cart" render={ () => (
                    loadUSer ? (
                        token ? <Cart /> : <Redirect to="/" />
                    ) : null
                ) } exact />
                <Route path="/edit_book:id"
                    render={ () => (
                        loadUSer ? (
                            token ? (
                                customUser.roles === 'ADMIN' ? <EditBook /> : <Redirect to="/" />
                            ) : <Redirect to="/" />
                        ) : null
                    ) }
                    exact />
            </Switch>
        </BrowserRouter>

    );
}

export default Router