import { useEffect, useState } from "react";
import Loader from "../Loader";



const ListBook = ( props ) =>
{
    const [ books, setBooks ] = useState( [] )
    const points = [ 1, 2, 3, 4, 5 ]
    const getList = () =>
    {
        fetch( "http://localhost:8080/api/book/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBooks( data ) )
            .catch( ( err ) => console.log( err ) );

    }
    useEffect(
        () =>
        {
            getList()

        }, []
    )
    return (
        <>
            {
                books
                    .filter(
                        book =>
                        {
                            return book.bookName.toLowerCase().includes( props.keyword.toLowerCase() ) &&
                                ( props.categoryList.length === 0 || props.categoryList.includes( 'All' ) || props.categoryList.includes( book.category.categoryName ) ) &&
                                book.bookAuthor.toLowerCase().includes( props.author.toLowerCase() ) &&
                                book.point >= props.pointFilter
                        }
                    ).map(
                        ( book ) => (
                            <div className="col-md-3 product-men">
                                <div className="product-chr-info chr">
                                    <div className="thumbnail">
                                        <a onClick={ () =>
                                        {
                                            window.location.href = `/book${ book.bookID }`
                                        } }>
                                            {
                                                book.bookImage ? (
                                                    <>
                                                        <img src={ book.bookImage } alt="" style={ { maxWidth: "164px" } } />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Loader />
                                                    </>
                                                )
                                            }
                                        </a>
                                    </div>
                                    <div className="caption">
                                        <h4>{ book.bookAuthor }</h4>
                                        <p>{ book.bookName }</p>
                                        <div className="matrlf-mid">
                                            <ul className="rating">
                                                {
                                                    points.map(
                                                        ( point ) => (
                                                            <>
                                                                <li>
                                                                    <a>
                                                                        <span className={ book.point >= point ? "fa fa-star yellow-star" : "fa fa-star gray-star" } aria-hidden="true"></span>
                                                                    </a>
                                                                </li>
                                                            </>
                                                        )
                                                    )
                                                }
                                            </ul>
                                            <ul className="price-list">
                                                {
                                                    props.customUser.roles === 'MEMBER' || props.customUser.roles === 'ADMIN' ? (
                                                        <>
                                                            <li>${ book.price - book.price * 0.3 }</li>
                                                            <li>
                                                                ${ book.price }
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li>
                                                                ${ book.price }
                                                            </li>
                                                            <li></li>
                                                        </>
                                                    )
                                                }
                                            </ul>

                                            <div className="clearfix"> </div>
                                        </div>
                                        {/* <form action="/" method="post">
                                                    <input type="hidden" name="cmd" value="_cart" />
                                                    <input type="hidden" name="add" value="1" />
                                                    <input type="hidden" name="chr_item" value="Book11" />
                                                    <input type="hidden" name="amount" value="280.00" />
                                                    <button type="submit" className="chr-cart pchr-cart">Add to cart
                                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                                    </button>
                                                    <a href="/" data-toggle="modal" data-target="/myModal1"></a>
                                                </form> */}
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        )
                    )
            }
            <div className="clearfix"></div>
        </>
    )
}
export default ListBook