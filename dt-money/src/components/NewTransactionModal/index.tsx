import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {

  const { createTransactions } = useContext(TransactionsContext);

  const { control, register, handleSubmit, formState:{ isSubmitting}, reset } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    const { description, price, category, type } = data;

    await createTransactions({ description, price, category, type });
    //funcao do react-hook-form para resetar os campos do form
    reset();

  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

          <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input 
              type="text" 
              placeholder="Descrição" 
              required 
              {...register("description")}
            />
            <input 
              type="number" 
              placeholder="Preço" 
              required 
              // valueasnumber converte o valor do campo para numero
              {...register("price", { valueAsNumber : true })}
            />
            <input 
              type="text" 
              placeholder="Categoria" 
              required 
              {...register("category")}
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
            >
              Cadastrar
            </button>
          </form>
          {/**
           * Os elementos abaixo nao sao nativos do HTML, e preciso capturar os valores
           * neste caso, vou usar o 'control' do react-hook-form
           */}

        <Controller 
          // control armazena o estado
          control={control} 
          // name é qual informacao vai ser controlada, no caso o type do meu objeto
          name="type" 
          // o que será renderizado nesse controlador: consigo pegar algumas informacoes no props
          // dentre as 3 opcoes, a opcao field tem o metodo onChange que grava o value
          render={({ field }) =>{
            return (
              <TransactionType onValueChange={field.onChange} value={field.value}>
                {/**esse typebutton é um radiobutton. Olhar no styles */}
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )
          }}/>
      </Content>

    </Dialog.Portal>
  )
}