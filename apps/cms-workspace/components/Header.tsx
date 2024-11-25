import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-lg font-bold tracking-wide">CMS Dashboard</h1>

        {/* Navigation Links */}
        <div className="space-x-4 text-sm sm:text-base flex items-center flex-wrap">
          <Link href="/" legacyBehavior>
            <a
              className={`hover:underline ${
                router.pathname === "/" ? "font-semibold underline" : ""
              }`}
            >
              Home
            </a>
          </Link>
          <Link href="/posts/create" legacyBehavior>
            <a
              className={`hover:underline ${
                router.pathname === "/posts/create"
                  ? "font-semibold underline"
                  : ""
              }`}
            >
              Create Post
            </a>
          </Link>
          <Link href="/pages/create" legacyBehavior>
            <a
              className={`hover:underline ${
                router.pathname === "/pages/create"
                  ? "font-semibold underline"
                  : ""
              }`}
            >
              Create Page
            </a>
          </Link>
          <Link
            href="http://localhost:59581/"
            legacyBehavior
            target="_blank"
            rel="noopener noreferrer"
          >
            <a className="hover:underline">Storybook</a>
          </Link>
          <Link
            href="http://localhost:3000/docs/setup"
            legacyBehavior
            target="_blank"
            rel="noopener noreferrer"
          >
            <a className="hover:underline">Documentation</a>
          </Link>
          <Link
            href="http://localhost:5555"
            legacyBehavior
            target="_blank"
            rel="noopener noreferrer"
          >
            <a className="hover:underline">Prisma Studio</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
