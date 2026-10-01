import type { User } from "../types";
import { Link } from "react-router";
import Button from "./Button";

type HeaderProps = {
  title: string;
  onLogout: () => void;
  user?: User;
};

function Header({ title, onLogout, user }: HeaderProps) {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="text-right">
              <p className="font-medium">{user.name}</p>

              <p className="text-sm text-slate-500"></p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
          </Link>
        )}

        <Button onClick={onLogout}>Logout</Button>
      </div>
    </header>
  );
}

export default Header;
