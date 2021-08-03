export default function HomeComponent({ children }) {
  return (
    <div className="bg-white min-h-screen min-w-full sm:grid sm:grid-cols-12">
      {children}
    </div>
  );
}
