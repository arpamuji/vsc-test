import { IconChevronDownFilled } from '@tabler/icons-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

const NavUser = () => {
  return (
    <>
      <Avatar>
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <div className="inline-flex flex-col flex-1">
        <p className="text-sm font-medium">User Admin</p>
        <span className="text-xs text-muted-foreground">Admin</span>
      </div>
      <IconChevronDownFilled className="text-muted-foreground" size={16} />
    </>
  );
};

export default NavUser;
