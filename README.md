# T3.chat - Next-Gen AI Chat Application

T3.chat is a full-stack, AI-powered chat application that demonstrates the power of modern web technologies. It features a beautiful, responsive interface, secure user authentication, and a helpful AI assistant ready to answer your questions.

![Landing Page](https://res.cloudinary.com/diyxwdtjd/image/upload/v1750272567/projects/t3-chat.png) <!-- It's a good idea to add a screenshot of your app here -->

## ✨ Features

- **Next-generation AI Chat:** Interact with a helpful AI assistant powered by Convex's Agent SDK.
- **Full-stack React:** Built with Next.js 15 for a seamless front-to-back experience.
- **Real-time & Secure Backend:** Uses Convex for backend, database, and real-time data synchronization.
- **User Authentication:** Secure and easy sign-up/sign-in with Clerk.
- **Persistent Threads:** Chat conversations are saved per user, so you can pick up where you left off.
- **Modern UI:** Sleek and responsive design using Tailwind CSS and shadcn/ui.
- **Light & Dark Mode:** Switch between themes for your viewing comfort.
- **Streaming Responses:** AI responses are streamed in real-time for a dynamic user experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Backend & Database:** [Convex](https://convex.dev/)
- **AI SDK:** [Vercel AI SDK](https://sdk.vercel.ai/) & [@convex-dev/agent](https://github.com/get-convex/convex-agent-sdk)
- **AI Model:** [OpenAI gpt-4o-mini](https://openai.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v20 or later)
- pnpm (or your favorite package manager)
- A [Clerk](https://clerk.com/) account
- An [OpenAI](https://openai.com/) API key

### 1. Clone the repository

```bash
git clone https://github.com/debsouryadatta/t3-chat.git
cd t3-chat
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up Convex

Log in to Convex and initialize the project. This command will guide you through setting up your backend.

```bash
pnpm convex dev
```

This will create a `convex.json` file and start the Convex development server. It will also provide you with the `CONVEX_DEPLOYMENT` URL.

### 4. Set up Environment Variables

Create a `.env.local` file in the root of your project and add your Clerk credentials:

```.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_your_publishable_key
CLERK_SECRET_KEY=sk_your_secret_key

# This is provided by `pnpm convex dev`
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

### 5. Configure Convex Dashboard

Now, add your Clerk and OpenAI secrets to the Convex dashboard. You can do this via the command line or by visiting your project on the [Convex dashboard](https://dashboard.convex.dev/).

```bash
pnpm convex env set CLERK_ISSUER_URL https://your-issuer-url.clerk.accounts.dev
pnpm convex env set OPENAI_API_KEY sk_your_openai_api_key
```

- Find your **Clerk Issuer URL** in the Clerk dashboard under your project's API Keys section (it should be the "JWT issuer URL").
- Get your **OpenAI API Key** from the [OpenAI platform](https://platform.openai.com/api-keys).

### 6. Run the application

Now you can start the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/debsouryadatta/t3-chat/issues). 