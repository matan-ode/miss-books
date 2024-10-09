
export function BookFilter(){


    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form className="filter-inputs">
                <label htmlFor="txt">Title</label>
                <input type="text" name="txt" id="txt" />

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" />
            </form>
        </section>
    )
}