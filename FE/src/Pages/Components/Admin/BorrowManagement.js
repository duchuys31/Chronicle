import { useEffect, useState } from "react"
import { ProfileUser } from "./OrderManagement"

const token = localStorage.getItem( "token" )


const Borrow = ( props ) =>
{
    const acceptBorrow = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ props.borrow.id }`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": props.borrow } )
        } )
        if ( resp.ok )
        {
            props.setReset( true )
        }
    }
    const deleteBorrow = () =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.confirmOrder ) )
        {
            fetch( "http://localhost:8080/api/BuyAndBorrow/refuse/" + `${ props.borrow.id }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( response => response.text() )
                .then( data =>
                {
                    props.setReset( true )
                } )
                .catch( error => console.error( error ) )
        }

    }
    return (
        <>
            <tr class="rem1">
                <td class="invert">{ props.borrow.id }</td>
                <td class="invert">{ props.borrow.user.username }</td>
                <td class="invert">
                    <a onClick={ () =>
                    {
                        props.setShowProfileUser( true )
                        props.setUser( props.borrow.user )
                    } }>
                        { props.borrow.user.firstName + ' ' + props.borrow.user.lastName }
                    </a>
                </td>
                <td class="invert-image">
                    <a>
                        {
                            props.borrow.book !== null ? <img src={ props.borrow.book.bookImage } alt=" " class="img-responsive" /> : props.words.deleted
                        }

                    </a>
                </td>

                <td class="invert">{ props.borrow.book !== null ? props.borrow.book.bookName : props.words.deleted }</td>
                <td class="invert">
                    { props.borrow.book !== null ? props.borrow.book.bookAuthor : props.words.deleted }
                </td>
                <td class="invert">{ props.borrow.book !== null ? props.borrow.book.category.categoryName : props.words.deleted }</td>
                <td class="invert">{ props.borrow.book !== null ? props.borrow.book.publisher : props.words.deleted }</td>



                <td class="invert">${ props.borrow.number * props.borrow.price }</td>
                <td class="invert">
                    <input type="date" name="" value={
                        props.borrow.receiveDate
                    }
                        disabled
                    />

                </td>
                <td class="invert">
                    <input type="date" name="" value={
                        props.borrow.returnDate
                    }
                        disabled
                    />

                </td>
                <td class="invert">
                    {
                        props.borrow.buy === 2 ? (
                            <>{ props.words.delivering }</>
                        ) : (
                            <>
                                {
                                    props.borrow.buy === 3 && props.words.borrowing
                                }
                                {
                                    props.borrow.buy === 4 && props.words.paid
                                }
                            </>
                        )
                    }
                </td>
                <td class="invert">
                    {
                        props.borrow.buy === 1 ? (
                            <>
                                {
                                    props.borrow.buy !== null && <button type="" className="btn btn-success"
                                        onClick={ () => acceptBorrow() }
                                    >{ props.words.accept }</button>
                                }
                                { ' ' }
                                <button type="" className="btn btn-danger"
                                    onClick={ () => deleteBorrow() }
                                >{ props.words.Delete }</button>
                            </>
                        ) : (
                            <>
                                {
                                    props.borrow.buy === 4 &&
                                    <button type="" className="btn btn-danger"
                                        onClick={ () => deleteBorrow() }
                                    >{ props.words.Delete }</button>
                                }
                            </>
                        )
                    }

                </td>
            </tr>
        </>
    )
}

