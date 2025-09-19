const router = require('express').Router();
const authRouter = require('./authRoute')
const userRouter = require('./userRoute');

router.use('/auth',authRouter)

router.use(userRouter);






module.exports = router;