const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {

    return (
        <section className="about-us">
            <h1>About books and us!</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores rerum similique vel quasi consequatur incidunt quidem aspernatur ducimus qui. Autem est fugiat repellat perferendis. Id debitis consectetur accusantium molestias ab.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores rerum similique vel quasi consequatur incidunt quidem aspernatur ducimus qui. Autem est fugiat repellat perferendis. Id debitis consectetur accusantium molestias ab.</p>
            <nav>
                <Link to="/about/team">Team</Link>
                <Link to="/about/goal">Goal</Link>
            </nav>
            <Outlet />
        </section>
    )
}