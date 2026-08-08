import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    backendAccessToken?: string;
    backendUser?: {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar?: string;
      kycVerified?: boolean;
      authProvider?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    backendAccessToken?: string;
    backendUser?: {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar?: string;
      kycVerified?: boolean;
      authProvider?: string;
    };
  }
}
