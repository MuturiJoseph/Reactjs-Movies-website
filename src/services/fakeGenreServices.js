export const genres = [
    {_id: '46567467hdghjfbfhbj222', name: 'Action'},
    {_id: '3647467hdghjfbfhbj222', name: 'Comedy'},
    {_id: '2fh2367hdghjfbfhbj222', name: 'Thriller'},
    {_id: '2fh4657hbfchhbj222', name: 'Horror'}
];

 export function getGenres() {
    return genres.filter(g => g);
}