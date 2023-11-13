import { randomUUID } from 'node:crypto'

class DatabaseMemory {
    #videos = new Array()

    list() {
        return [...this.#videos]
    }

    create(video) {
        const id = randomUUID()
        this.#videos.push({
            id,
            ...video
        })
    }

    update(id, video) {
        const videoIndex = this.#videos.findIndex(video => video.id === id)
        this.videos[videoIndex] = video
    }

    delete(id) {
        this.#videos.filter(video => video.id !== id)
    }
}

export default DatabaseMemory
