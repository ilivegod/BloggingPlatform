interface User {
  name: string;
  username: string;
  bio: string;
  profilePicture: string;
  followers: number;
  following: number;
}

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src={user.profilePicture}
          alt={user.name}
          width={128}
          height={128}
          className="rounded-full mb-4 sm:mb-0 sm:mr-6"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.username}</p>
          <p className="mt-2">{user.bio}</p>
          <div className="mt-4 flex justify-center sm:justify-start space-x-4">
            <span className="text-gray-600">
              <strong>{user.followers}</strong> Followers
            </span>
            <span className="text-gray-600">
              <strong>{user.following}</strong> Following
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
