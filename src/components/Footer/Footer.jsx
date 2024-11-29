import { Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 text-center flex justify-between items-center shadow-inner">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Copyright &copy; Abdullah Zeeshan 2024
      </p>
      <a
        href="https://github.com/4bdullah7eeshan"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
      >
        <Github />
      </a>
    </footer>
  );
}

export default Footer;
