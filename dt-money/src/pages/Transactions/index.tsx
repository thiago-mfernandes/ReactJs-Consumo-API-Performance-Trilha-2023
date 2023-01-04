import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { priceFormatter } from "../../utils/fomatter";



export function Transactions() {

  const { transactions } = useContext(TransactionsContext)

  return (
    <div>
      <Header />
      <Summary />


      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  {/** esse width eh pra essa linha ocupar metade do espaco na tabela */}
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === "outcome" && `- `}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              ))
            }
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}