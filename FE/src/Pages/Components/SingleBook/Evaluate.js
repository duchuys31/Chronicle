import { useEffect, useState } from "react";

const token = localStorage.getItem( "token" )
export const formatDate = ( dateString ) =>
{
    const date = new Date( dateString );
    return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`;
}
const Evaluate = ( props ) =>
{
    const [ comment, setComment ] = useState( [] )
    const [ commentList, setCommentList ] = useState( [] )
    const [ rate, setRate ] = useState( [] )

    var points = [ 1, 2, 3, 4, 5 ]
    useEffect(
        () =>
        {
            if ( props.user.length !== 0 && props.book.length !== 0 )
            {
                fetch( "http://localhost:8080/api/comment/-1", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                }
                )
                    .then( ( response ) => response.json() )
                    .then( ( data ) => setComment(
                        {
                            ...data,
                            [ 'user' ]: props.user,
                            [ 'book' ]: props.book
                        }
                    ) )
                    .catch( ( err ) => console.log( err ) );
            }
            // console.log( props.book )

            if ( props.book.length !== 0 && token )
            {
                fetch( "http://localhost:8080/api/rating/rate", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { "book": props.book } )
                }
                )
                    .then( ( response ) => response.json() )
                    .then( ( data ) => setRate( data ) )
                    .catch( ( err ) => console.log( err ) );
            }


        }, [ props.book, props.user ]
    )

    useEffect(
        () =>
        {
            if ( props.book.length !== 0 )
            {
                fetch( "http://localhost:8080/api/comment/listCommentOfBook", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( { "book": props.book } )
                }
                )
                    .then( ( response ) => response.json() )
                    .then( ( data ) => setCommentList( data ) )
                    .catch( ( err ) => console.log( err ) );
            }

        }, [ props.book ]
    )




    // useEffect(
    //     () =>
    //     {
    //         console.log( props.book )
    //         console.log( props.user )
    //         console.log( comment )
    //         console.log( commentList )
    //         console.log( rate )
    //     }, [ comment, rate ]
    // )

    const handleSubmit = async () =>
    {
        if ( comment.body.length > 0 )
        {
            var resp = await fetch(
                "http://localhost:8080/api/comment/send", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { "comment": comment } )
            }
            )
            var data = await resp.json()
            console.log( data )
            setCommentList( data )
            setComment( prevData => (
                {
                    ...prevData,
                    [ 'body' ]: ''
                }
            ) )
        }
    }
    const deleteComment = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( "Bạn chắc chắn muốn xoá bình luận này?" ) )
        {
            fetch( "http://localhost:8080/api/comment/" + `${ id }`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { "book": props.book } )
            }
            )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCommentList( data ) )
                .catch( ( err ) => console.log( err ) );
        }

    }
    useEffect(
        () =>
        {
            if ( rate.length !== 0 )
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
                    .then( ( data ) => setRate( data ) )
                    .then(
                        fetch( "http://localhost:8080/api/book/" + `${ props.book.bookID }`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                        )
                            .then( ( response ) => response.json() )
                            .then( ( data ) =>
                            {
                                props.setBook( data )
                                console.log( data )
                            } )
                            .catch( ( err ) => console.log( err ) )
                    )
                    .catch( ( err ) => console.log( err ) );
            }


        }, [ rate.point ]
    )

    return (
        <>

            <div class="section singlep_btm">
                <div class="container">
                    <div class="new_arrivals">
                        {
                            token && (
                                <>
                                    {/* <h4 class="rad-txt">
                                        <span class="abtxt1"> Đánh giá </span>
                                        <span class="abtext"> Sản phẩm </span>

                                    </h4> */}
                                    {/* <div className="matrlf-mid">
                                        <div className="row">
                                            <div className="col-md-5">
                                            </div>
                                            <div className="col-md-3">
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

                                        </div>

                                    </div> */}
                                </>
                            )
                        }

                        <h4 class="rad-txt">
                            <span class="abtxt1"> { props.words.Comment } </span>
                            <span class="abtext"> { props.words.User } </span>
                        </h4>

                        <div class="col-md-12 product-men">
                            <div class="product-chr-info chr">

                                <div class="thumbnail">
                                    <section >
                                        <div class="container">
                                            <br />
                                            <div class="row d-flex justify-content-center">


                                                {
                                                    commentList.map(
                                                        ( singleComment ) => (
                                                            <>
                                                                <div class="col-md-12 col-lg-11">
                                                                    <div class="card text-dark">


                                                                        <div class="card-body p-4">
                                                                            <div class="d-flex flex-start">

                                                                                <div>

                                                                                    <h6 class="fw-bold mb-1">{ singleComment.user.username }
                                                                                        <div className="fpassword">
                                                                                            {
                                                                                                ( props.user.username === singleComment.user.username ) &&
                                                                                                (
                                                                                                    <>
                                                                                                        <span class="badge bg-primary"
                                                                                                            onClick={ () => setComment( singleComment ) }
                                                                                                        >{ props.words.Edit }</span>
                                                                                                    </>
                                                                                                )
                                                                                            }
                                                                                            {
                                                                                                ( props.user.username === singleComment.user.username || props.user.roles === 'ADMIN' ) && (
                                                                                                    <span class="badge bg-primary"
                                                                                                        onClick={ () => deleteComment( singleComment.id ) }
                                                                                                    >{ props.words.Delete }</span>
                                                                                                )
                                                                                            }


                                                                                        </div>
                                                                                    </h6>
                                                                                    <br />
                                                                                    <p class="mb-0">
                                                                                        {
                                                                                            singleComment.body
                                                                                        }
                                                                                    </p>
                                                                                    <br />
                                                                                    <div className="fpassword">
                                                                                        <div class="d-flex align-items-center mb-3">
                                                                                            <p class="mb-0">
                                                                                                { formatDate( singleComment.date ) }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr class="my-0" style={ { height: "1px" } } />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    )
                                                }
                                                {
                                                    token && (
                                                        <>
                                                            <div class="container my-5 py-5 text-dark">
                                                                <div class="row d-flex justify-content-center">
                                                                    <div class="col-md-10 col-lg-11 col-xl-6">

                                                                        <div class="card">
                                                                            <div class="card-body p-4">
                                                                                <div class="d-flex flex-start w-100">
                                                                                    <div class="w-100">
                                                                                        <h5>{ props.words.Comment }</h5>
                                                                                        <br />
                                                                                        <div class="form-outline">
                                                                                            <textarea class="form-control" rows="4"
                                                                                                value={ comment.body }
                                                                                                onChange={ ( e ) => setComment( prevData => (
                                                                                                    {
                                                                                                        ...prevData,
                                                                                                        [ 'body' ]: e.target.value
                                                                                                    }
                                                                                                ) ) }
                                                                                            ></textarea>
                                                                                        </div>
                                                                                        <div className="fpassword">
                                                                                            <button type="" className="btn btn-success"
                                                                                                onClick={ () => handleSubmit() }
                                                                                            >{ props.words.Comment }</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }

                                                <br />
                                            </div>
                                        </div>
                                    </section>
                                </div>

                            </div>
                        </div>
                        <div class="clearfix"></div>

                    </div>
                </div>

            </div>
        </>
    )
}
export default Evaluate;