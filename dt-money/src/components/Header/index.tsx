import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logo from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

{/*
  * 1. O Modal precisa "envolver" o conteudo que irá disparar seu acionamento, ou seja, envolver o botão de disparo.
  * 2. Dialog.Root envolve todo o Modal
  * 3. DIalog.Trigger com a prop asChild é o acionador do Modal. É um elemento botão. 
  *    Outro botão já estilizado é passado como filho do Trigger
  * 4. Dialog.Portal renderiza um elemento filho dentro de um nó DOM fora do pai. 
  *    O conteído vai para outro lugar da aplicação. O conteudo não pertence mais ao pai.
  * 5. Dialog.Overlay é aquele background escuro.
  * 6. Dialog.Content é o conteudo do modal
  * 7. Dialog.Title anuncia para o leitor de tela qual eh o tipo de modal que esta sendo exibido.
  * 8. Dialog.Close é o botão de fechar o modal.
  * 
  * Na componentização, os elementos abaixo do trigger foram para o NewTransactionModal
 */}

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="" />
        <Dialog.Root>
         <Dialog.Trigger asChild>
          <NewTransactionButton>
            Nova Transação
          </NewTransactionButton>
         </Dialog.Trigger>

         <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}