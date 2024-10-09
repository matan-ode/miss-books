
export function BookPreview({ book }) {

const {title, subtitle, thumbnail, listPrice} = book
    return (
        <article className="book-preview">
            <h1>{title}</h1>
            <h4>Summary: {subtitle}</h4>
            <img src={thumbnail} alt="Book Cover" />
            <p>Price: {listPrice.amount} {listPrice.currencyCode}</p>
        </article>
    )

}