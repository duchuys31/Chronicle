import { useEffect, useState } from "react"

const token = localStorage.getItem( "token" )

export const ProfileUser = ( props ) =>
{

    return (
        <>
            <div className="fpassword">
                <button
                    onClick={ () =>
                    {
                        props.setShowProfileUser( false )
                    } }
                    className="btn btn-dark">Back</button>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <label for="exampleFormControlTextarea1">{ props.words.firstName }</label>
                            <input type="text" class="form-control" placeholder="Họ"
                                name="firstName"
                                value={ props.user.firstName }
                                disabled
                            />
                        </div>

                        <div className="col-md-4">
                            <label for="exampleFormControlTextarea1">{ props.words.lastName }</label>
                            <input type="text" class="form-control" placeholder="Tên"
                                name="lastName"
                                value={ props.user.lastName }
                                disabled

                            />
                        </div>
                        <div className="col-md-4">
                            <label for="exampleFormControlTextarea1">Email</label>
                            <input type="text" class="form-control" placeholder="Email"
                                name="email"
                                value={ props.user.email }
                                disabled

                            />
                        </div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">{ props.words.address }</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Mô tả chi tiết"
                            name="address"
                            value={ props.user.address }
                            disabled

                        ></textarea>
                    </div>

                    <label for="exampleFormControlTextarea1">{ props.words.birthDay }</label>
                    <input type="date" class="form-control"
                        name="date"
                        value={ props.user.date }
                        disabled

                    />
                    <label for="exampleFormControlTextarea1">{ props.words.phone }</label>
                    <input type="text" class="form-control" placeholder="Số điện thoại"
                        name="phone"
                        value={ props.user.phone }
                        disabled

                    />
                    <label for="exampleFormControlTextarea1">{ props.words.company }</label>
                    <input type="text" class="form-control" placeholder="Nơi làm việc"
                        name="company"
                        value={ props.user.company }
                        disabled


                    />
                    <label for="exampleFormControlTextarea1">{ props.words.position }</label>
                    <input type="text" class="form-control" placeholder="Chức vụ"
                        name="position"
                        value={ props.user.position }
                        disabled

                    />
                    <br />



                </div>

            </div>

        </>
    )
}

const Order = ( props ) =>
{

    const acceptOrder = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ props.order.id }`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": props.order } )
        } )
        if ( resp.ok )
        {
            props.setReset( true )
        }
    }
    const deleteOrder = () =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.confirmOrder ) )
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
                    props.setReset( true )
                } )
                .catch( error => console.error( error ) )
        }

    }
    return (
        <>
            <tr class="rem1">
                <td class="invert">{ props.order.id }</td>
                <td class="invert">{ props.order.user.username }</td>
                <td class="invert">
                    <a onClick={ () =>
                    {
                        props.setShowProfileUser( true )
                        props.setUser( props.order.user )
                    } }>
                        { props.order.user.firstName + ' ' + props.order.user.lastName }
                    </a>
                </td>
                <td class="invert-image">
                    <a>
                        {
                            props.order.book !== null ? <img src={ props.order.book.bookImage } alt=" " class="img-responsive" /> : props.words.deleted
                        }

                    </a>
                </td>

                <td class="invert">{ props.order.book !== null ? props.order.book.bookName : props.words.deleted }</td>
                <td class="invert">
                    { props.order.book !== null ? props.order.book.bookAuthor : props.words.deleted }
                </td>
                <td class="invert">{ props.order.book !== null ? props.order.book.category.categoryName : props.words.deleted }</td>
                <td class="invert">{ props.order.book !== null ? props.order.book.publisher : props.words.deleted }</td>

                <td class="invert">
                    {
                        props.order.number
                    }
                </td>

                <td class="invert">${ props.order.number * props.order.price }</td>
                <td class="invert">
                    <input type="date" name="" value={
                        props.order.extraDate
                    }
                        disabled
                    />

                </td>
                <td>
                    {
                        props.order.book === null ? '' :
                            props.order.buy === 2 ? (
                                <>
                                    { props.words.delivering }
                                </>
                            ) : props.order.buy === 3 ? (
                                <>{ props.words.delivered }</>
                            ) : (
                                <></>
                            )
                    }
                </td>
                <td class="invert">
                    {
                        props.order.buy === 1 ? (
                            <>
                                {
                                    props.order.buy !== null && <button type="" className="btn btn-success"
                                        onClick={ () => acceptOrder() }
                                    >{ props.words.accept }</button>
                                }
                                { ' ' }
                                <button type="" className="btn btn-danger"
                                    onClick={ () => deleteOrder() }
                                >{ props.words.Delete }</button>
                            </>
                        ) : ( props.order.buy === 3 || props.order.book === null ) ? (
                            <>
                                <button type="" className="btn btn-danger"
                                    onClick={ () => deleteOrder() }
                                >{ props.words.Delete }</button>
                            </>
                        ) : (
                            <></>
                        )
                    }
                </td>

            </tr>
        </>
    )
}

const ListOrder = ( props ) =>
{
    const [ bookSearch, setBookSearch ] = useState( [] )
    const [ categories, setCategories ] = useState( [] )
    const [ orders, setOrders ] = useState( [] )
    const [ username, setUsername ] = useState( '' )
    const [ buy, setBuy ] = useState( 0 )

    const checkNull = () =>
    {
        const keys = [ 'bookName', 'bookAuthor', 'publisher' ]
        return keys.every(
            key => (
                bookSearch.hasOwnProperty( key ) && ( bookSearch[ key ] === null || bookSearch[ key ].length === 0 )
            )
        ) && bookSearch.category === null && ( username === null || username.length === 0 )

    }

    const check = ( book ) =>
    {
        const keys = [ 'bookName', 'bookAuthor', 'publisher' ]
        return keys.every(
            key => (
                ( book.hasOwnProperty( key ) && ( book[ key ] === bookSearch[ key ] || book[ key ].includes( bookSearch[ key ] ) || bookSearch[ key ] == null ) )
            )
        ) && ( bookSearch.category === null || ( book.category && bookSearch.category && book.category.categoryName === bookSearch.category.categoryName ) )
    }
    const fetchData = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/admin/listBuy", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            }
        } )
        var data = await resp.json()
        props.setReset( false )
        setOrders( data )
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
            console.log( buy )
        }, [ buy ]
    )
    console.log( orders )
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
                                <input type="text" class="form-control"
                                    onChange={ handleChange }
                                    name="bookName"
                                    value={ bookSearch.bookName }
                                />
                            </div>
                            <div className="col-md-2">
                                <label for="exampleFormControlTextarea1">{ props.words.author }</label>
                                <input type="text" class="form-control"
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
                                <input type="text" class="form-control" onChange={ handleChange }
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
                                        { props.words.delivered }
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
                        <th>{ props.words.quantity }</th>
                        <th>{ props.words.price }</th>
                        <th>{ props.words.date }</th>
                        <th>{ props.words.status }</th>
                        <th>{ props.words.option }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders
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
                                ( order ) => (
                                    <Order
                                        order={ order }
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

const OrderManegament = ( props ) =>
{
    const [ user, setUser ] = useState( [] )
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
                                        <ListOrder
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
export default OrderManegament