import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {

  const { transactions } = useContext(TransactionsContext);

  //percorre o array e reduz a uma nova estrutura de dados, neste caso quero converter para um objeto:
  // { income: 0, outcome:0, total: income - outcome }
  const summary = transactions.reduce(
    //o acumulador eh o objeto abaixo
    (acumulador, transaction) => {
      if(transaction.type === "income") {
        acumulador.income += transaction.price;
        acumulador.total += transaction.price;
      } else {
        acumulador.outcome += transaction.price;
        acumulador.total -= transaction.price;
      }
      return acumulador;
    }, 
    { 
      income: 0, 
      outcome:0, 
      total: 0
    }
  )

  return summary;
}