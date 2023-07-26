'use client'

import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const accessToken = router.query.access_token;

  // Use the accessToken in your profile page
  // ...

  return(
    <p>{accessToken}</p>
  );
};

export default Profile;
