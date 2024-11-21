import FastifySwagger from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { Type, type Static } from "@sinclair/typebox";
import Fastify from "fastify";

// Instantiate the framework
const fastify = Fastify({
  logger: true,
});

// Set up @fastify/swagger
await fastify.register(FastifySwagger, {
  openapi: {
    info: {
      title: "My Fastify App",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  },
});

// Define the schema types
const ParamsSchema = Type.Object({
  id: Type.String({
    description: "user id",
  }),
});

const BodySchema = Type.Object({
  hello: Type.String(),
  obj: Type.Object({
    some: Type.String(),
  }),
});

// Create static types from schemas
type ParamsType = Static<typeof ParamsSchema>;
type BodyType = Static<typeof BodySchema>;

fastify.put<{
  Params: ParamsType;
  Body: BodyType;
}>(
  "/example-route/:id",
  {
    schema: {
      description: "post some data",
      tags: ["user", "code"],
      summary: "qwerty",
      security: [{ apiKey: [] }],
      params: ParamsSchema,
      body: BodySchema,
      response: {
        201: Type.Object({
          hello: Type.String(),
        }),
        default: Type.Object({
          foo: Type.String(),
        }),
      },
    },
  },
  (req, reply) => {
    // Now req.body is properly typed
    reply.code(201).send({ hello: `Hello ${req.body.hello}` });
  },
);

// Serve an OpenAPI file
fastify.get("/openapi.json", async () => {
  return fastify.swagger();
});

await fastify.register(ScalarApiReference, {
  routePrefix: "/reference",
  // Additional hooks for the API reference routes. You can provide the onRequest and preHandler hooks
  hooks: {
    onRequest: (_request, _reply, done) => {
      done();
    },
    preHandler: (_request, _reply, done) => {
      done();
    },
  },
});

// Wait for Fastify
await fastify.ready();

// Run the server
fastify.listen({ port: 8080 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log("Go to API reference at http://localhost:8080/reference");
});
