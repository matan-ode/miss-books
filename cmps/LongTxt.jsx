
const { useState, useEffect } = React


export function LongTxt({ txt, length = 100 }) {

    const [shortString, setShortString] = useState('')
    const [isLong, setIsLong] = useState(false)

    useEffect(() => {
        toChangeTxtLength(txt)
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
            <p>{shortString} <a className="more-less" href="#" onClick={onReadMoreLess}>{readBtn}</a></p>
        </article>
    )
}