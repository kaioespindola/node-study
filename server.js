// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World')
// })

// server.listen(3000);

import { fastify } from 'fastify'
import DatabaseMemory from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (req, res) => {
    const { title, url, description } = req.body

    database.create({
        title,
        url,
        description
    })

    return res.status(201).send({ message: 'Video created' })
})

server.get('/videos', (req, res) => {
    const videos = database.list()

    return res.status(200).send(videos)
})

server.put('/videos/:id', (req, res) => {
    const videoId = req.params.id
    const { title, url, description } = req.body

    database.update(videoId, {
        title,
        url,
        description
    })

    return res.status(204).send()
})

server.delete('/videos/:id', (req, res) => {
    const videoId = req.params.id

    database.delete(videoId)

    return res.status(204).send()
})

server.listen({ port: 3000 })
