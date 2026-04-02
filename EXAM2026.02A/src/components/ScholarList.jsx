import ScholarItem from './ScholarItem'

function ScholarList({ items, onDelete }) {

  if (items.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        Không có dữ liệu nào.
      </div>
    )
  }

  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Scholarship name</th>
          <th>Sponsor</th>
          <th>Value (USD)</th>
          <th>Email</th>
          <th>Deadline</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <ScholarItem
            key={item.id}
            item={item}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ScholarList