import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // For demo purposes only - allows logging in with any email/password
        Credentials({
            name: 'Demo Login',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "demo@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock user for demo
                if (credentials?.email === 'demo@example.com') {
                    return {
                        id: '1',
                        name: 'Demo User',
                        email: 'demo@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                    };
                }
                return null;
            },
        }),
    ],
});
