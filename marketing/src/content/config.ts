import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/data/blog" }),
	schema: z.object({
		title: z.string(),








		description: z.string(),
	}),
});

export const collections = { blog };
