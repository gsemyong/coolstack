import { openai } from "@ai-sdk/openai";
import FastifySwagger from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { streamText, type Message } from "ai";
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

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

fastify.post<{
  Body: {
    messages: Message[];
  };
}>("/chat", (req, reply) => {
  const result = streamText({
    model: openai("gpt-4o"),
    system: "You are a helpful assistant.",
    messages: req.body.messages,
  });

  // Mark the response as a v1 data stream:
  reply.header("X-Vercel-AI-Data-Stream", "v1");
  reply.header("Content-Type", "text/plain; charset=utf-8");

  return reply.send(result.toDataStream());
});

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

await fastify.ready();

// Run the server
fastify.listen({ port: 8080 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log("Go to API reference at http://localhost:8080/reference");
});
