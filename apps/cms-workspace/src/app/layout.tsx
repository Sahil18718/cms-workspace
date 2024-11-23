import Link from 'next/link';
import './global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-500 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-lg font-bold">CMS</h1>
            <div className="flex space-x-4">
              <Link href="/" legacyBehavior>
                <a className="hover:underline">Home</a>
              </Link>
              <Link href="/posts/create" legacyBehavior>
                <a className="hover:underline">Create Post</a>
              </Link>
              <Link href="/pages/create" legacyBehavior>
                <a className="hover:underline">Create Page</a>
              </Link>
              <Link href="https://your-storybook-url.com">Storybook</Link>
              <Link href="https://your-docs-url.com">Documentation</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
