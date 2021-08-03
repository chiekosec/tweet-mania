export default function BottomNav({ children }) {
  return (
    <div className="border-t-2 border-twgray-lt h-20 text-gray-500 fixed bottom-0 w-full flex justify-around items-center sm:hidden">
      {children}
    </div>
  );
}
