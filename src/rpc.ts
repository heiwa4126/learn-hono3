import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const route = app.post(
  '/posts',
  zValidator(
    'form',
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  (c) => {
    // ...
    return c.json(
      {
        ok: true,
        message: 'Created!',
      },
      201
    )
  }
)

export type AppType = typeof route;
export default app
