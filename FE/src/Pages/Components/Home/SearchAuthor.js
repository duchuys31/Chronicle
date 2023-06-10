import { useEffect, useState } from "react"

const SearchAuthor = ( props ) =>
{
    const [ keyword, setKeyword ] = useState( '' )
    const handleSearch = ( e ) =>
    {
        e.preventDefault()
        props.setAuthor( keyword )

    }
    return (
        <div className="search-hotel">
            <h3 className="shopf-sear-headits-sear-head">
                <span>{ props.words.Author }</span>
            </h3>
            <form onSubmit={ handleSearch }>
                <input type="search" placeholder={ props.words.AuthorName } name="search" required="" onChange={ ( e ) => setKeyword( e.target.value ) } />
                <input type="submit" value={ props.words.Search } />
            </form>

        </div>
    )

}

export default SearchAuthor