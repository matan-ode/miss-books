import { BookPreview } from "./BookPreview.jsx";
import { CardPreview } from "./BookPreview.jsx"

export function BookList({ books }) {
    return (
        <section className="book-list">
            {books.map(book => {
                <div key={book.id} className="book-card">
                    <CardPreview />
                </div>
            })}
        </section>
    )
}