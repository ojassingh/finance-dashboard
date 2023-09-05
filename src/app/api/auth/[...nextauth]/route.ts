import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

const handler = NextAuth({
    providers: [
        Auth0Provider({
          clientId: process.env.AUTH0_CLIENT_ID as string,
          clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
          issuer: process.env.AUTH0_ISSUER_BASE_URL
        })
      ]
})

export { handler as GET, handler as POST }