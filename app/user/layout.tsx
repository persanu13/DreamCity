import Navigation from "../ui/user/home/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* Navigation bar */}
      <div className="h-[150px]">
        <Navigation />
      </div>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}