const { useState, useRef, useEffect } = React


export function RateByStars({chosenNum, setChosenNum, setReview, rating, handleChange }) {

    const inputRef = useRef(null)
    const [isChosen, setIsChosen] = useState(false)
    
    useEffect(() => {
        renderStars() 
    }, [chosenNum])

    function renderStars() {
        let stars = []
        for (let i = 1; i <= 5; i++) {
            let star = <span key={i} className={`star-review star-input ${i}`} onClick={() => onAddRating(i)}>★</span>
            if (i <= chosenNum) star = <span key={i} className={`star-review star-input ${i} chosen-star`} onClick={() => onAddRating(i)}>★</span>
            stars.push(star)
        }
        console.log(stars);
        return stars
    }

    function onAddRating(num) {
        setIsChosen(true)       
        setChosenNum(num)
        setReview(prevReview => ({ ...prevReview, rating: num }))
        inputRef.current.value = num
        renderStars()
    }

    return (
        <div>
            <input className="rating-input-stars hide" ref={inputRef} type="number" value={rating} onChange={handleChange} name="rating" id="rating" />
            {/* <input type="number" value={rating} onChange={handleChange} name="rating" id="rating" max="5" min="1" /> */}
            {/* <span className="star-review star-input 1" onClick={() => onAddRating(1)}>★</span>
            <span className="star-review star-input 2" onClick={() => onAddRating(2)}>★</span>
            <span className="star-review star-input 3" onClick={() => onAddRating(3)}>★</span>
            <span className="star-review star-input 4" onClick={() => onAddRating(4)}>★</span>
            <span className="star-review star-input 5" onClick={() => onAddRating(5)}>★</span> */}
            {renderStars()}
        </div>
    )
}