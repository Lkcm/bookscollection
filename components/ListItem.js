export const ListItem = (item) => {

let img =item.item.img
let title = item.item.title
let text = item.item.text

  return (
    <>
    <ul className="
    p-10 
    bg-slate-500 
    my-5 rounded-3xl mx-10
    scale-90
    transition delay-75
    drop-shadow-lg
    hover:scale-95
    cursor-pointer
    ">
      <div className="flex">
    <li><img className="rounded-3xl drop-shadow-lg max-w-[400px] h-[500px]"src={img}></img></li>
    <div className="ml-10">
    <li className="text-3xl mb-4">{title}</li>
    <li className="text-[20px]">{text}</li>
    </div>
    </div>
    </ul>
    </>
  )
}