import {bookService} from "../services/book.service.js"

export function BookIndex() {

    bookService.query()

    return (
        <section className="book-index">
            <h1>About books and us!</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores rerum similique vel quasi consequatur incidunt quidem aspernatur ducimus qui. Autem est fugiat repellat perferendis. Id debitis consectetur accusantium molestias ab.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores rerum similique vel quasi consequatur incidunt quidem aspernatur ducimus qui. Autem est fugiat repellat perferendis. Id debitis consectetur accusantium molestias ab.</p>
        </section>
    )
}