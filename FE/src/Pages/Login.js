import { useEffect, useState } from "react";
import Banner from "./Components/Home/Banner";
import Footer from "./Components/Home/Footer";
import Navbar from "./Components/Home/Navbar";
import { gapi } from "gapi-script";
import { GoogleLogout, GoogleLogin, signOut, useGoogleLogout } from "react-google-login";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
const clientId = ""
const appId = ""

const LoginGoogle = () =>
{
    const onSuccess = async ( e ) =>
    {
        console.log( e.profileObj )
        var resp = await fetch( "http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "username": e.profileObj.email,
                "password": e.profileObj.googleId,
                "firstname": e.profileObj.givenName,
                "lastname": e.profileObj.familyName,
                "role": "USER"
            } )
        } )
        resp = await fetch( "http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "username": e.profileObj.email,
                "password": e.profileObj.googleId,
            } )
        } )
        var data = await resp.text()
        localStorage.setItem( "token", data )
        window.location.href = "/"
    }
    const onFailure = ( e ) =>
    {
        console.log( e )
    }
    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={ clientId }
                buttonText="Login With Google"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={ 'single_host_origin' }
            >
            </GoogleLogin>
        </div>

    )
}

const FacebookLogin = () =>
{
    const onResolve = async ( e ) =>
    {
        console.log( e.data )
        var resp = await fetch( "http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "username": e.data.userID,
                "password": e.data.id,
                "firstname": e.data.first_name,
                "lastname": e.data.last_name,
                "role": "USER"
            } )
        } )
        resp = await fetch( "http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "username": e.data.userID,
                "password": e.data.id,
            } )
        } )
        var data = await resp.text()
        localStorage.setItem( "token", data )
        window.location.href = "/"
    }

    return (
        <>
            <LoginSocialFacebook
                appId={ appId }
                scope="public_profile,email"
                onResolve={ onResolve }
                onReject={
                    ( error ) =>
                    {
                        console.log( error )
                    }
                }
            >
                <FacebookLoginButton text="Login With Facebook" style={ { fontSize: '14px' } } />

            </LoginSocialFacebook>
        </>
    )
}


export const Logout = () =>
{
    localStorage.removeItem( "token" )
    window.location.href = "/login"
}

const token = localStorage.getItem( "token" )
const Login = () =>
{

    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ language, setLanguage ] = useState( localStorage.getItem( "language" ) )
    const [ words, setWords ] = useState( {
        home: "Home Page",
        language: "Language",
        manage: "Manage",
        profile: "Profile",
        logout: "Logout",
        login: "Log in",
        search: "Find book ",
        signup: "Register",
        fpass: "Forgot password ?",
        loginWith: "Login with",
        noAcc: "Do not have an account ?",
        signUpNow: "Sign up now.",
        loginErr: "Wrong Username Or Password!",
    } )
    useEffect(
        () =>
        {
            console.log( JSON.stringify( words ) )
            fetch( "http://localhost:8080/api/language/translate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    "words": {
                        home: "Home Page",
                        language: "Language",
                        manage: "Manage",
                        profile: "Profile",
                        logout: "Logout",
                        login: "Log in",
                        signup: "Register",
                        search: "Find book ",
                        fpass: "Forgot password ?",
                        loginWith: "Login with",
                        noAcc: "Do not have an account ?",
                        signUpNow: "Sign up now.",
                        loginErr: "Wrong Username Or Password!",

                    },
                    "language": language
                } )
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) => setWords( data ) )
                .catch( ( err ) => console.log( err ) );
            localStorage.setItem( "language", language )
            console.log( language )
        }, [ language ]
    )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        fetch( "http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "username": username,
                "password": password,
            } )
        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    window.location.href = "/"
                    return response.text()
                }
                else
                {
                    alert( words.loginErr )
                    return response.text()
                }
            } )
            .then( data =>
            {
                localStorage.setItem( "token", data )
            } )
            .catch( error => console.error( error ) )
    }
    useEffect(
        () =>
        {

            const start = () =>
            {
                gapi.client.init(
                    {
                        clientId: clientId,
                        scope: ""
                    }
                )
                gapi.auth2.init( {
                    client_id: clientId
                } );
            }
            gapi.load( 'client:auth2', start )


        }, []
    )
    return (
        <>
            <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <div id="home">
                    <Navbar
                        words={ words }
                        language={ language }
                        setLanguage={ setLanguage }
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="login-form section text-center">
                        <div class="container">
                            <h4 class="rad-txt">
                                <span class="abtxt1">{ words.login }</span>
                                <span class="abtext">{ words.signup }</span>
                            </h4>
                            <div id="loginbox" style={ { marginTop: "30px" } } class="mainbox  loginbox">
                                <div class="panel panel-info">
                                    <div class="panel-heading">
                                        <div class="panel-title">{ words.login }</div>

                                    </div>
                                    <div style={ { paddingTop: "30px" } } class="panel-body">
                                        <div style={ { display: 'none' } } id="login-alert" class="alert alert-danger col-sm-12"></div>
                                        <form id="loginform" class="form-horizontal" onSubmit={ handleSubmit }>
                                            <div style={ { marginBottom: "25px" } } class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="glyphicon glyphicon-user"></i>
                                                </span>
                                                <input id="login-username" type="text" class="form-control" name="username"
                                                    placeholder="Username" required onChange={ ( e ) => setUsername( e.target.value ) } />
                                            </div>

                                            <div style={ { marginBottom: "25px" } } class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="glyphicon glyphicon-lock"></i>
                                                </span>
                                                <input id="login-password" type="password" class="form-control" name="password"
                                                    placeholder="Password" onChange={ ( e ) => setPassword( e.target.value ) } required />

                                            </div>
                                            <div class="fpassword">
                                                <a href="#">{ words.fpass }</a>
                                            </div>
                                            <div style={ { marginTop: "10px" } } class="form-group">
                                                {/* <!-- Button --> */ }
                                                <br />
                                                <center>
                                                    <div className="col-sm-3"></div>
                                                    <div class="col-sm-6 controls">
                                                        <button id="btn-login" type="submit" class="form-control btn btn-success"> { words.login } </button>
                                                    </div>
                                                    <div className="col-sm-3"></div>
                                                </center>

                                                <br />
                                                <br />
                                                <br />
                                                <br />


                                            </div>

                                        </form>

                                        <div class="form-group">
                                            <div class="col-md-12 control">

                                                <div style={ { borderTop: "1px solid#888", paddingTop: "15px", fontSize: "85%" } }>
                                                    { words.noAcc }
                                                    <a href="/register">
                                                        { words.signUpNow }
                                                    </a>
                                                </div>
                                                <br />


                                                <div class="col-sm-12 controls">
                                                    <div className="col-md-5">
                                                        <FacebookLogin />
                                                    </div>
                                                    <div className="col-md-2">

                                                    </div>
                                                    <div className="col-md-5">
                                                        <LoginGoogle />
                                                    </div>
                                                    {/* <a className="btn btn-dark"></a> */ }
                                                    {/* <a href="#" class="btn btn-danger">{ words.loginWith } Google</a> */ }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {/* <!--//signin and signup form ends here--> */ }
                {/* <!-- footer --> */ }
                <Footer />
            </body >

        </>
    )
}
export default Login
