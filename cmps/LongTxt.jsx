const { Link, NavLink, useParams, useNavigate } = ReactRouterDOM

const { useState, useEffect } = React


export function LongTxt({ txt, length = 100 }) {

    const [shortString, setShortString] = useState('')
    const [isLong, setIsLong] = useState(false)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        toChangeTxtLength(txt)
        navigate(`/book/${bookId}`)
    }, [isLong])

    // useEffect(() => {
    //     onReadMoreLess(txt)
    // }, [isLong])

    function toChangeTxtLength(txt) {
        const shorter = txt.substring(0, length)
        setShortString(isLong ? txt : shorter)
    }

    function onReadMoreLess() {
        setIsLong(isLong => !isLong)
    }

    const readBtn = isLong ? 'Less' : 'More'


    if (!shortString) return <div>Loading...</div>


    return (
        <article>
            <p>{shortString} <a className="more-less"  onClick={onReadMoreLess}>{readBtn}</a></p>
            {/* href={`#/book/${bookId}`} */}
        </article>
    )
}