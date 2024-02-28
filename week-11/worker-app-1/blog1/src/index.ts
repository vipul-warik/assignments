import { Hono } from 'hono'
import root from './routes'

const app = new Hono()

app.route('/api/v1', root);

export default app
