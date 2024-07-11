import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

import { Button } from '../ui/button';

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => (
  <Link to={`/profile/${user.$id}`} className="user-card">
    {/* User photo */}
    <img
      src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
      alt={`User ${user.name}`}
      className="rounded-full w-14 h-14"
    />

    {/* Name and username */}
    <div className="flex-center flex-col gap-1">
      <p className="base-medium text-light-1 text-center line-clamp-1">
        {user.name}
      </p>
      <p className="small-regular text-light-3 text-center line-clamp-1">
        @{user.username}
      </p>
    </div>

    {/* Follow button */}
    <Button type="button" size="sm" className="shad-button_primary px-5">
      Follow
    </Button>
  </Link>
);

export default UserCard;
