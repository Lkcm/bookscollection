import {storage } from '../libs/firebase'
import { ref, listAll, getDownloadURL } from '@firebase/storage'


  export const getAll = async () => {
    let list = [];

    const imagesFolder = ref(storage, "books");
    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items) {
      let photoUrl = await getDownloadURL(photoList.items[i]);

      list.push({
        name: photoList.items[i].name,
        url: photoUrl
      });
    }

    return list


  }