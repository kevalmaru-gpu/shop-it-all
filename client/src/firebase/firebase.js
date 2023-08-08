import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../config/firebase_config';

async function getFileURL(dir){
    const url = await getDownloadURL(ref(storage, dir))
    .then((url) => {
        return {
            url: url,
            error: null
        }
    })
    .catch((error) => {
        return {
            url: null,
            error: error
        }
    });

    return url
}

async function getAllFilesURL(dir){
    const url_list = []

    const log = await listAll(ref(storage, dir))
    .then(async res => {
        res.items.forEach(async itemRef => {
            const url = await getFileURL(itemRef)
            url_list.push(url)
            return null
        })
    })
    .catch(err => {
        return err
    })

    return {
        url_list: url_list,
        error: log
    }
}

export { getFileURL, getAllFilesURL }