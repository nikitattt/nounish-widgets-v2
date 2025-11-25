import express from 'express'
import nounsController from '../controllers/nouns'
import lilNounsController from '../controllers/lilnouns'

const router = express.Router()

router.get('/nouns', nounsController.getNounsData)
router.get('/nouns/art', nounsController.getNounsData)
router.get('/lil-nouns', lilNounsController.getLilNounsData)
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

export = router
