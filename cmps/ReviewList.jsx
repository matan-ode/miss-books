const { useState, useEffect } = React

const { useParams } = ReactRouterDOM

import { bookService } from "../services/book.service.js"


export function ReviewList() {

    const { bookId } = useParams()

    const [reviews, setReviews] = useState(null)

    // console.log(bookService.getReviews(bookId))

    useEffect(() => {
        loadReviews()
    }, [])

    function loadReviews() {
        bookService.getReviews(bookId)
            .then(reviews => {
                setReviews(reviews)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    console.log(reviews);

    // bookService.getReviews(bookId)
    //     .then(reviews => {
    //         return reviews.map(review => review.bookId = bookId)
    //     })

    if (!reviews) return <div>Loading...</div>


    return (
        <section className="review-list">
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Rating</td>
                        <td>Reading Date</td>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review =>
                        <tr key={review.id}>
                            <td>{review.fullName}</td>
                            <td className="star-review">{'★'.repeat(+review.rating)}</td>
                            <td>{review.readAt}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* {books.map(book =>
                <li className="book-card" key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button ><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button ><Link to={`/book/edit/${book.id}`}>Edit</Link></button>

                    </section>
                </li>)
            } */}
        </section>
    )
}