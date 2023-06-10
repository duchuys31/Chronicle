const PriceRange = () =>
{
    return (
        <>
            <div className="range">
                <h3 className="shopf-sear-headits-sear-head">
                    <span>Price</span> range
                </h3>
                <ul className="dropdown-menu6">
                    <li>
                        <div id="slider-range"></div>
                        <input type="text" id="amount" style={ { border: 0, color: "#ffffff", fontWeight: "normal" } } />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PriceRange