import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSignOutAccount } from '@/lib/react-query/queries/userQueries';
import { useUserContext } from '@/context/AuthContext';
import { Button } from '../ui/button';
import HomeLink from './HomeLink';

const Topbar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0); // Go to sign in page
    }
  }, [isSuccess]);

  return (
    <nav className="topbar">
      <div className="flex-between py-4 px-5">
        <HomeLink />

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
