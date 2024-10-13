

export function RateBySelect({ rating, handleChange }) {
    console.log('HIII');

    return (
        <section>
            <select value={rating} onChange={handleChange} name="rating" id="rating">
                <option value="">Please choose rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </section>
    )
}