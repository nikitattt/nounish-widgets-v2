import nounsController from './controllers/nouns'
import lilNounsController from './controllers/lilnouns'
import nounsArtController from './controllers/nounsArt'

const PORT = Number(process.env.PORT ?? 6084)

Bun.serve({
  port: PORT,
  routes: {
    '/health': new Response('OK', { status: 200 }),
    '/nouns': {
      GET: nounsController.getNounsData
    },
    '/nouns/art': {
      GET: nounsArtController.getNounsArtData
    },
    '/lil-nouns': {
      GET: lilNounsController.getLilNounsData
    },
    '/*': new Response('Not Found', { status: 404 })
  }
})

console.log(`The server is running on port ${PORT}`)
