import NextAuth from "next-auth"
import GitHubProvider from 'next-auth/providers/github';
import User from "@/models/User";

import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'


export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
              console.log("Profile GitHub: ", profile);
      
              let userRole = "GitHub User";
              if (profile?.email == "toddlabo@gmail.com") {
                userRole = ["user"];
                console.log("-------", userRole)
              }
      
              return {
                ...profile,
                role: userRole,
              };
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: {
                label: "email",
                type: "text",
                placeholder: "your email"
              },
              password: {
                label: "password",
                type: "password",
                placeholder: "your password"
              },
            },
            async authorize(credentials){
              try{
                const foundUser = await User.findOne({ email: credentials.email})
                  .lean()
                  .exec();
                if(foundUser){
                  console.log("User exists")
                  const passwordMatch = await bcrypt.compare(
                                    credentials.password, 
                                    foundUser.password
                              );
                  if(passwordMatch) {
                    console.log("Good password")
                    delete foundUser.password;
                    // foundUser['role'] = "Unverified Email";
                    console.log(foundUser)
                    return foundUser;
                  }
                }
              }catch(error) {
                console.log(error)
              }
              return null;
            },
        }),
    ],
    pages: {
        // signIn: "/signin"
    },
    callbacks: {

        // server side
        async jwt({ token, user }) {
            if (user) {
                token.roles = user.roles;
            }
            return token;
        },
        // client side
        async session({ session, token }) {
            if (session?.user) {
                session.user.roles = token.roles;
            }
            return session;
        },
      },
    };

export default NextAuth(options)