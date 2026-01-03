import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { getEmailTemplate } from "./email-template";
// If your Prisma file is located elsewhere, you can change the path

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.NODE_MAILER_USER!,
    pass: process.env.NODE_MAILER_PASS!,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "active",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      prompt : "select_account consent",
      accessType : "offline",
      clientId: process.env.GOOGLE_CLIENT_ID!, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,   
      
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn : false
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification : true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationURL = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
          to: user.email!,
          subject: "Please verify your email",
          html: getEmailTemplate(verificationURL,user), 
        });
      } catch (error : any) {
        throw new Error("Failed to send verification email",error);
      }
    }
  },
});
