import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const options = {

    providers: [
        //  github provider
        GithubProvider({
            profile(profile) {
                console.log("profile github", profile);

                let userRole = "Github User";
                if(profile?.email== "shawonkst15@gmail.com"){
                    userRole = "admin";
                }

                return {
                    ...profile,
                    role:userRole,
                }                      
            },
            // clint id
             clientId: process.env.GITHUB_ID,
             clientSecret: process.env.GITHUB_Secret,
        }),
        GoogleProvider({
            profile(profile) {
                console.log("profile google", profile);

                let userRole = "Google User";
                if(profile?.email== "shawonkst15@gmail.com"){
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role:userRole,
                }

            },
             // clint id
             clientId: process.env.GOOGLE_ID,
             clientSecret: process.env.GOOGLE_Secret,
        }),
    ],
    pages:{
        signIn : "/signin"
    },

   callbacks:{
    
      async jwt({token,user}){
        if (user) token.role = user.role
        return token
      },

      async session({session,token}){
        if(session?.user)session.user.role = token.role
        return session
      }
   }
//    secret: process.env.JWT_SECRET,
};