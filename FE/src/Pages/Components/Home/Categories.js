import { useEffect, useState } from "react";

const Categories = ( props ) =>
{
    const [ categories, setCategories ] = useState( [] )

    const getList = () =>
    {
        fetch( "http://localhost:8080/api/category/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setCategories( data ) )
            .catch( ( err ) => console.log( err ) );
    }
    const handleCategoryClick = ( categoryName ) =>
    {
        if ( props.categoryList.includes( categoryName ) )
        {
            props.setCategoryList(
                props.categoryList.filter( ( name ) => name !== categoryName )
            );
        } else
        {
            props.setCategoryList( [ ...props.categoryList, categoryName ] );
        }
    };
    useEffect(
        () =>
        {
            getList()
        }, []
    )

    return (
        <>
            <div className="left-side">
                <h3 className="shopf-sear-headits-sear-head">
                    { props.words.Category }</h3>
                <ul>
                    <li onClick={ () => handleCategoryClick( 'All' ) } >
                        <input type="checkbox" className="checked" />
                        <span className="span">{ props.words.All }</span>
                    </li>
                    {
                        categories.map(
                            ( category ) => (
                                <li onClick={ () => handleCategoryClick( category.categoryName ) } >
                                    <input type="checkbox" className="checked" />
                                    <span className="span">{ category.categoryName }</span>
                                </li>
                            )
                        )
                    }

                </ul>
            </div>
        </>
    )
}
export default Categories