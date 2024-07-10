export default function NavBar() {
  return (
    <div className="absolute left-0 right-0 z-50 px-20">
      <nav className="nav-bar flex justify-between items-center h-20 text-white">
        <h1>Logo</h1>
        <ul className="flex gap-[5rem]">
          <li>Home</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
}