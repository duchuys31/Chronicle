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
import CategoryManegament from "./Components/Admin/CategoryManegement"
import Footer from "./Components/Home/Footer"
import BookManegament from "./Components/Admin/BookManegement"
import UserManegament from "./Components/Admin/UserManagement"
import OrderManegament from "./Components/Admin/OrderManagement"
import BorowManegament from "./Components/Admin/BorrowManagement"



const Admin = () =>
{
    const token = localStorage.getItem( "token" )
    const [ customUser, setCustomUser ] = useState( [] )
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
        buyBook: "Book to Buy",
        borrowBook: "Book to borrow",
        borrowDate: "Book Loan Date",
        returnDate: "Expiration Date",
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
        publisher: "Publisher",
        all: "All",
        deliveryDate: "Book Release Date",
        pageNumber: "Page Number",
        quantity: "quantity",
        view: "View",
        Describe: "Describe",
        Language: "Language",
        Upload: "Upload",
        roles: "Roles",
        lock: "Temporary lock",
        date: "Date",
        accept: "Accept",
        book: "Book",
        user: "User",
        orderList: "Order List",
        borrowList: "Borrow List",
        change: "Change",
        save: "save",
        delivered: "Delivered",
        wait: "Waiting for approval",
        borrowing: "Borrowing books",
        paid: "returned the book",
        firstName: "First Name",
        lastName: "Last Name",
        birthDay: "Date Of Birth",
        position: "Position",
        confirmBook: "Are you sure you want to delete this book?",
        confirmCategory: "Are you sure you want to delete this category?",
        confirmUser: "Are you sure you want to delete this user?",
        confirmOrder: "Are you sure you want to delete this order?",
        delivering: "Delivering",
        imageNull: "Please upload pictures",
        bookErr: "This book already exists",
        categoryErr: "Category already exists",
        userErr: "Username already exists",
        createBook: "You definitely want to create a new book",
        createCategory: "You definitely want to create a new category",
        createUser: "You definitely want to create a new user",
        add: "Add",
        forBorrow: "Number of books to lend",
        forBuy: "Number of books for sale",
        deleted: "This book has been deleted",

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
                        publisher: "Publisher",
                        all: "All",
                        deliveryDate: "Book Release Date",
                        pageNumber: "Page Number",
                        quantity: "Quantity",
                        view: "View",
                        Describe: "Describe",
                        Language: "Language",
                        Upload: "Upload",
                        roles: "Roles",
                        lock: "Temporary lock",
                        date: "Date",
                        accept: "Accept",
                        book: "Book",
                        user: "User",
                        orderList: "Order List",
                        borrowList: "Borrow List",
                        change: "Change",
                        save: "save",
                        delivered: "Delivered",
                        wait: "Waiting for approval",
                        borrowing: "Borrowing books",
                        paid: "Returned the book",
                        firstName: "First Name",
                        lastName: "Last Name",
                        birthDay: "Date Of Birth",
                        position: "Position",
                        confirmBook: "Are you sure you want to delete this book?",
                        confirmCategory: "Are you sure you want to delete this category?",
                        confirmUser: "Are you sure you want to delete this user?",
                        confirmOrder: "Are you sure you want to delete this order?",
                        delivering: "Delivering",
                        imageNull: "Please upload pictures",
                        bookErr: "This book already exists",
                        categoryErr: "Category already exists",
                        userErr: "Username already exists",
                        createBook: "You definitely want to create a new book",
                        createCategory: "You definitely want to create a new category",
                        createUser: "You definitely want to create a new user",
                        add: "Add",
                        forBorrow: "Number of books to lend",
                        forBuy: "Number of books for sale",
                        deleted: "This book has been deleted",

                    },
                    "language": language
                } )
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) =>
                {
                    setWords( data )
                    console.log( data )
                } )
                .catch( ( err ) => console.log( err ) );
            localStorage.setItem( "language", language )
            console.log( language )
        }, [ language ]
    )

    console.log( JSON.stringify( { "token": token } ) )

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
                .then( ( data ) => setCustomUser( data ) )
                .catch( ( err ) => console.log( err ) );
        }, [ token ]
    )

    console.log( customUser )
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

                    <div className="innerf-pages section">

                        <div className="">
                            <div className="side-bar col-md-2">
                                <div className="left-side">

                                    <input type="button" name="" value={ words.category } className="form-control" onClick={ () =>
                                    {
                                        localStorage.setItem( "mode", "category" )
                                        window.location.href = "/admin"
                                    } } />
                                    <input type="button" name="" value={ words.book } className="form-control" onClick={ () =>
                                    {
                                        localStorage.setItem( "mode", "book" )
                                        window.location.href = "/admin"

                                    } } />
                                    <input type="button" name="" value={ words.user } className="form-control" onClick={ () =>
                                    {
                                        localStorage.setItem( "mode", "user" )
                                        window.location.href = "/admin"

                                    } } />
                                    <input type="button" name="" value={ words.orderList } className="form-control" onClick={ () =>
                                    {
                                        localStorage.setItem( "mode", "order" )
                                        window.location.href = "/admin"

                                    } } />
                                    <input type="button" name="" value={ words.borrowList } className="form-control" onClick={ () =>
                                    {
                                        localStorage.setItem( "mode", "borrow" )
                                        window.location.href = "/admin"
                                    } } />
                                </div>
                            </div>

                            {
                                localStorage.getItem( "mode" ) === "category" && <CategoryManegament
                                    words={ words }
                                />
                            }

                            {
                                localStorage.getItem( "mode" ) === "book" && <BookManegament
                                    words={ words }

                                />
                            }

                            {
                                localStorage.getItem( "mode" ) === "user" && <UserManegament
                                    words={ words }

                                />
                            }

                            {
                                localStorage.getItem( "mode" ) === "order" && <OrderManegament
                                    words={ words }

                                />
                            }
                            {
                                localStorage.getItem( "mode" ) === "borrow" && <BorowManegament
                                    words={ words }
                                />
                            }

                        </div>
                    </div>
                </div>
            </body >

        </>
    )
}
export default Admin