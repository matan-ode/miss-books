const { Link, NavLink, useParams, useNavigate } = ReactRouterDOM

const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { RateBySelect } from "./dynamic-inputs/RateBySelect.jsx"
import { RateByStars } from "./dynamic-inputs/RateByStars.jsx"
import { RateByTextbox } from "./dynamic-inputs/RateByTextbox.jsx"

export function AddReview() {

    const [review, setReview] = useState({ fullName: '', rating: '', readAt: '' })

    const navigate = useNavigate()
    const { bookId } = useParams()
    const [cmpType, setCmpType] = useState('')
    const [chosenNum, setChosenNum] = useState()


    // useEffect(() => {
    //     if(bookId) loadBook()
    // }, [])

    // function loadBook(){
    //     bookService.get(bookId).then(setBookToEdit)
    // }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.value) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }


    function onAddReview(ev) {
        ev.preventDefault()

        bookService.addReview(bookId, review)
            .then(() => {
                showSuccessMsg('Review added successfully')
            })
            .catch(() => {
                showErrorMsg('Problems adding review')
            })
            .finally(() => {
                // navigate(`/book`)
            })
    }



    const { fullName, rating, readAt } = review

    return (
        <div className="add-review">
            <h1>Add Review</h1>
            <form onSubmit={onAddReview}>
                <div className="form-review">
                    <div>
                        <label htmlFor="fullName">Full Name </label>
                        <input onChange={handleChange} value={fullName} type="text" name="fullName" id="fullName" />
                    </div>
                    <div>
                        <section>
                            <label htmlFor="rating">Rating </label>
                            <DynamicCmp setReview={setReview} rating={rating} handleChange={handleChange} cmpType={cmpType} />
                            <section value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
                                <input id="stars" type="radio" value="stars" name="dynamicCmp" />
                                <label htmlFor="stars">Stars</label>
                                <input id="select" type="radio" value="select" name="dynamicCmp" />
                                <label htmlFor="select">Select</label>
                                <input id="text" type="radio" value="text" name="dynamicCmp" />
                                <label htmlFor="text">Text</label>

                            </section>
                            {/* <RateByStars setReview={setReview} rating={rating} handleChange={handleChange} chosenNum={chosenNum} setChosenNum={setChosenNum} /> */}
                        </section>

                        {/* <input onChange={handleChange} value={listPrice.amount} type="number" name="rating" id="rating" /> */}
                    </div>


                    <div>
                        <label htmlFor="readAt">Reading Date </label>
                        <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" />
                    </div>
                </div>
                <button>Post</button>

            </form>
        </div>

    )


    function DynamicCmp(props) {
        console.log(props.cmpType)
        switch (props.cmpType) {
            case 'stars':
                // return <RateByStars {...props} />
                return <RateByStars setReview={setReview} rating={rating} handleChange={handleChange} chosenNum={chosenNum} setChosenNum={setChosenNum} />
            case 'select':
                return <RateBySelect {...props} />
            case 'text':
                return <RateByTextbox {...props} />

        }
    }

}