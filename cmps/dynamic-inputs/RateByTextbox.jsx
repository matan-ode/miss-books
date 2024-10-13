export function RateByTextbox({ rating, handleChange }) {

    return (
        <section>
            <input type="number" value={rating} onChange={handleChange} name="rating" id="rating" max="5" min="1" />
        </section>
    )
}