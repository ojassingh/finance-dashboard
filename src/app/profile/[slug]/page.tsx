'use client'


function Profile({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}


export default Profile;