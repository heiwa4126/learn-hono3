import { Hono } from 'hono'
import authors from './authors'
import books from './books'
import rpc from './rpc'

const app = new Hono()

app.route('/authors', authors)
app.route('/books', books)
app.route('/rpc', rpc)

export default app
