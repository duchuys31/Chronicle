

const Latest = () =>
{
    return (
        <>
            <div className="left-side">
                <h3 className="shopf-sear-headits-sear-head">
                    <span>latest</span> arrivals
                </h3>
                <ul>
                    <li>
                        <input type="checkbox" className="checked" />
                        <span className="span">last 30 days</span>
                    </li>
                    <li>
                        <input type="checkbox" className="checked" />
                        <span className="span">last 90 days</span>
                    </li>
                    <li>
                        <input type="checkbox" className="checked" />
                        <span className="span">last 150 days</span>
                    </li>

                </ul>
            </div>
        </>
    )
}
export default Latest