const {sequelize , User , Posts} = require('./models')
const express = require('express')

const app = express()


app.use(express.json())

app.post('/users',async (req,res) =>{
    const {name ,email,role} = req.body

    try {
        const user = await User.create({name , email,role})
        res.json(user).status(201)
        
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

app.get('/users' , async (req,res)=>{
    try {
        const users = await User.findAll()
        res.json(users).status(200)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
app.get('/users/:uuid' , async (req,res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where : {uuid},
            include : 'posts'
        } )
        res.json(user).status(200)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
app.post('/posts' , async (req,res) =>{
    const {userUUID , body} = req.body

    try {
        const user = await User.findOne({where : {uuid : userUUID}})
        const post = await Posts.create({body , userId : user.id})
        return res.json(post).status(201)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
app.get('/posts' , async (req,res) =>{
    try {
        const posts = await Posts.findAll({include : 'user'})
        return res.json(posts).status(200)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

app.listen(3000)

async function main(){
    await sequelize.authenticate()
}

main()