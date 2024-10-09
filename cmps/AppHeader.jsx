
export function AppHeader({onSetPage}) {
    return (
        <header className="app-header main-layout">
            <h1>Miss Books</h1>
            <nav className="app-nav">
                <a onClick={()=> onSetPage('home')}href="#">Home</a>
                <a onClick={()=> onSetPage('books')}href="#">Books</a>
                <a onClick={()=> onSetPage('about')}href="#">About</a>
            </nav>
        </header>
    )
}