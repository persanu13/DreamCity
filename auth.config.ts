import type { NextAuthConfig } from "next-auth";

import { MyUser } from "./app/db/definitions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Include `role` în token
      if (user) {
        token.role = user.role; // Asigură-te că user conține `role`
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user as MyUser;
      const isAdmin = user?.role === "admin";
      const isUser = user?.role === "user";
      const publicAcces =
        nextUrl.pathname === "/" ||
        nextUrl.pathname === "/register" ||
        nextUrl.pathname === "/login";
      const adminNotAcces =
        nextUrl.pathname === "/register" || nextUrl.pathname === "/login";
      const userAcces =
        nextUrl.pathname.startsWith("/user") || nextUrl.pathname === "/";

      if (!isLoggedIn) {
        if (publicAcces) {
          return true;
        }
        return Response.redirect(new URL("/login", nextUrl));
      }
      // Acces pentru admin - Acces pe tot site-ul
      if (isAdmin) {
        if (adminNotAcces) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }

      // Acces pentru user - Acces doar la paginile care încep cu /user
      if (isUser) {
        if (userAcces) {
          return true;
        } else {
          return Response.redirect(new URL("/user", nextUrl));
        }
      }

      // În orice alt caz, redirecționează la /login
      return Response.redirect(new URL("/login", nextUrl));
    },
  },
  providers: [], // Adaugă aici furnizorii de autentificare
} satisfies NextAuthConfig;