const ListBorrow = ( props ) =>
{
    const [ bookSearch, setBookSearch ] = useState( [] )
    const [ categories, setCategories ] = useState( [] )
    const [ borrows, setBorrows ] = useState( [] )
    const [ username, setUsername ] = useState( '' )
    const [ buy, setBuy ] = useState( 0 )
    const check = ( book ) =>
    {
        const keys = [ 'bookName', 'bookAuthor', 'publisher' ]
        return keys.every(
            key => (
                ( book.hasOwnProperty( key ) && ( book[ key ] === bookSearch[ key ] || book[ key ].includes( bookSearch[ key ] ) || bookSearch[ key ] == null ) )
            )
        ) && ( bookSearch.category === null || ( book.category && bookSearch.category && book.category.categoryName === bookSearch.category.categoryName ) )
    }
    const checkNull = () =>
    {
        const keys = [ 'bookName', 'bookAuthor', 'publisher' ]
        return keys.every(
            key => (
                bookSearch.hasOwnProperty( key ) && ( bookSearch[ key ] === null || bookSearch[ key ].length === 0 )
            )
        ) && bookSearch.category === null && ( username === null || username.length === 0 )

    }
    const fetchData = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/admin/listBorrow", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            }
        } )
        var data = await resp.json()
        props.setReset( false )
        setBorrows( data )
    }
    const getList = () =>
    {
        fetch( "http://localhost:8080/api/book/-1" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBookSearch( data ) )
            .catch( ( err ) => console.log( err ) );
        fetch( "http://localhost:8080/api/category/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setCategories( data ) )
            .catch( ( err ) => console.log( err ) );


    }
    if ( props.reset === true )
    {
        fetchData()
    }
    useEffect(
        () =>
        {
            getList()
            fetchData()
        }, []
    )
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
            console.log( bookSearch )
        }, [ bookSearch ]
    )
    console.log( borrows )
    return (
        <>
            <form>
                <div class="row">
                    <div class="col-md-12">
                        <div className="row">
                            <div className="col-md-2">
                                <label for="exampleFormControlTextarea1">Username</label>
                                <input type="text" class="form-control" placeholder="Username"
                                    name="username"
                                    value={ username }
                                    onChange={ ( e ) => setUsername( e.target.value ) }
                                />
                            </div>
                            <div className="col-md-2">
                                <label for="exampleFormControlTextarea1">{ props.words.bookName }</label>
                                <input type="text" class="form-control" placeholder="Tiêu đề"
                                    onChange={ handleChange }
                                    name="bookName"
                                    value={ bookSearch.bookName }
                                />
                            </div>
                            <div className="col-md-2">
                                <label for="exampleFormControlTextarea1">{ props.words.author }</label>
                                <input type="text" class="form-control" placeholder="Tác giả"
                                    onChange={ handleChange }
                                    name="bookAuthor"
                                    value={ bookSearch.bookAuthor }
                                />
                            </div>
                            <div className="col-md-2">
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
                            <div className="col-md-2">
                                <label for="exampleFormControlTextarea1">{ props.words.publisher }</label>
                                <input type="text" class="form-control" placeholder="Nhà xuất bản" onChange={ handleChange }
                                    name="publisher"
                                    value={ bookSearch.publisher }
                                />
                            </div>
                            <div className="col-md-2">
                                <label for="exampleFormControlTextarea1">{ props.words.status }</label>
                                <select
                                    className='form-control'
                                    onChange={ ( e ) => setBuy( parseInt( e.target.value ) ) }
                                    required
                                >
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

                                </select>
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
                        <th>Username</th>
                        <th>{ props.words.name }</th>
                        <th>{ props.words.product }</th>
                        <th>{ props.words.bookName }</th>
                        <th>{ props.words.author }</th>
                        <th>{ props.words.category }</th>
                        <th>{ props.words.publisher }</th>
                        <th>{ props.words.price }</th>
                        <th>{ props.words.borrowDate }</th>
                        <th>{ props.words.returnDate }</th>
                        <th>{ props.words.status }</th>
                        <th>{ props.words.option }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        borrows
                            .filter(
                                order =>
                                {
                                    return ( order.book === null && checkNull() ) ||
                                        ( ( order.book && check( order.book ) ) &&
                                            order.user.username.includes( username ) &&
                                            ( buy === 0 || buy === order.buy ) )
                                }
                            )
                            .map(
                                ( borrow ) => (
                                    <Borrow
                                        borrow={ borrow }
                                        setShowProfileUser={ props.setShowProfileUser }
                                        setUser={ props.setUser }
                                        setReset={ props.setReset }
                                        words={ props.words }
                                    />
                                )
                            )
                    }
                </tbody>
            </table>
        </>

    )
}

const BorrowManegament = ( props ) =>
{
    const [ user, setUser ] = useState( 0 )
    const [ reset, setReset ] = useState( false )
    const [ showProfile, setShowProfileUser ] = useState( false )
    return (
        <>
            <div className="left-ads-display col-md-10">
                <div className="wrapper_top_shop">
                    {/* <!-- product-sec1 --> */ }
                    <div className="product-sec1">
                        <div className="col-md-12 product-men">
                            <div className="product-chr-info chr">
                                {
                                    showProfile ? (
                                        <ProfileUser
                                            setShowProfileUser={ setShowProfileUser }
                                            user={ user }
                                            setUser={ setUser }
                                            setReset={ setReset }
                                            reset={ reset }
                                            words={ props.words }
                                        />
                                    ) : (
                                        <ListBorrow
                                            setShowProfileUser={ setShowProfileUser }
                                            user={ user }
                                            setUser={ setUser }
                                            setReset={ setReset }
                                            reset={ reset }
                                            words={ props.words }
                                        />
                                    )
                                }

                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    {/* <!-- //product-sec1 --> */ }
                    <div className="clearfix"></div>

                </div>
                <br /><br /><br /><br /><br /><br />

            </div>
        </>
    )
}
export default BorrowManegament