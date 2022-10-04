

export const ListItem = (item) => {

  




  return (
    <>
    <ul className="
    p-10 
    bg-slate-500 
    my-5 rounded-3xl mx-10
    scale-90
    transition delay-75
    drop-shadow-lg
    hover:scale-100
    ">
      <div className="flex">
    <li><img className="rounded-3xl drop-shadow-lg "src="http://localhost:3000/silma.jpg"></img></li>
    <div className="ml-10">
    <li className="text-3xl mb-4">{item.item.title}</li>
    <li>{item.item.text}</li>
    </div>
    </div>
    </ul>
    </>
  )
}