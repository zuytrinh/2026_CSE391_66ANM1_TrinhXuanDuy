function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-2">
      <input
        className="form-control"
        placeholder="Type a keyword"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* THAY placeholder theo field tìm kiếm của đề */}
    </div>
  )
}

export default SearchBar
