import { useEffect, useState } from "react"
import Banner from "./Components/Home/Banner"
import Footer from "./Components/Home/Footer"
import Navbar from "./Components/Home/Navbar"

const Register = () =>
{
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ repassword, setRepassword ] = useState( '' )
    const [ firstname, setFirstname ] = useState( '' )
    const [ lastname, setLastname ] = useState( '' )
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
        firstname: "First Name",
        lastname: "Last Name",
        confirm: "Confirm",
        signupErr: "Username already exists !",
        passNotSame: "Your password is not the same !",

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
                        loginWith: "Login with",
                        firstname: "First Name",
                        lastname: "Last Name",
                        confirm: "Confirm",
                        signupErr: "Username already exists !",
                        passNotSame: "Your password is not the same !",
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
        if ( password === repassword )
        {
            console.log(
                JSON.stringify( {
                    "username": username,
                    "password": password,
                    "firstname": firstname,
                    "lastname": lastname
                } )
            )
            fetch( "http://localhost:8080/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    "username": username,
                    "password": password,
                    "firstname": firstname,
                    "lastname": lastname,
                    "role": "USER"
                } )
            } )
                .then( response =>
                {
                    if ( response.ok )
                    {
                        window.location.href = "/login"
                        return response.json()
                    }
                    else
                    {
                        alert( words.signupErr )
                        return response.body()
                    }
                } )
                .then( data =>
                {
                } )
                .catch( error => console.error( error ) )
        }
        else
        {
            return alert( words.passNotSame )
        }
    }

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
                    {/* <!--//breadcrumbs ends here--> */ }
                    {/* <!-- signin and signup form --> */ }
                    <div class="login-form section text-center">
                        <div class="container">
                            <h4 class="rad-txt">
                                <span class="abtxt1">{ words.login }</span>
                                <span class="abtext">{ words.signup }</span>
                            </h4>
                            <div id="signupbox" style={ { marginTop: "50px" } } class="mainbox loginbox">
                                <div class="panel panel-info">
                                    <div class="panel-heading">
                                        <div class="panel-title">{ words.signup }</div>

                                    </div>
                                    <div class="panel-body">
                                        <form onSubmit={ handleSubmit } id="signupform" class="form-horizontal">
                                            <div id="signupalert" style={ { display: "none" } } class="alert alert-danger">
                                                <p>Error:</p>
                                                <span></span>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">Username</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="text" class="form-control" name="email"
                                                        placeholder="Username" required onChange={ ( e ) => setUsername( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">{ words.firstname }</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="text" class="form-control" name="firstname"
                                                        placeholder={ words.firstname } required onChange={ ( e ) => setFirstname( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">{ words.lastname }</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="text" class="form-control" name="lastname"
                                                        placeholder={ words.lastname } required onChange={ ( e ) => setLastname( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">Password</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="password" class="form-control" name="passwd"
                                                        placeholder="Password" required onChange={ ( e ) => setPassword( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">{ words.confirm } Password</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="password" class="form-control" name="passwd"
                                                        placeholder="Password" onChange={ ( e ) => setRepassword( e.target.value ) } required />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="signup-btn">
                                                    <button id="btn-signup" type="submit" class="btn btn-info">
                                                        <i class="icon-hand-right"></i> &nbsp; { words.signup }</button>
                                                </div>
                                            </div>
                                            <div style={ { float: "right", fontSize: "85%", position: "relative", top: "-10px" } }>
                                                <a id="signinlink" href="/login">{ words.login }</a>
                                            </div>

                                        </form>
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

export default Register