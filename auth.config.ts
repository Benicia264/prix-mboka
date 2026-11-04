import type { NextAuthConfig } from "next-auth";

const PROTECTED = ["/signaler", "/mes-signalements"];
const PAGE_APRES_CONNEXION = "/prix";

export const authConfig = {
  pages: { signIn: "/connexion" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isProtected = PROTECTED.some((p) => nextUrl.pathname.startsWith(p));
      return isProtected ? !!auth?.user : true;
    },
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
    redirect({ url, baseUrl }) {
      const absolue = url.startsWith("/") ? `${baseUrl}${url}` : url;
      if (absolue === baseUrl || absolue === `${baseUrl}/`) {
        return `${baseUrl}${PAGE_APRES_CONNEXION}`;
      }
      if (absolue.startsWith(baseUrl)) return absolue;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;