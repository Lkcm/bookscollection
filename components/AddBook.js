import * as Dialog from '@radix-ui/react-dialog'


export function AddBook() {

  return (
<div>
    <Dialog.Trigger className='text-white bg-purple-800 px-20 py-8 text-4xl rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all delay-100 duration-300 ease-in-out  hover:scale-125 hover:bg-purple-900 '>
      +Add Book
    </Dialog.Trigger>
</div>

  )
}