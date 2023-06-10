import { useEffect, useState } from "react"

const CustomerReview = ( props ) =>
{
    return (
        <>
            <div className="customer-rev left-side">
                <h3 className="shopf-sear-headits-sear-head">{ props.words.rating }</h3>
                <ul>
                    <li>
                        <a onClick={ () => props.setPointFilter( 5 ) }>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <span>5</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={ () => props.setPointFilter( 4 ) }>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <span>4</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={ () => props.setPointFilter( 3 ) }>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <span>3</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={ () => props.setPointFilter( 2 ) }>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <span>2</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={ () => props.setPointFilter( 1 ) }>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <span>1</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default CustomerReview