export default function SideNav({ children }) {
  return (
    <div className="hidden text-justify px-6 pl-12 sm:block sm:col-start-1 sm:col-span-2 xl:col-span-3 border-r-2 border-twgray-lt">
      {children}
    </div>
  );
}
