import NavItems from './NavItems';
import NavLogo from './NavLogo';
import NavUser from './NavUser';

const Sidebar = () => {
  return (
    <aside className="px-4 py-12 border-r border-gray-100">
      <nav className="flex flex-col h-full gap-y-12">
        <div className="flex flex-row items-center gap-x-2 px-4">
          <NavLogo />
        </div>
        <div className="flex-1 flex flex-col gap-y-2 text-muted-foreground font-medium">
          <NavItems />
        </div>
        <div className="flex flex-row gap-x-3 items-center border-t border-gray-100 pt-4">
          <NavUser />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
