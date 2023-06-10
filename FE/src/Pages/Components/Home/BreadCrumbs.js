

const BreadCrumbs = ( props ) =>
{
    return (
        <>
            <div className="crumbs text-center">
                <div className="container">
                    <div className="row">
                        <ul className="btn-group btn-breadcrumb bc-list">
                            <li className="btn btn1">
                                {/* <a href="index.html"> */ }
                                <i className="glyphicon glyphicon-home"></i>
                                {/* </a> */ }
                            </li>
                            <li className="btn btn2">
                                <a href="shop.html">{ props.title }</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BreadCrumbs