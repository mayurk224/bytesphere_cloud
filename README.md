# ByteSphere Cloud

ByteSphere Cloud is a modern cloud storage solution built with Next.js and Appwrite. It provides a secure and user-friendly platform for storing, managing, and sharing various types of files.

## Features

- **Secure Authentication**: Email-based OTP authentication system
- **File Management**: Upload, view, rename, and delete files
- **File Sharing**: Share files with other users via email
- **File Organization**: Files are automatically categorized by type (documents, images, media, others)
- **Storage Analytics**: Visual representation of storage usage with charts
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15.3.0, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication & Storage**: Appwrite
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts
- **File Handling**: React Dropzone

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Appwrite account and project setup

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE=your-database-id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your-users-collection-id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your-files-collection-id
NEXT_PUBLIC_APPWRITE_BUCKET=your-bucket-id
NEXT_APPWRITE_KEY=your-appwrite-api-key
```

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mayurk224/bytesphere_cloud.git
   cd bytesphere_cloud
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Appwrite Setup

1. Create an Appwrite project
2. Set up a database with collections for users and files
3. Create a storage bucket for file uploads
4. Configure authentication methods (email/password)
5. Set up appropriate security rules and permissions

## Project Structure

```
bytesphere_cloud/
├── app/                  # Next.js app directory
│   ├── (auth)/           # Authentication routes
│   ├── (root)/           # Main application routes
│   ├── components/       # React components
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # Shared UI components
├── lib/                  # Utility functions and API
│   ├── actions/          # Server actions
│   ├── appwrite/         # Appwrite configuration
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## Features in Detail

### Authentication

ByteSphere Cloud uses Appwrite's authentication system with email OTP (One-Time Password) for secure login and registration.

### File Management

- **Upload**: Drag and drop or select files to upload
- **View**: Preview files directly in the browser
- **Organize**: Files are automatically categorized by type
- **Share**: Share files with other users via email
- **Delete**: Remove files you no longer need

### Storage Analytics

The dashboard provides visual analytics of your storage usage, showing:
- Total space used vs. available
- Breakdown by file types
- Recent activity

## Deployment

The easiest way to deploy ByteSphere Cloud is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
