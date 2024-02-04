import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import prisma from "@/lib/prisma"
export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth({
  providers: [Google],

  
  callbacks: {
    async signIn({ user, account }) {
        const ifUser = await prisma.user.findFirst({where: {
            userid:user.id
          }})

        if(ifUser) return true;

        if(user.email && user.name && user.id && user.image){
        const userdb = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              userid: user.id,
              image:user.image
            },
          })
        }
        return true;
    },
    async jwt({token, account,profile}) {

      if (account) {
        token = Object.assign({}, token, { access_token: "ampk" });
      }
      return token
    },
    async session({session, token}:any) {
    if(session) {
      session = Object.assign({}, session, {access_token: token.access_token})
      }
    return session
    }
  }
});