import { MessageCircleMore } from 'lucide-react';

function Logo() {
  return (
    <h1 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-300">
      <MessageCircleMore className="mr-2" />
      Messaging App
    </h1>
  );
}

export default Logo;
