export default function Layout({ children }) {
  return (
    <div className="bg-twblue min-h-screen flex flex-col items-center overflow-y-scroll h-screen">
      {children}
    </div>
  );
}
