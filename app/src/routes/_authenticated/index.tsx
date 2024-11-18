import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, status } = trpc.onPostAdd.useSubscription();
	const { mutateAsync: addPost } = trpc.addPost.useMutation();
	const { data: posts } = trpc.getPosts.useQuery();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	return (
		<div className="space-y-8">
			<form
				className="space-y-6"
				onSubmit={async (e) => {
					e.preventDefault();
					await addPost({ title, content });
					setTitle("");
					setContent("");
				}}
			>
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="content">Content</Label>
					<Textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="resize-none"
						rows={4}
					/>
				</div>
				<Button type="submit">Add Post</Button>
			</form>

			<div className="space-y-4">
				<div>
					<h2 className="text-xl font-semibold mb-2">Latest Added Post:</h2>
					<pre className="bg-muted p-4 rounded-lg overflow-auto">
						{JSON.stringify(data, null, 2)}
					</pre>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-2">All Posts:</h2>
					<pre className="bg-muted p-4 rounded-lg overflow-auto">
						{JSON.stringify(posts, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	);
}
