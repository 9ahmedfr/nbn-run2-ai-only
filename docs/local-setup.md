A number of "secrets" were used to configure the deployment and CI pipeline for this repository:

1. FIREBASE_SERVICE_ACCOUNT_KEY_BASE64
2. NEXT_PUBLIC_FIREBASE_PROJECT_ID
3. NEXT_PUBLIC_FIREBASE_API_KEY
4. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
5. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
6. NEXT_PUBLIC_FIREBASE_APP_ID
7. VERCEL_AUTOMATION_BYPASS_SECRET

Secrets 1-6 were obtained from the Firebase project, with one being generated manually through the service accounts section. Secret 1 was originally downloaded as a json file before being encoded in base64. Secret 7 was generated through the Vercel dashboard under the **Deployment Protection** section.

## Accessing the Deployed Application

To access the deployed application, go to: "https://nbn-sdlc-demo-frontend.vercel.app/"
- Create an account if you have not already done so.
- If you create a new account, verify the email address used during registration.
- Sign in using your verified account.
