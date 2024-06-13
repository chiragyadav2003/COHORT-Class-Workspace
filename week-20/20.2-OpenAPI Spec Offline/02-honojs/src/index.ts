import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ParamsSchema } from './inputs';
import { UserSchema } from './outputs';

const app = new OpenAPIHono()

const getUserRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: ParamsSchema
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema
        },
      },
      description: "Get user details."
    }
  }
})

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid('param');
  return c.json({
    id,
    age: 20,
    name: "Ultraman"
  })
})


// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})

export default app
