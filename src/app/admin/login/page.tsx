"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-border bg-surface p-8"
      >
        <h1 className="text-lg font-semibold">Admin login</h1>
        <p className="mt-1 text-sm text-muted">
          Enter the admin password to edit your portfolio content.
        </p>
        <input
          type="password"
          name="password"
          autoFocus
          required
          placeholder="Password"
          className="mt-6 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {state?.error && (
          <p className="mt-3 text-sm text-red-500">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
