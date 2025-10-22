import { Link, useMatches } from "react-router-dom";
import { HomeIcon,ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb() {
  const matches = useMatches();

  return (
    <nav className="flex mb-2 bg-gray-50 w-full p-2 rounded-sm shadow-sm " aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse">
        {/* خانه */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#FF4B4B]"
          >
          
            خانه
          </Link>
        </li>

        {/* مسیرهای داینامیک */}
        {matches
          .filter((match) => match.handle?.crumb)
          .map((match, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <li key={match.pathname} aria-current={isLast ? "page" : undefined}>
                <div className="flex items-center">
                  <ChevronLeftIcon  className="w-4 h-4 text-gray-400 mx-2"/>
                  {isLast ? (
                    <span className="ms-1 text-sm font-medium text-gray-400">
                      {match.handle.crumb}
                    </span>
                  ) : (
                    <Link
                      to={match.pathname}
                      className="ms-1 text-sm font-medium text-gray-500 hover:text-[#FF4B4B]"
                    >
                      {match.handle.crumb}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
