import type { NextAuthConfig } from "next-auth";

const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password", "/reset-password"];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const path = nextUrl.pathname;

      if (PUBLIC_PATHS.includes(path)) return true;
      if (path.startsWith("/reset-password/")) return true;
      if (path.startsWith("/api/auth")) return true;
      if (path.startsWith("/api/register")) return true;
      if (path.startsWith("/api/")) {
        return !!auth?.user;
      }

      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
