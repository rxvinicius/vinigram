import { useGetUsers } from '@/lib/react-query/queries/userQueries';
import { Loader, UserCard } from '@/components/shared';
import { useToast } from '@/components/ui/use-toast';

const AllUsers = () => {
  const { data: creators, isLoading, isError } = useGetUsers();
  const { toast } = useToast();

  if (isError) {
    toast({
      title: 'Uh oh! Something went wrong',
      description: 'Please try again later.',
      variant: 'destructive',
      className: 'bg-red',
      duration: 2000,
    });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="page-title">All Users</h2>

        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
