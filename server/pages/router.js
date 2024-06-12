const express = require('express')
const router = express.Router()
const Genres = require('../Genres/Genres')
const country = require('../Country/Country')
const User = require('../auth/User')
const Film = require('../Films/film')
const Rate = require('../Rates/Rates')
const moment = require('moment')

router.get('/' , async (req , res) => {
    const options = {}
    const genres = await Genres.findOne({key : req.query.genre })
    if(genres){
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search  && req.query.search.length > 0){
        options.$or = [
            {
                titleRus: new RegExp(req.query.search , 'i')
            },
            {
                titleEng : new RegExp(req.query.search , 'i')
            }

        ]
        res.locals.search =req.query.search
    }
    const allRate = await Rate.find()
   
    const totalFilms = await Film.countDocuments(options)
    const allGenres = await Genres.find();
    const films = await Film.find(options).limit(limit).skip(page * limit).populate('country').populate('genre');
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render('index', { Genres: allGenres, user, films , pages : Math.ceil(totalFilms / limit), allRate });
    

   
})

router.get('/login' , (req , res) =>{ 
    res.locals.passwordErr = req.query.error
    let error = ''
    if(res.locals.passwordErr == 1){
        error = 'Не верный пароль'
    }
    res.render('login' , { user : req.user ? req.user : {} ,  message: req.flash('error') , error})
})

router.get('/register' , (req, res) =>{
    res.render('register' , { user : req.user ? req.user : {}})
})


router.get('/profile/:id' , async (req , res) =>{
    
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id)
    .populate('toWatch')
    .populate({path : 'toWatch' , populate :{path : 'country'} })
    .populate({path : 'toWatch' , populate:{path : 'genre'}})

    if(user){
        res.render('profile', { genres : allGenres, user : user , loginUser : req.user} )
   
    }else{
        res.redirect('/not-found')
    }
    
})

router.get('/admin/:id' ,async (req , res) =>{
    const films = await Film.find().populate('country').populate('genre').populate('author')
    const user = await User.findById(req.params.id)
    const allGenres = await Genres.find()
    res.render('adminProfile', {genres: allGenres, user : user, loginUser: req.user , films} )
})

router.get('/new' ,  async (req , res) =>{
  
    const allGenres = await Genres.find()
    const allCountries = await country.find() 
    res.render('newFilm' , {Genres : allGenres, countries : allCountries, user : req.user ? req.user : {}})
})

router.get('/edit/:id' , async (req , res) =>{
    const film = await Film.findById(req.params.id)
    const allGenres = await Genres.find()
    const allCountries = await country.find()
    res.render('editFilm' , {Genres : allGenres, countries : allCountries , user : req.user ? req.user : {} , film})
})


router.get('/not-found' , (req , res) =>{
    res.render('notFound')
})

router.get('/detail/:id' , async (req , res) =>{
    const rates = await Rate.find({filmId : req.params.id}).populate('authorId')
    let avarageRate = 0
    for(let i = 0; i < rates.length; i++){
        avarageRate += rates[i].rate
    }

    const film = await Film.findById(req.params.id).populate('country').populate('genre')
    res.render('detail' , {user : req.user ? req.user : {} , film : film, rates : rates,
     avarageRate : (avarageRate / rates.length).toFixed(1) ,  moment})
})

module.exports= router