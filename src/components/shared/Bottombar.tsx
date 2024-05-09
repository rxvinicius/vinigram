import { Link, useLocation } from 'react-router-dom';

import { BOTTOMBAR_LINKS } from '@/constants';
import { INavLink } from '@/types';

const Bottombar = () => {
  const { pathname } = useLocation();

  const Links = ({ label, route, imgURL }: INavLink) => {
    const isActive = pathname === route;

    return (
      <Link
        key={label}
        to={route}
        className={`
          flex-center flex-col gap-1 p-2 transition
          ${isActive && 'bg-primary-500 rounded-[10px]'}
        `}
      >
        <img
          src={imgURL}
          alt={label}
          width={18}
          height={18}
          className={`${isActive && 'invert-white'}`}
        />
        <p className="tiny-medium">{label}</p>
      </Link>
    );
  };

  return (
    <section className="bottom-bar">
      {BOTTOMBAR_LINKS.map((link: INavLink) => (
        <Links key={link.label} {...link} />
      ))}
    </section>
  );
};

export default Bottombar;
