import { useEffect, useState } from "react"

const token = localStorage.getItem( "token" )

const EditCategory = ( props ) =>
{
    const [ category, setCategory ] = useState( [] )
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/category/" + `${ props.id }` )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCategory( data ) )
                .catch( ( err ) => console.log( err ) );
        }, []
    )
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        setCategory( prevData => ( { ...prevData, [ name ]: value, [ 'sumBook' ]: 0 } ) );
    }
    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        console.log(
            JSON.stringify( { "token": token, "category": category } )
        )
        fetch( "http://localhost:8080/api/category/" + `${ props.id }`, {
            method: props.id < 0 ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ token }`
            },
            body: JSON.stringify( { "category": category } )
        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    props.setEdit( false )
                    return response.text()
                }
                else
                {
                    alert( props.words.categoryErr )
                    return response.text()
                }
            } )
            .then( data =>
            {
                // console.log( data )
                // if ( data !== '' )
                // {
                //     alert( data )
                // }

            } )
            .catch( error => console.error( error ) )
    }
    useEffect(
        () =>
        {
            console.log( category )
        }, [ category ]
    )
    return (
        <>
            <div className="fpassword">
                <button onClick={ () => props.setEdit( false ) } type="" className="btn btn-dark">x</button>
            </div>
            <form onSubmit={ handleSubmit }>
                <div class="form-group">
                    <label for="exampleInputEmail1">{ props.words.category }</label>
                    <input value={ category.categoryName } type="name" class="form-control" placeholder="Enter Name" name="categoryName" onChange={ handleChange } required />
                </div>
                <div className="fpassword">
                    <button type="submit" class="btn btn-info">{ props.words.save }</button>
                </div>
                <br />
            </form>
        </>
    )
}

const ShowCategory = ( props ) =>
{
    const [ categories, setCategories ] = useState( [] )
    const getList = () =>
    {
        fetch( "http://localhost:8080/api/category/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setCategories( data ) )
            .catch( ( err ) => console.log( err ) );
    }
    useEffect(
        () =>
        {
            getList()
        }, []
    )

    const deleteCategory = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.confirmCategory ) )
        {
            fetch( "http://localhost:8080/api/category/" + `${ id }`, {
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
    const confirmCreate = () =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( props.words.createCategory ) )
        {
            props.setId( -1 )
            props.setEdit( true )
        }
    }
    console.log( categories )
    return (
        <>
            <div className="fpassword">
                <button onClick={ () => confirmCreate() } type="" className="btn btn-info">+</button>
            </div>
            <table class="timetable_sub table-responsive">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{ props.words.category }</th>
                        <th>{ props.words.quantity }</th>
                        <th>{ props.words.option }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(
                            ( category ) => (
                                <tr class="rem1">

                                    <td class="invert">{ category.categoryID }</td>
                                    <td class="invert">{ category.categoryName }</td>
                                    <td class="invert">
                                        { category.sumBook }
                                    </td>

                                    <td class="invert">
                                        <button type="" className="btn btn-success btn-sm"
                                            onClick={ () =>
                                            {
                                                props.setId( category.categoryID )
                                                props.setEdit( true )
                                            } }
                                        >{ props.words.view }</button>
                                        { ' ' }
                                        <button type="" className="btn btn-danger btn-sm" onClick={ () =>
                                        {
                                            deleteCategory( category.categoryID )
                                        } }>{ props.words.Delete }</button>
                                    </td>
                                </tr>
                            )
                        )
                    }


                </tbody>
            </table>
        </>
    )
}



const CategoryManegament = ( props ) =>
{
    const [ edit, setEdit ] = useState( false )
    const [ id, setId ] = useState( 0 )
    return (
        <>
            <div className="left-ads-display col-md-10">
                <div className="wrapper_top_shop">
                    <div className="product-sec1">
                        <div className="col-md-12 product-men">
                            <div className="product-chr-info chr">
                                {
                                    edit ? (
                                        <>
                                            <EditCategory
                                                setEdit={ setEdit }
                                                id={ id }
                                                words={ props.words }
                                            />
                                        </>
                                    ) : (
                                        <ShowCategory
                                            setEdit={ setEdit }
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
export default CategoryManegament