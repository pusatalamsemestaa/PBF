import { useRouter } from "next/router";

const EditProfile = () => {
  //const Router = useRouter();
  //console.log(Router); 
  const { query } = useRouter();
    return (
    <div>
      <h1>Ubah profile </h1>
        <p>Nama: {query.id}</p>
    </div>
  );
};

export default EditProfile;
