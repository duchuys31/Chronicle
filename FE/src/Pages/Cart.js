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

const token = localStorage.getItem( "token" )
const id = localStorage.getItem( "bookID" )

const Product = ( props ) =>
{

    const handleSubmit = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ props.order.id }`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": props.order } )
        } )
        var data = await resp.text()
        if ( resp.ok )
        {
            window.location.href = "/cart"
        }
        else
        {
            alert( data )
        }
    }
    const deleteOrder = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.confirmOrder ) )
        {
            fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ id }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( response => response.text() )
                .then( data =>
                {
                    window.location.href = "/cart"
                } )
                .catch( error => console.error( error ) )
        }
    }
    const refuseOrder = () =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.confirmCancel ) )
        {
            fetch( "http://localhost:8080/api/BuyAndBorrow/refuse/" + `${ props.order.id }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( response => response.text() )
                .then( data =>
                {
                    window.location.href = "cart"
                } )
                .catch( error => console.error( error ) )
        }

    }
    return (
        <>
            <tr class="rem1">
                <td class="invert">{ props.order.id }</td>

                <td class="invert-image">
                    {
                        props.order.book !== null ? (
                            <a>
                                <img src={ props.order.book.bookImage } alt=" " class="img-responsive" />
                            </a>
                        ) : props.words.deleted
                    }
                </td>
                <td class="invert">{ props.order.book !== null ? props.order.book.bookName : props.words.deleted }</td>
                <td class="invert">
                    { props.order.book !== null ? props.order.book.bookAuthor : props.words.deleted }
                </td>

                <td class="invert">${ props.order.price }</td>
                {
                    props.option === 'buy' && (
                        <>
                            <td class="invert">
                                <input type="date" name="" value={ props.order.extraDate } disabled />

                            </td>
                        </>
                    )
                }

                {
                    props.option === 'borrow' && (
                        <>
                            <td class="invert">
                                <input type="date" name="" value={ props.order.receiveDate } disabled />

                            </td>
                            <td class="invert">
                                <input type="date" name="" value={ props.order.returnDate } disabled />
                            </td>
                        </>
                    )
                }


                <td class="invert">
                    {
                        props.order.book === null ? '' :
                            props.order.buy === 1 ? (
                                <>
                                    { props.words.Processing }
                                </>
                            ) : (
                                <>
                                    {
                                        props.order.buy === 2 && props.words.delivering
                                    }
                                    {
                                        props.order.buy === 3 && props.order.options === "buy" && props.words.delivered
                                    }
                                    {
                                        props.order.options === 'borrow' && props.order.buy === 3 && props.words.borrowing
                                    }
                                    {
                                        props.order.buy === 4 && props.words.returned
                                    }
                                </>
                            )
                    }

                </td >
                <td class="invert">
                    {
                        props.order.buy === 0 && (
                            <>

                                <div class="rem">
                                    {
                                        props.order.book !== null && <button type="" className="btn btn-success"
                                            onClick={ () =>
                                            {
                                                props.setView( true )
                                                props.setBill( props.order )
                                            } }
                                        >
                                            {
                                                props.order.options === 'buy' ? props.words.buy : props.words.borrow
                                            }
                                        </button>
                                    }

                                    { ' ' }
                                    {
                                        props.order.book && <button type="" className="btn btn-danger"
                                            onClick={ () => deleteOrder( props.order.id ) }
                                        >{ props.words.Delete }</button>
                                    }
                                </div>
                            </>
                        )
                    }
                    {
                        props.order.book && props.order.buy === 1 &&
                        <button type="" className="btn btn-danger"
                            onClick={ () => refuseOrder( props.order.id ) }
                        >{ props.words.cancel }</button>
                    }


                    {
                        props.order.buy === 2 && props.order.book &&
                        (
                            <>
                                <div class="rem">
                                    <button type="" className="btn btn-success"
                                        onClick={ () => handleSubmit() }
                                    >{ props.words.received }</button>
                                </div>
                            </>
                        )
                    }
                    {
                        props.order.options === 'borrow' && props.order.buy === 3 && props.order.book && (
                            <>

                                <div class="rem">
                                    <button type="" className="btn btn-success"
                                        onClick={ () => handleSubmit() }
                                    >{ props.words.giveBook }</button>
                                </div>
                            </>
                        )
                    }
                    {
                        ( props.order.options === 'buy' && props.order.buy === 3 ) ||
                            ( props.order.options === 'borrow' && props.order.buy === 4 ) ||
                            ( props.order.book === null ) ? (
                            <>
                                <button type="" className="btn btn-danger"
                                    onClick={ () => deleteOrder( props.order.id ) }
                                >{ props.words.Delete }</button>
                            </>
                        ) : (
                            <></>
                        )
                    }


                </td >
            </tr >
        </>
    )
}

