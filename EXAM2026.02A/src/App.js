import { useState } from 'react'
import initialData from './data'
import ScholarList  from './components/ScholarList'
import ScholarForm  from './components/ScholarForm'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'

function App() {

  // ── STATE CHÍNH ──────────────────────────────────────────
  const [items, setItems]       = useState(initialData)

  // ── STATE TÌM KIẾM ───────────────────────────────────────
  const [search, setSearch] = useState('')

  // ── STATE LỌC ────────────────────────────────────────────
  // Mỗi bộ lọc là 1 state riêng
  const [filterDept, setFilterDept] = useState('Tất cả')
  // Thêm bộ lọc khác nếu đề yêu cầu:
  // const [filterType, setFilterType] = useState('Tất cả')

  // ── LỌC + TÌM KIẾM ──────────────────────────────────────
  const filtered = items.filter(item => {

    // 1. Tìm kiếm text — THAY field tìm kiếm theo đề
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    // thêm field: || item.phone.includes(search)

    // 2. Lọc phòng ban — THAY field lọc theo đề
    const matchDept =
      filterDept === 'Tất cả' || item.department === filterDept
    return matchSearch && matchDept
    // thêm: && matchType
  })

  // ── THÊM ─────────────────────────────────────────────────
  const handleAdd = (newItem) => {
    setItems([...items, newItem])
  }

  // ── XOÁ ──────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xoá?'))
      setItems(items.filter(i => i.id !== id))
  }

  // ── RENDER ───────────────────────────────────────────────
  return (
    <div className="container my-4">

      {/* Tiêu đề + nút thêm */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Scholarpro</h3>  {/* THAY TIÊU ĐỀ */}
      </div>


      {/* SearchBar và FilterBar tách riêng, đặt cạnh nhau */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="col-md-3">
          <FilterBar
            filterValue={filterDept}
            setFilterValue={setFilterDept}
            options={['All']}
          />
        </div>
      </div>
        <ScholarForm
          onAdd={handleAdd}
        />
      {/* Bảng danh sách */}
      <ScholarList
        items={filtered}
        onDelete={handleDelete}
      />


    </div>
  )
}

export default App
