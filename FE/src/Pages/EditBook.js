import { useEffect, useState } from "react"
import Footer from "./Components/Home/Footer"
import { useParams } from "react-router-dom"
import Loader from "./Components/Loader"

const EditBook = () =>
{
    const id = useParams().id
    const token = localStorage.getItem( "token" )
    const [ categories, setCategories ] = useState( [] )
    const [ book, setBook ] = useState( [] )
    const [ editOn, setEditOn ] = useState( id > 0 ? false : true )
    const [ language, setLanguage ] = useState( localStorage.getItem( "language" ) )
    const [ uploading, setUploading ] = useState( false )
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
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/category/list" )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCategories( data ) )
                .catch( ( err ) => console.log( err ) );
            if ( id !== undefined )
            {
                fetch( "http://localhost:8080/api/book/" + `${ id }` )
                    .then( ( response ) => response.json() )
                    .then( ( data ) => setBook( data ) )
                    .catch( ( err ) => console.log( err ) );
            }

        }, [ id ]
    )
    const handleImageUpload = ( e ) =>
    {
        setUploading( true )
        const file = e.target.files[ 0 ];
        const formData = new FormData()
        formData.append( "image", file )
        fetch( "http://localhost:8080/api/image/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`
            },
            body: formData
        } )
            .then( ( response ) => response.text() )
            .then( ( data ) =>
            {
                setUploading( false )
                console.log( data )
                setBook( prevData => ( { ...prevData, [ 'bookImage' ]: data } ) );
            } )
            .catch( ( err ) => console.log( err ) );

    }
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        if ( name === 'category' )
        {
            setBook( prevData => ( { ...prevData, [ name ]: JSON.parse( value ) } ) );
        }
        else
        {
            setBook( prevData => ( { ...prevData, [ name ]: value } ) );
        }
    }
    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        if ( editOn === false )
        {
            setEditOn( true )
        }
        else if ( book.bookImage === null )
        {
            alert( words.imageNull )
        }
        else
        {
            console.log(
                JSON.stringify( { "token": token, "book": book } )
            )
            fetch( "http://localhost:8080/api/book/" + `${ id }`, {
                method: id < 0 ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
                body: JSON.stringify( { "book": book } )

            } )
                .then( response =>
                {
                    if ( response.ok )
                    {
                        // props.setEdit( false )
                        window.location.href = "/admin"
                        return response.text()
                    }
                    else
                    {
                        alert( words.bookErr )
                        return response.text()
                    }
                } )
                .then( data =>
                {
                    console.log( data )
                    if ( data !== '' )
                    {
                        alert( data )
                    }

                } )
                .catch( error => console.error( error ) )
        }
    }
    return (
        <>
            <br />
            <br />
            <center>
                <div className="">
                    <div className="left-ads-display col-md-12">
                        <div className="wrapper_top_shop">
                            <div className="product-sec1">
                                <div className="col-md-12 product-men">
                                    <div className="product-chr-info chr">
                                        <div className="">

                                            <div className="fpassword">
                                                <button type="" className="btn btn-success" onClick={ () => window.location.href = "/admin" }>x</button>
                                            </div>
                                            <br /><br />
                                            <br /><br />
                                            <form onSubmit={ handleSubmit }>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.bookName }</label>
                                                                <input type="text" class="form-control"
                                                                    onChange={ handleChange }
                                                                    name="bookName"
                                                                    value={ book.bookName }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.author }</label>
                                                                <input type="text" class="form-control"
                                                                    onChange={ handleChange }
                                                                    name="bookAuthor"
                                                                    value={ book.bookAuthor }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div class="form-group">
                                                            <label for="exampleFormControlTextarea1">{ words.Describe }</label>
                                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                                onChange={ handleChange }
                                                                name="bookDescribe"
                                                                value={ book.bookDescribe }
                                                                disabled={ !editOn }
                                                                required
                                                            ></textarea>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.deliveryDate }</label>
                                                                <input type="date" class="form-control" onChange={ handleChange }
                                                                    name="bookDate"
                                                                    value={ book.bookDate }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.pageNumber }</label>
                                                                <input type="number" class="form-control" onChange={ handleChange }
                                                                    name="pageNumber"
                                                                    value={ book.pageNumber }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.category }</label>
                                                                <select
                                                                    className='form-control'
                                                                    name="category"
                                                                    onChange={ handleChange }
                                                                    value={ book.category }
                                                                    disabled={ !editOn }
                                                                    required
                                                                >
                                                                    <option value={ book.category }>
                                                                        {
                                                                            book.category ? book.category.categoryName : ''
                                                                        }
                                                                    </option>
                                                                    { categories.map( ( category ) => (
                                                                        <option value={ JSON.stringify( category ) }>{ category.categoryName }</option>
                                                                    ) ) }
                                                                </select>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.price }</label>
                                                                <input type="number" class="form-control" onChange={ handleChange }
                                                                    name="price"
                                                                    value={ book.price }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.publisher }</label>
                                                                <input type="text" class="form-control" onChange={ handleChange }
                                                                    name="publisher"
                                                                    value={ book.publisher }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.Language }</label>
                                                                <input type="text" class="form-control" onChange={ handleChange }
                                                                    name="language"
                                                                    value={ book.language }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.forBuy }</label>
                                                                <input type="number" class="form-control" placeholder="Sách bán" onChange={ handleChange }
                                                                    name="buy"
                                                                    value={ book.buy }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6">
                                                                <label for="exampleFormControlTextarea1">{ words.forBorrow }</label>
                                                                <input type="number" class="form-control" placeholder="Sách cho mượn" onChange={ handleChange }
                                                                    name="borrow"
                                                                    value={ book.borrow }
                                                                    disabled={ !editOn }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div className="row">
                                                            {
                                                                editOn ? (
                                                                    <>
                                                                        <center>
                                                                            <label for="upload" class="btn btn-success">{ words.Upload }</label> <br />
                                                                            <input type="file" id="upload" class="d-none" onChange={ handleImageUpload } />
                                                                        </center>
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )
                                                            }

                                                        </div>
                                                        <br />
                                                        <div className="row">
                                                            <center>
                                                                {
                                                                    uploading ? (
                                                                        <><Loader /></>
                                                                    ) : (
                                                                        <>
                                                                            <img id="previewImage" src={ book.bookImage } style={ { maxWidth: "400px" } } />
                                                                        </>
                                                                    )
                                                                }
                                                            </center>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br /><br />
                                                <br /><br />
                                                <div class="cpy-right-huy31">

                                                </div>
                                                <br />
                                                <div className="fpassword">

                                                    {
                                                        editOn ? (
                                                            <>
                                                                <button class="btn btn-success">{ id !== '-1' ? words.save : words.add }</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button class="btn btn-success">{ words.change }</button>
                                                            </>
                                                        )
                                                    }

                                                    <br />

                                                </div>
                                            </form>
                                            <br />

                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>
                        </div>


                    </div>
                </div>
            </center>




        </>
    )
}
export default EditBook