import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ExpenseContext = React.createContext([]);
export function useExpenseContent() {
    return useContext(ExpenseContext);
}

export function ExpenseProvider({ children })
{
    // expense methods
    const [expenseRecords, setExpenseRecords] = useState([]);


    useEffect(() => {
        getallexpense();
        return () => {
            
        }
    }, [])

    // fetching all database expenses
    const getallexpense = () =>
    {
        try {
            axios.get('api/Expense/ExpenseAll').then((res) =>
            {
                setExpenseRecords(res.data);
            })

            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ExpenseContext.Provider value={{ expenseRecords, }}>
            {children}
        </ExpenseContext.Provider>
    );
}
