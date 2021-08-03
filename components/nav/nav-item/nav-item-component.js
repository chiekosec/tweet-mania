import Link from "next/link";

export default function NavItem({ icon, content, path, logo }) {
  return (
    <div className="flex justify-end xl:justify-start">
      <Link href={path}>
        <a className="p-2 cursor-pointer flex items-center justify-center text-xl transition hover:text-twblue hover:bg-twblue hover:bg-opacity-5 rounded-full">
          <div className="w-8 text-center">
            <i
              className={`${icon} block text-xl ${
                logo ? "text-twblue text-3xl mb-3" : ""
              }`}
            />
          </div>
          {content ? (
            <span className="hidden xl:block font-black px-5">{content}</span>
          ) : (
            ""
          )}
        </a>
      </Link>
    </div>
  );
}
