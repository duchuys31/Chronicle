import { useEffect, useState } from "react"
import Banner from "./Components/Home/Banner"
import BreadCrumbs from "./Components/Home/BreadCrumbs"
import Categories from "./Components/Home/Categories"
import CustomerReview from "./Components/Home/CustomerReview"
import Latest from "./Components/Home/Latest"
import ListBook from "./Components/Home/ListBook"
import Navbar from "./Components/Home/Navbar"
import PriceRange from "./Components/Home/PriceRange"
import SearchAuthor from "./Components/Home/SearchAuthor"
import Footer from "./Components/Home/Footer"
import SingleBook from "./SingleBook"
import Axios from "axios"



const Home = () =>
{
    const token = localStorage.getItem( "token" )
    const [ keyword, setKeyword ] = useState( "" )
    const [ customUser, setCustomUser ] = useState( [] )
    const [ categoryList, setCategoryList ] = useState( [] )
    const [ author, setAuthor ] = useState( '' )
    const [ pointFilter, setPointFilter ] = useState( 0 )
    const [ language, setLanguage ] = useState( localStorage.getItem( "language" ) )
    const [ words, setWords ] = useState( {
        home: "Home Page",
        language: "Language",
        manage: "Manage",
        profile: "Profile",
        logout: "Logout",
        login: "Log in",
        search: "Find book ",
        Category: "Category",
        All: "All",
        Author: "Author",
        AuthorName: "Author Name",
        Search: "Search",
        rating: "Customer Review"


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
                        search: "Find book ",
                        Category: "Category",
                        All: "All",
                        Author: "Author",
                        AuthorName: "Author Name",
                        Search: "Search",
                        rating: "CustomUser Review"

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

    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/info", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                }
            } )
                .then( ( response ) =>
                {
                    if ( response.ok )
                    {
                        return response.json()
                    }
                    else
                    {

                        return response.json()
                    }
                } )
                .then( ( data ) =>
                {
                    if ( data === null )
                    {
                        localStorage.removeItem( "token" )
                    }
                    setCustomUser( data )
                } )
                .catch( ( err ) => console.log( err ) );
        }, []
    )
    useEffect(
        () =>
        {
            console.log( categoryList )
        }, [ categoryList ]
    )
    console.log( customUser )
    console.log( token )
    return (
        <>
            <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <div id="home">
                    <Navbar
                        firstname={ customUser.firstName }
                        lastname={ customUser.lastName }
                        roles={ customUser.roles }
                        setKeyword={ setKeyword }
                        language={ language }
                        setLanguage={ setLanguage }
                        words={ words }

                    />
                    <br />
                    <br />
                    <br />
                    <br />


                    <Banner
                    />


                    <div className="innerf-pages section">
                        <div className="container-cart">
                            <div className="side-bar col-md-3">
                                <Categories
                                    categoryList={ categoryList }
                                    setCategoryList={ setCategoryList }
                                    language={ language }
                                    words={ words }
                                />
                                <SearchAuthor
                                    setAuthor={ setAuthor }
                                    language={ language }
                                    words={ words }
                                />
                                {/* <PriceRange /> */ }
                                {/* <Latest /> */ }
                                <CustomerReview
                                    words={ words }
                                    language={ language }
                                    setPointFilter={ setPointFilter }
                                />
                            </div>
                            <div className="left-ads-display col-md-9">

                                <div className="wrapper_top_shop">
                                    <div className="product-sec1">
                                        <ListBook
                                            author={ author }
                                            keyword={ keyword }
                                            customUser={ customUser }
                                            categoryList={ categoryList }
                                            words={ words }
                                            pointFilter={ pointFilter }
                                        />
                                    </div>

                                </div>

                            </div>
                            <div className="clearfix"></div>
                        </div>

                    </div>

                    <Footer />


                </div>
            </body>
        </>
    )
}
export default Home