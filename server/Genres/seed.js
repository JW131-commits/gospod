const Genres = require('./Genres')
const data = [
    'Комедия',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодраммы',
    'Детективы',
    'Приключения',
    'Фентези'

]

async function writeDataGenre(){
    const length = await Genres.countDocuments()
    if(length == 0){
        data.map((item , index) =>{
            new Genres ({
                name : item,
                key : index
            }).save()
        })
    }
    
}

module.exports = writeDataGenre

