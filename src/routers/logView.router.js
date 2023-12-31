import { Router } from "express"

const router = Router()

router.get('/in', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

export default router