import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";

export function GetTotalExpenses () {
    const transactions = useStore(transactionsStore);

    return transactions.reduce((sum, transaction) => {
        if (transaction.type === 'Expense') {
            return sum + Number(transaction.amount);
        }
        return sum;
    }, 0)
}