import '../css/search.css'
const Searchcomponent = () => {
  return (
    <>
    <div className="search">
        <div className="search-container">
            <h1 className="search-title">Search for Skills</h1>
            <div className="search-bar">
                <input type="text" placeholder="Search for skills you want to learn..." />
                <button>Search</button>
            </div>
        </div>
        <div className="search-results">
        </div></div>
    </>
    )
}

export default Searchcomponent