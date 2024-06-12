function deleteFilms (id , authorID){
    axios.delete(`/api/films/${id}`).then(data => location.reload())
    
}
// function deleteItem(id){
//     axios.delete(`/delete/${id}` ).then(res=> location.reload())
    
// }