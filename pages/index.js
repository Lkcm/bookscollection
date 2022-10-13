import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { collection, addDoc, serverTimestamp, getDocs} from "firebase/firestore"
import { db, storage } from '../libs/firebase'
import { AddBook } from '../components/AddBook'
import { ListItem } from '../components/ListItem';

export default function Home() {
  const [ img, setImg                  ] = useState("");
  const [ file, setFile                ] = useState("");
  const [ loading, setLoading          ] = useState(false);
  const [ inputTitle, setInputTitle    ] = useState('');
  const [ inputText, setInputText      ] = useState('');
  const [ data, setData                ] = useState([]);
  
  useEffect(() => {
    const fetchData = async () =>{
      let list = []
      try{
        
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data()})
        })
        setData(list);
    }catch(err){
      console.log(err)
    }
  }
  fetchData()
  },[])
  
  useEffect(() => {
    const uploadFile = () => {
  
      new Date().getTime() + file.name
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on('state_changed',
  (snapshot) => {
  
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
      default:
      break;
  }
  },
  (error) => {
  console.log(error)
  },
  () => {
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    setImg(downloadURL)
  });
  }
  );
  };
    file && uploadFile();
  },[file])

  const Livro = () => {  
    
    return (
      data.map((item, index)=>(
        <ListItem key={index} item={item}/>
      ))
    )
    }

    
  const handleAddTask = async() => {

    try{
    const res = await addDoc(collection(db, "books"), {
        title: inputTitle,
        text: inputText,
        img: img,
        Timestamp: serverTimestamp()
    })
    window.location.reload(false)
    }catch(err){
    console.log(err)
}

    
  }


  return (
    <>


    <title>Book's Collection</title>

      <div className="bg-[#313131] flex justify-around">
      <h1 className='p-5 text-purple-500 text-4xl'>Book's Collection</h1>
      <div className="">
      <input placeholder="Search..." className="rounded p-2 mt-5"></input>
      </div>
      </div>

      {!loading &&
      <Dialog.Root>
        {!data.length > 0 &&
        <AddBook className="text-white bg-purple-800 px-20 py-8 text-4xl rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all delay-100 duration-300 ease-in-out  hover:scale-125 hover:bg-purple-900"/>
        }

        <div className="flex flex-col justify-center align-middle">
        <Livro/>
        {data.length > 0 &&
        <AddBook className="text-white bg-purple-800 px-20 py-8 text-4xl rounded hover:scale-125 transition-all delay-100 duration-300 ease-in-out relative left-1/2 -translate-x-1/2  mb-10 hover:bg-purple-900"/>
        }
        </div>
        <Dialog.Portal>
           <Dialog.Overlay className="bg-black/60 inset-0 fixed">
             <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded">
               <Dialog.Title className="text-purple-500 text-3xl mb-7 text-center">Add Book :</Dialog.Title>
               <p className="mb-2">Choose book image:</p>
               <div className="flex flex-col">
                 <input className="mb-2 rounded p-2 bg-purple-500" type="file" id="file" onChange={(e) => setFile(e.target.files[0])}></input>
                 <p className="mb-2">Title:</p>
                 <input className="mb-2 p-2 rounded bg-slate-700" placeholder="Title" onChange={e=>setInputTitle(e.target.value)}></input>
                 <p className="mb-2">Content:</p>
                 <form>
                    <textarea onChange={e=>setInputText(e.target.value)} className=" w-[100%] h-40 rounded mb-2 bg-slate-700 p-2"placeholder="Add text..."></textarea>
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
    <h1 className="text-white bg-red-800 px-20 py-8 text-4xl rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 delay-100 duration-300 ease-in-out hover:bg-red-900 cursor-pointer">Loading...</h1>
    }
    


    </>
  )
}
