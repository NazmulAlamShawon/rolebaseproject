import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const options = {

    provider: [
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

            }
           
        }),
        
    ]
}