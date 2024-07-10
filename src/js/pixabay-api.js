import { formInput, showLoader } from '../main';

export function getPicturesByQuery() {
    const query = formInput.value;
    console.log(query);
    const Api_Key = '44869216-4addd85d29d39c45ae242764b'
    return fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(res => {
        console.log(res);

        if (!res.ok) {
            throw new Eroor(res.status);
        }

        return res.json();
    });
}