import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
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
  const { data: mySubscription } = trpc.mySubscription.useSubscription(
    { lastEventId: 0 },
    {
      onData(data) {
        console.log("mySubscription", data);
      },
    },
  );

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
          <Label className={cn("w-10 sm:w-0")} htmlFor="content">
            Content
          </Label>
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
          <h2 className="mb-2 text-xl font-semibold">Latest Added Post:</h2>
          <pre className="overflow-auto rounded-lg bg-muted p-4">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">All Posts:</h2>
          <pre className="overflow-auto rounded-lg bg-muted p-4">
            {JSON.stringify(posts, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
