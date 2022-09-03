const router = require('express').Router()
const {User,Books} = require('../models') 


//admin control
router.post('/add/book', async(req,res)=>{
//first check given id is unique or duplicate   If duplicate dont add else add
let detail = {
    isbn:req.body.isbn,
    name: req.body.name,
    Author: req.body.Author,
    RentedcheckId:req.body.RentedcheckId,
    publishedOn: req.body.publishedOn,
    AddedOn: req.body.AddedOn
}
let check_duplication = await Books.findOne({where:{isbn:detail.isbn}})
if(check_duplication){
    res.send({message:'same book already added'})
}else{

try{
let result = await Books.create(detail)
res.send(result)}catch(err){
    console.log(err)
    res.send({message:"values cannot be null"})
}

}})

router.post('/rent/book', async(req,res)=>{
  let isbn  = req.body.isbn
  let userid = req.body.userid

await Books.update({RentedcheckId:1},{where:{isbn:isbn}})

let result = await User.findOne({where:{id:userid}})
let booksid = await Books.findOne({where:{isbn:isbn}})

if(result){
    //rent book on user
    await result.addBooks(booksid)
   // res.redirect('/')
   res.send({'mssge':"book is rented now"})
   //  await booksid.setUser(result.id)
} else{
    //errorthat user id is not valid
    res.send({message:"userid in invalid"})
}

})

router.post('/return/book', async(req,res)=>{
    let isbn  = req.body.isbn
    let userid = req.body.userid
  
  
  let result = await User.findOne({where:{id:userid}})
  let booksid = await Books.findOne({where:{isbn:isbn}})
  if(result){

      await result.removeBooks(booksid)
      await Books.update({RentedcheckId:null},{where:{isbn:isbn}})
      res.send({'mssge':"book is removed from user account"})
    
  } else{
  
      res.send({message:"userid in invalid"})
  }
 
  })
  


router.get('/rent/bookbyuser', async(req,res)=>{
let userid = req.query.userid
let result = await User.findOne({where:{id:userid}})
let showsrentedbooks = await result.getBooks()
console.log("><><><><>"+showsrentedbooks.dataValues)

//res.send(showsrentedbooks)
res.render('userdetails',{showsrentedbooks,result})
})





//user control
router.get('/get/book', async(req,res)=>{

let result = await Books.findAll({where:{RentedcheckId:null}})

res.render('index',{userData:result})
})

module.exports = {
    bookRouter: router
}