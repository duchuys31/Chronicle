import { useEffect, useState } from "react"
import Navbar from "./Components/Home/Navbar"
import Banner from "./Components/Home/Banner"
import BreadCrumbs from "./Components/Home/BreadCrumbs"
import Categories from "./Components/Home/Categories"
import SearchAuthor from "./Components/Home/SearchAuthor"
import PriceRange from "./Components/Home/PriceRange"
import Latest from "./Components/Home/Latest"
import CustomerReview from "./Components/Home/CustomerReview"
import Footer from "./Components/Home/Footer"
import Evaluate, { formatDate } from "./Components/SingleBook/Evaluate"
import { useParams } from "react-router-dom"
import Loader from "./Components/Loader"

const token = localStorage.getItem( "token" )

const SingleBook = () =>
{
    const [ customUser, setCustomUser ] = useState( [] )
    const [ book, setBook ] = useState( [] )
    const [ order, setOrder ] = useState( [] )
    const [ userOn, setUserOn ] = useState( false )
    const [ priceBuy, setPriceBuy ] = useState( 0 )
    const [ priceBorrow, setPriceBorrow ] = useState( 0 )
    const [ rate, setRate ] = useState( [] )
    const [ language, setLanguage ] = useState( localStorage.getItem( "language" ) )
    const points = [ 1, 2, 3, 4, 5 ]
    const [ words, setWords ] = useState( {
        home: "Home Page",
        language: "Language",
        manage: "Manage",
        profile: "Profile",
        logout: "Logout",
        login: "Log in",
        search: "Find book ",
        Option: "Options",
        Details: "Details :",
        Language: "Language",
        Describe: "Describe :",
        Publisher: "Publisher",
        PublicationDate: "Publication date",
        pageNumber: "Number of pages",
        Remaining: "Quantity",
        BuyBook: "Buy Book",
        BorrowBook: "Register to borrow books",
        AddToWaitList: "Add to waiting list",
        writeBuy: "Write Buy",
        User: "Product",
        Comment: "Comment",
        Edit: "Change",
        Delete: "Remove",
        NoProduct: "This product is currently out of stock.",
        haveProduct: 'This product is already in your cart.',
        added: "Added to cart",
        ratingProduct: "Your rating for the product :",
        // ProductReviews: "Product Reviews",
    } )
    const id = useParams().id
    console.log( id )
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
                        Option: "Options",
                        Details: "Details :",
                        Language: "Language",
                        Describe: "Describe :",
                        Publisher: "Publisher",
                        PublicationDate: "Publication date",
                        pageNumber: "Number of pages",
                        Remaining: "Quantity",
                        BuyBook: "Buy Book",
                        BorrowBook: "Register to borrow books",
                        AddToWaitList: "Add to waiting list",
                        User: "Product",
                        Comment: "Comment",
                        Edit: "Change",
                        Delete: "Remove",
                        NoProduct: "This product is currently out of stock.",
                        haveProduct: 'This product is already in your cart.',
                        added: "Added to cart",
                        ratingProduct: "Your rating for the product: ",
                        // ProductReviews: "Product Reviews",
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
            if ( id !== undefined )
            {
                console.log( id )
                fetch( `http://localhost:8080/api/book/${ id }` )
                    .then( ( response ) => response.json() )
                    .then( ( data ) =>
                    {
                        setBook( data )
                    } )
            }
            if ( token )
            {
                fetch( "http://localhost:8080/api/auth/info", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                    .then( ( response ) => response.json() )
                    .then( ( data ) =>
                    {
                        setCustomUser( data )
                        setUserOn( true )
                    } )
            }

            if ( order.length === 0 && token )
            {
                console.log( order )
                fetch( "http://localhost:8080/api/BuyAndBorrow/-1", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${ token }`,
                        "Content-Type": "application/json",
                    },
                } )
                    .then( ( response ) => response.json() )
                    .then( ( data ) =>
                    {
                        setOrder( data );
                    } );
            }


        }, [ language, id, token ]
    )
    useEffect(
        () =>
        {
            console.log( order )
        }, [ order.user, order.book, order.price ]
    )
    useEffect(
        () =>
        {
            setOrder( prevData => ( {
                ...prevData,
                [ 'user' ]: customUser,
                [ 'book' ]: book,
                [ 'price' ]: priceBuy
            } ) )
        }, [ customUser, book, order.id, priceBuy ]
    )
    useEffect(
        () =>
        {
            if ( book.length !== 0 && token )
            {
                fetch( "http://localhost:8080/api/rating/rate", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { "book": book } )
                }
                )
                    .then( ( response ) => response.json() )
                    .then( ( data ) => setRate( data ) )
                    .catch( ( err ) => console.log( err ) );
            }
        }, [ book ]
    )
    useEffect(
        () =>
        {

            if ( customUser.roles === 'ADMIN' || customUser.roles === 'MEMBER' )
            {
                setPriceBuy( parseInt( book.price * 0.7 ) )
                setPriceBorrow( 0 )
            }
            else
            {
                setPriceBuy( book.price )
                setPriceBorrow( parseInt( book.price * 0.3 ) )
            }


        }, [ customUser.roles, book.price ]
    )
    useEffect(
        () =>
        {
            if ( order.options === 'buy' )
            {
                setOrder( prevData => ( { ...prevData, [ 'price' ]: priceBuy } ) )
            }
            else
            {
                setOrder( prevData => ( { ...prevData, [ 'price' ]: priceBorrow } ) )
            }
        }, [ priceBorrow, priceBuy, order.options ]
    )
    const handleSubmit = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/-1", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": order } )
        } )
        var text = await resp.text()
        if ( resp.ok )
        {
            alert( words.added )
        }
        else
        {
            if ( text === '401' )
            {
                alert( words.NoProduct )
            }
            else if ( text === '402' )
            {
                alert( words.haveProduct )
            }
            console.log( resp )
        }
    }
    const handleBuy = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/-1", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": order } )
        } )
        var text = await resp.text()
        if ( resp.ok )
        {
            localStorage.setItem( "option", order.options )
            window.location.href = "/cart"
        }
        else
        {
            if ( text === '401' )
            {
                alert( words.NoProduct )
            }
            else if ( text === '402' )
            {
                alert( words.haveProduct )
            }
            console.log( resp )
        }
    }
    useEffect(
        () =>
        {

            if ( rate.length !== 0 && token )
            {
                fetch( "http://localhost:8080/api/rating/update", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { "rating": rate } )
                }
                )
                    .then( ( response ) => response.json() )
                    .then( ( data ) =>
                    {
                        setRate( data )
                        setBook( data.book )
                    } )
                    .catch( ( err ) => console.log( err ) );
            }


        }, [ rate.point ]
    )
    useEffect(
        () =>
        {
            console.log( rate )
        }, [ rate ]
    )
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/language/translate_text", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    "words": book.bookDescribe,
                    "language": language
                } )
            } )
                .then( ( response ) => response.text() )
                .then( ( data ) =>
                {
                    if ( data.length > 0 )
                    {
                        setBook( prevData => ( { ...prevData, [ "bookDescribe" ]: data } ) );
                    }

                    console.log( data )
                } )
                .catch( ( err ) => console.log( err ) );
            localStorage.setItem( "language", language )
        }, [ language, book.bookID ]
    )

    return (
        <>
            <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <div id="home">
                    <Navbar
                        firstname={ customUser.firstName }
                        lastname={ customUser.lastName }
                        roles={ customUser.roles }
                        language={ language }
                        setLanguage={ setLanguage }
                        words={ words }
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/* <Banner
                    /> */}
                    {/* <BreadCrumbs
                        title='Sản phẩm'
                    /> */}



                    <div class="innerf-pages section">
                        <div class="container">
                            <div class="col-md-4 single-right-left ">
                                <div class="grid images_3_of_2">
                                    <div class="flexslider1">
                                        <ul class="slides">
                                            <li>
                                                <div class="thumb-image">
                                                    {
                                                        book.bookImage ? (
                                                            <>
                                                                <img src={ book.bookImage } data-imagezoom="true" alt=" " class="img-responsive" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Loader />
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </li>

                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-8 single-right-left simpleCart_shelfItem">
                                <h3>{ book.bookName }
                                    {/* <span>Hardcover – Feb 2018</span> */ }
                                </h3>
                                <p>by
                                    <a href="/book">{ book.bookAuthor }</a>
                                </p>
                                <div class="caption">

                                    <ul class="rating-single">
                                        {
                                            points.map(
                                                ( point ) => (
                                                    <>
                                                        <li>
                                                            <h6>
                                                                <span className={ book.point >= point ? "fa fa-star yellow-star" : "fa fa-star gray-star" } aria-hidden="true"></span>
                                                            </h6>
                                                        </li>
                                                    </>
                                                )
                                            )
                                        }
                                    </ul>
                                    <div class="clearfix"> </div>
                                    <h6>
                                        ${ order.options === 'borrow' ? priceBorrow : priceBuy }
                                        {/* { order.options === 'borrow' && priceBorrow } */ }
                                    </h6>
                                </div>
                                <div class="desc_single">
                                    <h5>{ words.Describe }</h5>
                                    <p>{ book.bookDescribe }</p>
                                </div>
                                <div class="occasional">
                                    <h5>{ words.Details }</h5>
                                    <ul class="single_specific">
                                        <li>
                                            <span>{ words.Language } : </span>
                                            { book.language }
                                        </li>
                                        <li>
                                            {/* <span>format :</span> Hardcover</li>
                                        <li> */}
                                            <span>{ words.Publisher } : </span>
                                            { book.publisher }
                                        </li>
                                        <li>
                                            <span>{ words.PublicationDate } : </span>
                                            { formatDate( book.bookDate ) }
                                        </li>
                                        <li>
                                            <span>{ words.pageNumber } :</span> { book.pageNumber }
                                        </li>
                                        <li>
                                            <span>{ words.Remaining } :</span> { order.options === 'buy' && book.buy }
                                            { order.options === 'borrow' && book.borrow }
                                        </li>
                                    </ul>
                                    <br />

                                    {
                                        token && (
                                            <>
                                                <h5>{ words.ratingProduct }</h5>
                                                <div className="row">
                                                    <div className="col-md-1">
                                                    </div>
                                                    <ul class="rating-single">
                                                        {
                                                            points.map(
                                                                ( point ) => (
                                                                    <>
                                                                        <li>
                                                                            <h1>
                                                                                <span

                                                                                    className={ rate.point >= point ? "fa fa-star yellow-star" : "fa fa-star gray-star" }
                                                                                    onClick={ () =>
                                                                                    {
                                                                                        setRate( prevData => ( {
                                                                                            ...prevData,
                                                                                            [ 'point' ]: point
                                                                                        } ) )
                                                                                    } }
                                                                                    aria-hidden="true"></span>
                                                                            </h1>
                                                                        </li>
                                                                    </>
                                                                )
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>


                                {
                                    userOn ? (
                                        <>
                                            <div class="color-quality">
                                                <div class="color-quality-right">
                                                    <h5>{ words.Option }</h5>
                                                    <select id="country1" onChange={ ( e ) =>
                                                    {
                                                        setOrder( prevData => ( { ...prevData, [ 'number' ]: 1 } ) )
                                                        setOrder( prevData => ( { ...prevData, [ 'options' ]: e.target.value } ) )

                                                    } } class="frm-field required sect">
                                                        <option value="buy">{ words.BuyBook }: &nbsp;${ priceBuy }</option>
                                                        <option value="borrow">{ words.BorrowBook }: &nbsp;${ priceBorrow }</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                            <br />
                                            <br />
                                            <br />
                                            <div class="occasion-cart">
                                                <div class="chr single-item single_page_b">
                                                    <div className="row">
                                                        <button type="submit" class="chr-cart pchr-cart"
                                                            onClick={ () => handleSubmit() }
                                                        >
                                                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                                            { ' ' }{ words.AddToWaitList }
                                                        </button>
                                                        <button type="submit" class="chr-cart pchr-cart"
                                                            onClick={ () => handleBuy() }
                                                        >
                                                            <i aria-hidden="true"></i>
                                                            { ' ' }{
                                                                order.options === 'buy' ? <>{ words.BuyBook }</> : <>{ words.BorrowBook }</>
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }


                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>

                    {/* <!-- /new_arrivals --> */ }
                    <Evaluate
                        book={ book }
                        user={ customUser }
                        setBook={ setBook }
                        language={ language }
                        words={ words }
                    />


                    <Footer />
                </div>
            </body>

        </>
    )
}
export default SingleBook