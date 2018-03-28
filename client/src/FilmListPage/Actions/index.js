export const sortByName = ()=> {
    return {
        type: 'SORT_BY_NAME',
        payload: {}
    }
};
export const sortByMark = ()=> (
    {
        type: 'SORT_BY_MARK',
        payload: {

        }
    }
);
export const noneSort = ()=> (
    {
        type: 'NONE_SORT',
        payload: {

        }
    }
);
export const loadFilmList = (filmList)=> (
    {
        type: 'LOAD_FILM_LIST',
        payload: {
            filmList: filmList
        }
    }
);
export const searchFilm = (value)=> (
    {
        type: 'SEARCH_FILM',
        payload: {
            searchValue: value
        }
    }
);