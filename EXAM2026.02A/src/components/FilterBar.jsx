// ============================================================
//  FilterBar.jsx  —  CHỈ LỌC THEO DROPDOWN
// ============================================================
// CÁCH DÙNG:
//   <FilterBar
//     filterValue={filterValue}
//     setFilterValue={setFilterValue}
//     options={['Tất cả', 'Phòng IT', 'Phòng KT']}
//     label="Phòng ban"
//   />
//
// THAY ĐỔI:
//   - Truyền options khác nhau tuỳ đề
//   - Muốn nhiều bộ lọc → dùng nhiều <FilterBar> song song
//   - label: tên hiển thị trên dropdown

function FilterBar({ filterValue, setFilterValue, options = [], label = 'Lọc theo' }) {
  return (
    <div className="mb-2">
      <select
        className="form-select"
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
      >
        {/* option đầu tiên luôn là "Tất cả" */}
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar
