const { Link, useNavigate, useParams } = ReactRouterDOM


import { AddReview } from '../cmps/AddReview.jsx';
import { LongTxt } from '../cmps/LongTxt.jsx';
import { ReviewList } from '../cmps/ReviewList.jsx';
import { bookService } from '../services/book.service.js';

const { useState, useEffect } = React


export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem get book from service:', err);

            })
    }


    if (!book) return <div>Loading...</div>

    const { title, description, thumbnail, pageCount, publishedDate, listPrice } = book

    function pageCountStr() {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Decent Reading'
        else return 'Light Reading'
    }

    function publishedDateStr() {
        const year = new Date().getFullYear()
        if (year - publishedDate > 10) return 'Vintage'
        else if (year - publishedDate <= 1) return 'New'
        else return ''
    }

    function checkAmount() {
        if (listPrice.amount > 150) return 'red'
        if (listPrice.amount < 20) return 'green'
    }


    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>

    const onSale = listPrice.isOnSale ? '' : 'hide'

    return (
        <React.Fragment>
            <section className="book-details">
                <div className="details-first">
                    <h1>Book Title: {title}</h1>
                    <img src={thumbnail} alt="Book Cover" />
                </div>
                <br />
                <div className="details-second">
                    <div className={`${onSale} sale-tag`}>For SALE!</div>
                    <h1>Book Description:</h1>
                    <LongTxt txt={description} />
                    {/* <p>{description}</p> */}
                    <h4>{pageCountStr()}</h4>
                    <h4>{publishedDateStr()}</h4>
                    <h4 className={checkAmount()}>{listPrice.amount} {listPrice.currencyCode}</h4>
                    <button onClick={onBack}>Back</button>
                    {/* <button ><Link to="/book">Back</Link></button> */}
                    <section>
                        <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                        <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
                    </section>
                </div>
                <div className="review-add-container">
                    <AddReview setBook={setBook} book={book} />
                </div>
                <br />
                <ReviewList book={book}/>
            </section>
        </React.Fragment>
    )
}