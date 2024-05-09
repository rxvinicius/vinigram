import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { SIDEBAR_LINKS } from '@/constants';
import { INavLink } from '@/types';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutarions';
import { Button } from '../ui/button';
import HomeLink from './HomeLink';

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const Links = ({ label, route, imgURL }: INavLink) => {
    const isActive = pathname === route;

    return (
      <li
        key={label}
        className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}
      >
        <NavLink to={route} className="flex p-3 gap-4 items-center">
          <img
            src={imgURL}
            alt={label}
            className={`group-hover:invert-white ${isActive && 'invert-white'}`}
          />
          {label}
        </NavLink>
      </li>
    );
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(0); // Go to sign in page
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-9">
        <HomeLink imageWidth={170} imageHeight={36} />

        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || 'assets/icons/profile-placeholder.svg'}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />

          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-3">
          {SIDEBAR_LINKS.map((link: INavLink) => (
            <Links key={link.label} {...link} />
          ))}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
