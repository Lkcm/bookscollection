import { useState, useEffect } from 'react';
import { collection, doc, setDoc, addDoc, serverTimestamp} from "firebase/firestore"
import * as Dialog from '@radix-ui/react-dialog'
import { AddBook } from '../components/AddBook'
import { ListItem } from '../components/ListItem';
import * as Photos from '../services/books'
import { db } from '../libs/firebase'



export default function Home() {
  const [ loading, setLoading] = useState(false)
  const [ photos, setPhotos] = useState([])
  const [ apaga, setApaga] = useState(true)
  const [ mostra, setMostra] = useState(false)
  const [inputTitle, setInputTitle] = useState('')
  const [inputText, setInputText] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, [])


  const handleAddTask = async() => {
    let newList = [...list];
    newList.push({
      id: list.lenght + 1,
      title: inputTitle,
      text: inputText,

    });
    setList(newList);

    try{
    const res = await addDoc(collection(db, "books"), {
        title: inputTitle,
        text: inputText,
        img: "USA",
        Timestamp: serverTimestamp()
    })
    }catch(err){
    console.log(err)
}

    
  }



  
  const Livro = () => {  

    // const imagesFolder = ref(storage, "books");
    // const booksList = await listAll(imagesFolder);


    return (
      list.map((item, index)=>(
        <ListItem key={index} item={item}/>
      ))
    )
    }



  function Mostra () {
    setMostra(true)



    console.log(inputText)
    console.log(inputTitle)



  }  
   


  // function Apagando(props){
  //    console.log(props.texto)
  //  }

  return (
    <>

    <title>NextJS + TailWindCSS</title>
    <div>
      <div className="bg-[#313131] flex justify-around">
      <h1 className='p-5 text-purple-500 text-4xl'>Book's Collection</h1>
      <div className="">
      <input placeholder="Search..." className="rounded p-2"></input>
      </div>
      </div>

      {!loading &&
      <Dialog.Root>
        {apaga &&
        <AddBook onEnter={Mostra}/>
        }
        {!loading && photos.length > 0 &&
        <div>
          {photos.map((item, index)=> (
            <div>{item.name}</div>
          ))}
        </div>
          }
        <Livro/>

        <Dialog.Portal>
           <Dialog.Overlay className="bg-black/60 inset-0 fixed">
             <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded">
               <Dialog.Title className="text-purple-500 text-2xl mb-10">
                 Adicionar Livro :
               </Dialog.Title>
               <div className="flex flex-col">
                 <input placeholder="Titulo" onChange={e=>setInputTitle(e.target.value)} className="text-black mb-2"></input>
                 <form>
                    <textarea onChange={e=>setInputText(e.target.value)} className="text-black"placeholder="Adicionar texto..."></textarea>
                 </form>
                 <button 
                 onClick={handleAddTask} 
                 className="bg-purple-500 p-4 rounded hover:bg-purple-600"
                 >
                   Send
                 </button>
                 </div>
             </Dialog.Content>

           </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    }
    {loading &&
    <h1 className="text-white bg-red-800 px-20 py-8 text-4xl rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all delay-100 duration-300 ease-in-out  hover:scale-125 hover:bg-purple-900">Loading...</h1>
    }

    </div>
    </>
  )
}
