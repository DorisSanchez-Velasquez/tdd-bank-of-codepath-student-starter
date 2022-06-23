import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  //FUNCTION HANDLERS
  function handleOnFormFieldChange(change)
  {
    props.setForm({...props.form, [change.target.name] : change.target.value})
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange}
                          handleOnSubmit={props.handleOnSubmit}
                          form={props.form}
                          isCreating={props.isCreating}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" placeholder="Enter a description..." value={props.form != null ? props.form.description : ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" placeholder="Enter a category..." value={props.form != null ? props.form.category : ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" type="number" placeholder="" value={props.form != null? props.form.amount : ""} onChange={props.handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
