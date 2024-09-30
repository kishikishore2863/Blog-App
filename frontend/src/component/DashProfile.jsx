import { useSelector } from "react-redux";
import {TextInput,Button} from "flowbite-react"
import { useEffect, useState } from "react";
import { useRef } from "react"
import {getDownloadURL, getStorage, uploadBytesResumable,ref}from 'firebase/storage'
import {app} from"../firebase"


const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile,setImageFile]=useState(null);
  const[imageFileUrl,setImageFileUrl]=useState(null);
  const filePickerRef =useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
 



  

  const handleImageChange=(e)=>{
  // setImageFile(e.traget?.files[0]);
  const file =e.target.files[0];
  console.log(file)
  if(file){
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file))

  }
  }
  console.log(imageFile,imageFileUrl)


useEffect(()=>{
  if(imageFile){
   uploadImage()
  }
},[imageFile])


const uploadImage =async()=>{

  console.log("uploadImage...")
  const storage =getStorage(app);
  const fileName = new Date().getTime()+imageFile.name;
  const storageRef=ref(storage,fileName);
  const uploadTask =uploadBytesResumable(storageRef,imageFile)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setImageFileUploadProgress(progress.toFixed(0));
    },
    (error) => {
      setImageFileUploadError(
        'Could not upload image (File must be less than 2MB)'
      );
      setImageFileUploadProgress('could not upload image (file must be less than 2MB)');
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false);
      console.log(error)
    },
     () => {
      
       getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL)=>{
        setImageFile(DownloadURL)
       })

      })
    }
  




  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>

      <form action="" className="flex flex-col gap-4 ">
        <input type='file' accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="self-center cursor-pointer shadow-md overflow-hidden w-32 h-32 rounded-full" onClick={()=>{filePickerRef.current.click()}}>
          <img
            src={currentUser.profilepicture || imageFileUrl}
            alt="user"
            className="w-32 h-32 rounded-full w-full h-full object-cover border-8 shadow-md border-[lightgray]"
          />
        </div>
        <TextInput type='text' id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput type='email' id="email" placeholder="email" defaultValue={currentUser.email} />
        <TextInput type='password' id="password" placeholder="password"  />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline >Update</Button>
      </form>
      <div className=" text-red-600 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out </span>
      </div>
    </div>
  );
};

export default DashProfile;







// import { useSelector } from "react-redux";
// import { TextInput, Button, Alert } from "flowbite-react";
// import { useEffect, useState, useRef } from "react";
// import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import {app} from "../firebase";

// const DashProfile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const filePickerRef = useRef();
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);
//   const [imageFileUploading, setImageFileUploading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         setImageFileUploadError('File size must be less than 2MB');
//         return;
//       }
//       if (!file.type.startsWith('image/')) {
//         setImageFileUploadError('File must be an image');
//         return;
//       }
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
//   };

//   useEffect(() => {
//     if (imageFile) {
//       uploadImage();
//     }
//   }, [imageFile]);

//   const uploadImage = async () => {
//     setImageFileUploading(true);
//     setImageFileUploadError(null);
//     const auth = getAuth(app);
//     const storage = getStorage(app);

//     try {
//       if (!auth.currentUser) {
//         throw new Error('User not authenticated');
//       }

//       const fileName = `profile_pictures/${auth.currentUser.uid}/${Date.now()}_${imageFile.name}`;
//       const storageRef = ref(storage, fileName);

//       const uploadTask = uploadBytesResumable(storageRef, imageFile);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageFileUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           console.error("Upload error:", error);
//           setImageFileUploadError('Could not upload image. Please try again.');
//           setImageFileUploadProgress(null);
//           setImageFileUploading(false);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             setImageFileUrl(downloadURL);
//             setImageFileUploading(false);
//             console.log("File uploaded successfully. Download URL:", downloadURL);
//           } catch (error) {
//             console.error("Error getting download URL:", error);
//             setImageFileUploadError('Error getting image URL. Please try again.');
//             setImageFileUploading(false);
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Error starting upload:", error);
//       setImageFileUploadError(error.message || 'Error starting upload. Please try again.');
//       setImageFileUploading(false);
//     }
//   };

//   // ... rest of your component code

//   return (
//     <div className="max-w-lg mx-auto p-3 w-full">
//       <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
//       <form className="flex flex-col gap-4">
//         <input type='file' accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
//         <div className="relative self-center cursor-pointer shadow-md overflow-hidden w-32 h-32 rounded-full" onClick={() => filePickerRef.current.click()}>
//           <img
//             src={imageFileUrl || currentUser.profilePicture}
//             alt="user"
//             className="w-full h-full object-cover border-8 border-[lightgray]"
//           />
//           {imageFileUploadProgress && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
//               {imageFileUploadProgress}%
//             </div>
//           )}
//         </div>
//         {imageFileUploadError && (
//           <Alert color="failure">{imageFileUploadError}</Alert>
//         )}
//         {/* ... other form fields ... */}
//       </form>
//     </div>
//   );
// };

// export default DashProfile;









