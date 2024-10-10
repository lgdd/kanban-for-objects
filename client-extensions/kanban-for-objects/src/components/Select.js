const Select = ({ items, selectedItemId, onChangeHandler }) => {

  return (
    <div className="form-group">
      <select onChange={onChangeHandler} className="form-control">
        <option value="0">-- Select an object --</option>
        {items.map((item) => {
          return <option key={item.id} value={item.id}>{item.name}</option>
        })}
      </select>
    </div>
  )
}

export default Select;