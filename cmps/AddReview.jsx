const { Link, NavLink, useParams, useNavigate } = ReactRouterDOM

const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

export function AddReview() {

    const [review, setReview] = useState({ fullName: '', rating: '', readAt: '' })

    const navigate = useNavigate()
    const { bookId } = useParams()

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
                navigate(`/book`)
            })
    }



    const { fullName, rating, readAt } = review

    return (
        <div className="add-review">
            <h1>Add Review</h1>
            <form onSubmit={onAddReview}>
                <div className="form-review">
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input onChange={handleChange} value={fullName} type="text" name="fullName" id="fullName" />
                    </div>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        {/* <input onChange={handleChange} value={listPrice.amount} type="number" name="rating" id="rating" /> */}
                        <select value={rating} onChange={handleChange} name="rating" id="rating">
                            <option value="">Please choose rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="readAt">Reading Date</label>
                        <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" />
                    </div>
                </div>
                <button>Post</button>

            </form>
        </div>

    )
}