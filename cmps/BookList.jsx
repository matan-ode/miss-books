const { Link } = ReactRouterDOM


import { BookPreview } from "./BookPreview.jsx";


export function BookList({ books, onRemoveBook }) {


    return (
        <ul className="book-list">
            {books.map(book =>
                <li className="book-card" key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button ><Link to={`/book/${book.id}`}>Details</Link></button>
                    </section>
                </li>)
            }
        </ul>
    )
}