import * as Dialog from '@radix-ui/react-dialog'


export function AddBook(props) {
  return (
<div>
    <Dialog.Trigger className={props.className}>
      +Add Book
    </Dialog.Trigger>
</div>

  )
}