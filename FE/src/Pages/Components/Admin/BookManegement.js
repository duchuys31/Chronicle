import { useEffect, useState } from "react"


const token = localStorage.getItem( "token" )

const EditBook = ( props ) =>
{
    const [ categories, setCategories ] = useState( [] )
    const [ book, setBook ] = useState( [] )
    const [ editOn, setEditOn ] = useState( props.id > 0 ? false : true )
    // console.log( book )

    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/category/list" )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCategories( data ) )
                .catch( ( err ) => console.log( err ) );
            fetch( "http://localhost:8080/api/book/" + `${ props.id }` )
                .then( ( response ) => response.json() )
                .then( ( data ) => setBook( data ) )
                .catch( ( err ) => console.log( err ) );

        }, []
    )
    // console.log( book )
    // console.log( categories )
    const handleImageUpload = ( e ) =>
    {
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
            alert( props.words.imageNull )
        }
        else
        {
            console.log(
                JSON.stringify( { "token": token, "book": book } )
            )
            fetch( "http://localhost:8080/api/book/" + `${ props.id }`, {
                method: props.id < 0 ? 'POST' : 'PUT',
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
                        alert( props.words.bookErr )
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

    useEffect(
        () =>
        {
            console.log( editOn )
        }, [ editOn ]
    )
    return (
        <>
            <div className="fpassword">
                <button type="" className="btn btn-dark" onClick={ () => props.setEdit( false ) }>x</button>
            </div>
            <br />
            <br />
            <form onSubmit={ handleSubmit }>
                <div class="row">
                    <div class="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">{ props.words.bookName }</label>
                                <input type="text" class="form-control"
                                    onChange={ handleChange }
                                    name="bookName"
                                    value={ book.bookName }
                                    disabled={ !editOn }
                                    required
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">{ props.words.author }</label>
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
                            <label for="exampleFormControlTextarea1">{ props.words.Describe }</label>
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
                                <label for="exampleFormControlTextarea1">{ props.words.deliveryDate }</label>
                                <input type="date" class="form-control" onChange={ handleChange }
                                    name="bookDate"
                                    value={ book.bookDate }
                                    disabled={ !editOn }
                                    required
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">{ props.words.pageNumber }</label>
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
                                <label for="exampleFormControlTextarea1">{ props.words.category }</label>
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
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">{ props.words.price }</label>
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
                                <label for="exampleFormControlTextarea1">{ props.words.publisher }</label>
                                <input type="text" class="form-control" onChange={ handleChange }
                                    name="publisher"
                                    value={ book.publisher }
                                    disabled={ !editOn }
                                    required
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">{ props.words.Language }</label>
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
                                <label for="exampleFormControlTextarea1">{ props.words.forBuy }</label>
                                <input type="number" class="form-control" placeholder="Sách bán" onChange={ handleChange }
                                    name="buy"
                                    value={ book.buy }
                                    disabled={ !editOn }
                                    required
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">{ props.words.forBorrow }</label>
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
                                            <label for="upload" class="btn btn-success">{ props.words.Upload }</label> <br />
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
                                <img id="previewImage" src={ book.bookImage } style={ { maxWidth: "250px" } } />
                            </center>
                        </div>
                    </div>
                </div>
                <div className="fpassword">
                    {
                        editOn ? (
                            <>
                                <button class="btn btn-info">{ props.words.save }</button>
                            </>
                        ) : (
                            <>
                                <button class="btn btn-info">{ props.words.change }</button>
                            </>
                        )
                    }
                </div>
                <br />
            </form>
        </>
    )
}


const ShowBook = ( props ) =>
{
    const [ books, setBooks ] = useState( [] )
    const [ bookSearch, setBookSearch ] = useState( [] )
    const [ categories, setCategories ] = useState( [] )

    const check = ( book ) =>
    {
        const keys = [ 'bookName', 'bookAuthor', 'publisher' ]
        return keys.every(
            key => (
                ( book.hasOwnProperty( key ) && ( book[ key ] === bookSearch[ key ] || book[ key ].includes( bookSearch[ key ] ) || bookSearch[ key ] == null ) )
            )
        ) && ( bookSearch.category === null || ( bookSearch.category && book.category && book.category.categoryName === bookSearch.category.categoryName ) )
    }

    const getList = () =>
    {
        fetch( "http://localhost:8080/api/book/-1" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBookSearch( data ) )
            .catch( ( err ) => console.log( err ) );
        fetch( "http://localhost:8080/api/book/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBooks( data ) )
            .catch( ( err ) => console.log( err ) );
        fetch( "http://localhost:8080/api/category/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setCategories( data ) )
            .catch( ( err ) => console.log( err ) );

    }
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        if ( name === 'category' )
        {
            setBookSearch( prevData => ( { ...prevData, [ name ]: JSON.parse( value ) } ) );
        }
        else
        {
            setBookSearch( prevData => ( { ...prevData, [ name ]: value } ) );
        }
    }
    useEffect(
        () =>
        {
            getList()

        }, []
    )
    const deleteBook = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.confirmBook ) )
        {
            fetch( "http://localhost:8080/api/book/" + `${ id }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( response => response.text() )
                .then( data =>
                {
                    // console.log( data )
                    getList()
                } )
                .catch( error => console.error( error ) )
        }
    }
    useEffect(
        () =>
        {
            console.log( bookSearch )
        }, [ bookSearch ]
    )
    const confirmCreate = () =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.createBook ) )
        {
            // props.setId( -1 )
            // props.setEdit( true )
            // localStorage.setItem( "viewBook", -1 )
            window.location.href = `/edit_book-1`
        }
    }
    console.log( books )
    return (
        <>


            <div className="fpassword">
                <button type="" className="btn btn-info" onClick={ () => confirmCreate() }>+</button>
            </div>
            <br />
            <br />

            <form>
                <div class="row">
                    <div class="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">{ props.words.bookName }</label>
                                <input type="text" class="form-control" placeholder={ props.words.bookName }
                                    onChange={ handleChange }
                                    name="bookName"
                                    value={ bookSearch.bookName }
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">{ props.words.author }</label>
                                <input type="text" class="form-control" placeholder={ props.words.author }
                                    onChange={ handleChange }
                                    name="bookAuthor"
                                    value={ bookSearch.bookAuthor }
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">{ props.words.category }</label>
                                <select
                                    className='form-control'
                                    name="category"
                                    onChange={ handleChange }
                                    key={ bookSearch.category ? bookSearch.category.categoryName : '' }
                                    value={ bookSearch.category }
                                    required
                                >
                                    <option>
                                        { bookSearch.category ? bookSearch.category.categoryName : '' }
                                    </option>
                                    <option value={ JSON.stringify( null ) }>
                                        { props.words.all }
                                    </option>
                                    { categories
                                        .filter(
                                            category =>
                                            {
                                                return bookSearch.category === null || ( bookSearch.category && category.categoryName != bookSearch.category.categoryName )
                                            }
                                        )
                                        .map( ( category ) => (
                                            <option value={ JSON.stringify( category ) }>{ category.categoryName }</option>
                                        ) ) }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">{ props.words.publisher }</label>
                                <input type="text" class="form-control" placeholder={ props.words.publisher } onChange={ handleChange }
                                    name="publisher"
                                    value={ bookSearch.publisher }
                                />
                            </div>

                        </div>
                        <br />
                    </div>
                </div>
                {/* <div className="fpassword">
                    <button class="btn btn-info" onClick={ () => handleSubmit() }>Save</button>
                </div> */}
                <br />
            </form>
            <table class="timetable_sub table-responsive">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{ props.words.product }</th>

                        <th>{ props.words.bookName }</th>
                        <th>{ props.words.author }</th>
                        <th>{ props.words.category }</th>
                        <th>{ props.words.publisher }</th>
                        <th>{ props.words.deliveryDate }</th>
                        <th>{ props.words.pageNumber }</th>
                        <th>{ props.words.quantity } { props.words.buy }</th>
                        <th>{ props.words.option }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books
                            .filter(
                                book =>
                                {
                                    return check( book )
                                }
                            )
                            .map(
                                ( book ) => (
                                    <>
                                        <tr class="rem1">
                                            <td class="invert">{ book.bookID }</td>
                                            <td class="invert-image">
                                                <a>
                                                    <img src={ book.bookImage } alt=" " class="img-responsive" />
                                                </a>
                                            </td>

                                            <td class="invert">{ book.bookName }</td>
                                            <td class="invert">{ book.bookAuthor }</td>
                                            <td class="invert">{ book.category && book.category.categoryName }</td>
                                            <td class="invert">
                                                { book.publisher }
                                            </td>
                                            <td class="invert">
                                                <input type="date" name="" value={ book.bookDate } disabled />
                                            </td>
                                            <td class="invert">{ book.pageNumber }</td>
                                            <td class="invert">{ book.sumBuy }</td>


                                            <td class="invert">
                                                <button type="" className="btn btn-success btn-sm"
                                                    onClick={ () =>
                                                    {
                                                        // props.setEdit( true )
                                                        // props.setId( book.bookID )
                                                        // localStorage.setItem( "viewBook", book.bookID )
                                                        window.location.href = `/edit_book${ book.bookID }`
                                                    } }
                                                >{ props.words.view }</button>
                                                <button type="" className="btn btn-danger btn-sm"
                                                    onClick={ () =>
                                                    {
                                                        deleteBook( book.bookID )
                                                    } }
                                                >{ props.words.Delete }</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            )
                    }
                </tbody>
            </table>
        </>
    )
}

const BookManegament = ( props ) =>
{
    const [ edit, setEdit ] = useState( false )
    const [ id, setId ] = useState( -1 )
    return (
        <>
            <div className="left-ads-display col-md-10">
                <div className="wrapper_top_shop">
                    <div className="product-sec1">
                        <div className="col-md-12 product-men">
                            <div className="product-chr-info chr">
                                {
                                    edit ? (
                                        <EditBook
                                            setEdit={ setEdit }
                                            id={ id }
                                            setId={ setId }
                                            words={ props.words }
                                        />
                                    ) : (
                                        <ShowBook
                                            setEdit={ setEdit }
                                            id={ id }
                                            setId={ setId }
                                            words={ props.words }
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <br /><br /><br /><br /><br /><br />

            </div>
        </>
    )
}
export default BookManegament