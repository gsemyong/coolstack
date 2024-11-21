import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /_authenticated/!";
}
