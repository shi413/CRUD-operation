const express = require('express')
const { Registration, Login, Alluser, userUpdate, userDelete } = require('../Controller/userController')
userRouter = express.Router()

userRouter.post('/Registration',Registration)
userRouter.post('/Login',Login)
userRouter.get('/Alluser',Alluser)
userRouter.put('/userUpdate/:id',userUpdate)
userRouter.delete('/userDelete/:id',userDelete)




module.exports = {userRouter}