const ListOrder = ( props ) =>
{
    const option = localStorage.getItem( "option" )
    const [ buy, setBuy ] = useState( 0 )
    const [ orders, setOrders ] = useState( [] )

    useEffect(
        () =>
        {
            const fetchData = async () =>
            {
                var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/listOfUser", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                var data = await resp.json()
                setOrders( data )
            }
            fetchData()
        }, []
    )
    useEffect(
        () =>
        {
            console.log( option )
        }, [ option ]
    )
    return (
        <>
            <div class="color-quality">
                <div className="col">
                    <label for="exampleFormControlTextarea1">{ props.words.status }</label>
                    <select
                        className='form-control'
                        onChange={ ( e ) => setBuy( parseInt( e.target.value ) ) }
                        required
                    >
                        {
                            option === 'buy' && (
                                <>
                                    <option value={ 0 }>
                                        { props.words.all }
                                    </option>
                                    <option value={ 1 }>
                                        { props.words.wait }
                                    </option>
                                    <option value={ 2 }>
                                        { props.words.delivering }
                                    </option>
                                    <option value={ 3 }>
                                        { props.words.delivered }
                                    </option>
                                </>
                            )
                        }
                        {
                            option === 'borrow' && (
                                <>
                                    <option value={ 0 }>
                                        { props.words.all }
                                    </option>
                                    <option value={ 1 }>
                                        { props.words.wait }
                                    </option>
                                    <option value={ 2 }>
                                        { props.words.delivering }
                                    </option>
                                    <option value={ 3 }>
                                        { props.words.borrowing }
                                    </option>
                                    <option value={ 4 }>
                                        { props.words.paid }
                                    </option>
                                </>
                            )
                        }

                    </select>
                </div>
                <div class="color-quality-right">
                    {
                        option == 'buy' ? (
                            <>
                                <input type="button" name="" value={ props.words.borrowList } className="form-control"
                                    onClick={ () =>
                                    {
                                        localStorage.setItem( "option", "borrow" )
                                        window.location.href = "/cart"
                                    } }
                                />
                            </>
                        ) : (
                            <>
                                <input type="button" name="" value={ props.words.buyList } className="form-control"
                                    onClick={ () =>
                                    {
                                        localStorage.setItem( "option", "buy" )
                                        window.location.href = "/cart"
                                    } }
                                />
                            </>
                        )
                    }


                </div>
            </div>
            <div class="checkout-right">
                {
                    option === 'buy' && <h1>{ props.words.buyList }</h1>
                }
                {
                    option === 'borrow' && <h1>{ props.words.borrowList }</h1>
                }
                <table class="timetable_sub table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{ props.words.product }</th>
                            <th>{ props.words.bookName }</th>
                            <th>{ props.words.author }</th>
                            <th>{ props.words.price }</th>
                            {
                                option === 'buy' && (
                                    <th>{ props.words.extraDate }</th>
                                )
                            }
                            {
                                option === 'borrow' && (
                                    <>
                                        <th>{ props.words.borrowDate }</th>
                                        <th>{ props.words.returnDate }</th>
                                    </>
                                )
                            }
                            <th>{ props.words.status }</th>
                            <th>{ props.words.option }</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders
                                .filter( item =>
                                {
                                    return ( item.options === option ) &&
                                        ( item.buy === buy || buy === 0 )
                                } )
                                .map(
                                    ( order ) => (
                                        <Product
                                            orderId={ order.id }
                                            order={ order }
                                            setView={ props.setView }
                                            customUser={ props.customUser }
                                            option={ option }
                                            setBill={ props.setBill }
                                            words={ props.words }
                                        />
                                    )
                                )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
const SingleOrder = ( props ) =>
{

    // console.log( 123456789 )
    const handleSubmit = async () =>
    {
        if ( props.bill.options === 'borrow' && ( props.bill.receiveDate === null || props.bill.returnDate === null ) )
        {
            alert( props.words.dateNull )
        }
        else if ( props.customUser.phone === "" || props.customUser.address === "" || props.customUser.phone === null || props.customUser.address === null )
        {
            alert( props.words.infoErr )
        }
        else
        {
            var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ props.bill.id }`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { "order": props.bill } )
            } )
            var data = await resp.text()
            if ( resp.ok )
            {
                window.location.href = "/cart"
            }
            else
            {
                if ( data === "403" )
                {
                    alert( props.words.dateErr )
                }
            }
        }

    }
    useEffect(
        () =>
        {
            console.log( props.bill )
        }, [ props.bill ]
    )
    // console.log( props.props.bill )
    return (
        <>
            <div className="fpassword">
                <button className="btn btn-dark"
                    onClick={ () =>
                    {
                        props.setView( false )
                    } }
                >x</button>
            </div>
            <br />
            <div class="checkout-left">
                <div class="col-md-4 checkout-left-basket">
                    <h4>{ props.words.pay }</h4>
                    <ul>
                        <li>{ props.words.product }
                            <span>{ props.bill.book.bookName } </span>
                        </li>
                        <li>{ props.words.author }
                            <span>{ props.bill.book.bookAuthor } </span>
                        </li>
                        <li>{ props.words.category }
                            <span>{ props.bill.book.category ? props.bill.book.category.categoryName : '' } </span>
                        </li>

                        <li>{ props.words.quantity }
                            <span>
                                <div class="btn-toolbar" >
                                    <div class="btn-group mr-2" >
                                        {
                                            props.bill.options === 'buy' && <button type="button" class="btn btn-secondary"
                                                onClick={ () =>
                                                {
                                                    if ( props.bill.number === 1 )
                                                    {
                                                        alert( props.words.alert1 )
                                                    }
                                                    else
                                                    {
                                                        props.setBill( prevData => ( { ...prevData, [ 'number' ]: props.bill.number - 1 } ) )
                                                    }
                                                } }
                                            >-</button>
                                        }

                                        <button type="button" class="btn btn-secondary">{ props.bill.number }</button>
                                        {
                                            props.bill.options === "buy" && <button type="button" class="btn btn-secondary"
                                                onClick={ () =>
                                                {
                                                    if ( props.bill.options === 'buy' )
                                                    {
                                                        if ( props.bill.number === props.bill.book.buy )
                                                        {
                                                            alert( props.words.alert2 )
                                                        }
                                                        else
                                                        {
                                                            props.setBill( prevData => ( { ...prevData, [ 'number' ]: props.bill.number + 1 } ) )
                                                        }
                                                    }

                                                } }
                                            >+</button>
                                        }

                                    </div>
                                </div>
                            </span>
                        </li>
                        <li>{ props.words.price }
                            <span>${ props.bill.price * props.bill.number }</span>
                        </li>

                    </ul>
                    <div className="fpassword">
                        <button class="submit check_out"
                            onClick={ () =>
                            {
                                props.setBill( prevData => ( { ...prevData, [ 'buy' ]: 1 } ) )
                                handleSubmit()
                            } }
                        >
                            { props.bill.options === 'buy' ? props.words.buy : props.words.borrow }
                        </button>
                    </div>
                </div>
                <div class="col-md-8 address_form">
                    <h4>Billing Address</h4>
                    <form class="creditly-card-form shopf-sear-headinfo_form">
                        <div class="creditly-wrapper wrapper">
                            <div class="information-wrapper">
                                <div class="first-row form-group">
                                    {
                                        props.bill.options === 'borrow' && (
                                            <>
                                                <div class="row">
                                                    <div className="col-md-6">
                                                        <label class="control-label">{ props.words.borrowDate }: </label>
                                                        <input class="billing-address-name form-control" type="date" name="name"
                                                            value={ props.bill.receiveDate }
                                                            onChange={
                                                                ( e ) => props.setBill( prevData => ( { ...prevData, [ 'receiveDate' ]: e.target.value } ) )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label class="control-label">{ props.words.returnDate }: </label>
                                                        <input class="billing-address-name form-control" type="date" name="name"
                                                            value={ props.bill.returnDate }
                                                            onChange={
                                                                ( e ) => props.setBill( prevData => ( { ...prevData, [ 'returnDate' ]: e.target.value } ) )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    <div class="controls">
                                        <label class="control-label">{ props.words.name }: </label>
                                        <input class="billing-address-name form-control" type="text" name="name" placeholder={ props.customUser.firstName + ' ' + props.customUser.lastName } disabled />
                                    </div>
                                    <div class="card_number_grids">
                                        <div class="card_number_grid_left">
                                            <div class="controls">
                                                <label class="control-label">{ props.words.phone }:</label>
                                                <input class="form-control" type="text" placeholder={ props.customUser.phone } disabled />
                                            </div>
                                        </div>
                                        <div class="card_number_grid_right">
                                            <div class="controls">
                                                <label class="control-label">{ props.words.address }: </label>
                                                <input class="form-control" type="text" placeholder={ props.customUser.address } disabled />
                                            </div>
                                        </div>
                                        <div class="card_number_grid_right">
                                            <div class="controls">
                                                <label class="control-label">{ props.words.company }: </label>
                                                <input class="form-control" type="text" placeholder={ props.customUser.company } disabled />
                                            </div>
                                        </div>
                                        <div class="clear"> </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </form>

                </div>

                <div class="clearfix"> </div>

            </div>
        </>
    )
}

const Cart = () =>
{
    const [ view, setView ] = useState( false )
    const [ customUser, setCustomUser ] = useState( [] )
    const [ bill, setBill ] = useState( [] )
    const [ language, setLanguage ] = useState( localStorage.getItem( "language" ) )
    const [ words, setWords ] = useState( {
        home: "Home Page",
        language: "Language",
        manage: "Manage",
        profile: "Profile",
        logout: "Logout",
        login: "Log in",
        search: "Find book ",
        product: "Product",
        bookName: "Title",
        author: "Author",
        price: "Product Price",
        status: "Status",
        option: "Option",
        buyBook: "Buy",
        borrowBook: "Borrow",
        borrowDate: "Book Loan Date",
        returnDate: "Expiration Date",
        extraDate: "Extra Date",
        buy: "Buy",
        borrow: "Register",
        Delete: "Delete",
        category: "Category",
        pay: "Product payment",
        quantity: "Quantity",
        bill: "Billing Address",
        name: "Full Name",
        phone: "Phone Number",
        address: "Address",
        company: "Company",
        Processing: "Waiting for approval",
        alert1: "Minimum quantity is 1",
        alert2: "Quantity has reached the maximum level",
        delivered: "Delivered",
        borrowing: "Borrowing",
        returned: "Returned the book",
        confirmOrder: "Are you sure you want to delete this order?",
        dateErr: "Borrowing date must be prior to repayment date",
        delivering: "Delivering",
        received: "Book received",
        giveBook: "Give book back",
        buyList: "Buy List",
        borrowList: "Borrow List",
        dateNull: "Please fill in the date",
        infoErr: "Please fill in your personal information before purchasing",
        wait: "Waiting for approval",
        all: "All",
        paid: "returned the book",
        deleted: "This book has been deleted",
        refuse: "Refuse",
        cancel: "Cancel",
        confirmCancel: "Are you sure you want to cancel this order?",

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
                        product: "Product",
                        bookName: "Title",
                        author: "Author",
                        price: "Product Price",
                        status: "Status",
                        option: "Option",
                        buyBook: "Book to Buy",
                        borrowBook: "Book to borrow",
                        borrowDate: "Book Loan Date",
                        returnDate: "Expiration Date",
                        extraDate: "Extra Date",
                        buy: "Buy",
                        borrow: "Register",
                        Delete: "Delete",
                        category: "Category",
                        pay: "Product payment",
                        quantity: "Quantity",
                        bill: "Billing Address",
                        name: "Full Name",
                        phone: "Phone Number",
                        address: "Address",
                        company: "Company",
                        Processing: "Waiting for approval",
                        alert1: "Minimum quantity is 1",
                        alert2: "Quantity has reached the maximum level",
                        delivered: "Delivered",
                        borrowing: "Borrowing books",
                        returned: "Returned the book",
                        confirmOrder: "Are you sure you want to delete this order?",
                        dateErr: "Borrowing date must be prior to repayment date",
                        delivering: "Delivering",
                        received: "Book received",
                        giveBook: "Give book back",
                        buyList: "Buy List",
                        borrowList: "Borrow List",
                        dateNull: "Please fill in the date",
                        infoErr: "Please fill in your personal information before purchasing",
                        wait: "Waiting for approval",
                        all: "All",
                        paid: "returned the book",
                        deleted: "This book has been deleted",
                        refuse: "Refuse",
                        cancel: "Cancel",
                        confirmCancel: "Are you sure you want to cancel this order?",
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
            const fetchData = async () =>
            {

                var resp = await fetch( "http://localhost:8080/api/auth/info", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                var data = await resp.json()
                setCustomUser( data )
            }
            fetchData()
        }, []
    )

    return (
        <>
            <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <div id="home">
                    <Navbar
                        firstname={ customUser.firstName }
                        lastname={ customUser.lastName }
                        roles={ customUser.roles }
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
                    <div class="innerf-pages section">
                        <div class="container">
                            <div class="privacy about">

                                {
                                    view === false ? (
                                        <ListOrder
                                            setView={ setView }
                                            customUser={ customUser }
                                            setBill={ setBill }
                                            words={ words }

                                        />
                                    ) : (
                                        <SingleOrder
                                            setView={ setView }
                                            customUser={ customUser }
                                            bill={ bill }
                                            setBill={ setBill }
                                            words={ words }
                                        />

                                    )
                                }

                            </div>

                        </div>
                    </div>

                </div>
            </body>

        </>
    )
}
export default Cart