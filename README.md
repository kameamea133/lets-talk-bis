This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

Google Authentication
Real-time messaging
Image uploads
Responsive design

## Technologies Used

Next.js
React
Firebase Firestore
Firebase Authentication
Firebase Storage
Framer Motion for animations
React Icons for icons

## Folder Structure

components/: Contains React components used in the application
db/: Firebase configuration file
hooks/: Custom hooks used in the application
pages/: Next.js pages
public/: Public assets such as images and icons


## Key Files

'db/firebaseConfig.ts': Firebase configuration and initialization
'hooks/useClientAuth.ts': Custom hook for managing client authentication
'components/ChatContainer.tsx': Component to display chat messages
'components/SendMessage.tsx': Component for sending messages
'components/Nav.tsx': Navigation bar component
'pages/index.tsx': Home page
'pages/dashboard.tsx': Dashboard page
'pages/chat.tsx': Chat page

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
