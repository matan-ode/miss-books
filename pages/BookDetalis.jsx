import { bookService } from '../services/book.service.js';

const { useState, useEffect } = React


export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem get book from service:', err);

            })
    }, [])

    if (!book) return <div>Loading...</div>
    console.log(book);

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

    const onSale = listPrice.isOnSale? '' : 'hide'

    return (
        <section className="book-details">
            <h1>Book Title: {title}</h1>
            <img src={thumbnail} alt="Book Cover" />
            <div className={`${onSale} sale-tag`}>For SALE!</div>
            <h1>Book Description:</h1>
            <p>{description}</p>
            <p>{pageCountStr()}</p>
            <p>{publishedDateStr()}</p>
            <p className={checkAmount()}>{listPrice.amount} {listPrice.currencyCode}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}