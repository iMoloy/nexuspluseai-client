import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export interface BackendUserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  kycVerified?: boolean;
  authProvider?: string;
}

interface ExtendedUser {
  backendAccessToken?: string;
  backendUser?: BackendUserData;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Sync Google user with our Express backend
          const response = await fetch(
            `${process.env.NEXTAUTH_BACKEND_URL || 'http://localhost:5000/api/v1'}/auth/google-sync`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                googleId: account.providerAccountId,
                email: user.email,
                name: user.name,
                avatar: user.image
              })
            }
          );

          const data = await response.json();
          if (data.success) {
            // Attach our JWT to the user object for token callback
            const extUser = user as unknown as ExtendedUser;
            extUser.backendAccessToken = data.data.accessToken;
            extUser.backendUser = data.data.user;
            return true;
          }
          return false;
        } catch (err) {
          console.error('[NextAuth] Backend sync failed:', err);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const extUser = user as unknown as ExtendedUser;
        token.backendAccessToken = extUser.backendAccessToken;
        token.backendUser = extUser.backendUser;
      }
      return token;
    },

    async session({ session, token }) {
      session.backendAccessToken = token.backendAccessToken as string;
      session.backendUser = token.backendUser as BackendUserData;
      return session;
    }
  },
  pages: {
    signIn: '/',
    error: '/'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
