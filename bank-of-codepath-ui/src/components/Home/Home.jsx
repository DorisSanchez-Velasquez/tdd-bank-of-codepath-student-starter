import * as React from "react"
import { useEffect } from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"

export default function Home(props) {

  //AXIOS FUNCTIONS AND COMMANDS USING USE-EFFECT
   async function getTransactions()
   {
     axios.get(`http://localhost:3001/bank/transactions`)
     .then(res => {
       props.setTransactions(res.data.transactions)
      props.setIsLoading(false)
     })
     .catch((err) => {
       props.setError(err)
     })
   }

   async function getTransfers()
   {
     axios.get(`http://localhost:3001/bank/transfers`)
     .then(res => {
       props.setTransfers(res.data.transfers)
        props.setIsLoading(false)
     })
     .catch((err) => {
       props.setError(err)
     })
   }

   //USE EFFECT
   useEffect(() => {
      props.setIsLoading(true)
      getTransfers()
      props.setIsLoading(true)
      getTransactions()
   }, []);

   //OTHER FUNCTIONS INCLUDING FILTER AND HANLDEONSUBMIT
   let filteredTransactions = props.transactions;
       if(props.filterInputValue !== "" && props.transactions != null)
       {
            filteredTransactions = props.transactions.filter((transaction) => {
             return transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase())
           })
       }

    async function handleOnSubmitNewTransaction()
    {
      props.setIsCreating(true);
       axios.post(`http://localhost:3001/bank/transactions`, {transaction: props.newTransactionForm})
      .then((res) => {
          props.setTransactions((pastTransactions) => [...pastTransactions, res.data.transaction])
          props.setNewTransactionForm({
            category: "",
            description: "",
            amount: 0
          })
          props.setIsCreating(false)
      })
      .catch((error) => {
        props.setError(error)
        props.setIsCreating(false)
      })
    }


   //ACTUAL PROGRAM DISPLAY
      return (
        <div className="home">
          <AddTransaction isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
          {props.isLoading ? (<h1>Loading...</h1>) : (<BankActivity transactions={filteredTransactions} transfers={props.transfers}/>)}
          {props.error !== "" ? (<h2 className="error">{props.error}</h2>) : (null)}
        </div>
    )
}
