function ScholarItem({ item, onDelete }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.sponsor}</td>
      <td>{item.value ? `$${Number(item.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}</td>
      <td>{item.email}</td>
      <td>{item.deadline}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ScholarItem