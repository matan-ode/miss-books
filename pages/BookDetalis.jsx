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

    const { title, description, thumbnail, pageCount } = book

    function pageCountStr() {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Decent Reading'
        else return 'Light Reading'
    }

    return (
        <section className="book-details">
            <h1>Book Title:{title}</h1>
            <img src={thumbnail} alt="Book Cover" />
            <h1>Book Description:</h1>
            <p>{description}</p>
            <p>{pageCountStr()}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}