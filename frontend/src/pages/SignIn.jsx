/* eslint-disable react/no-unescaped-entities */
import { Link ,useNavigate } from "react-router-dom";
import { Button, Label, TextInput,Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import axios from "axios"

const SignIn = () => {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({});
  const [erorrMessage,seterorrMessage] = useState(null)
  const[loading,setloading]=useState(false);
  

  const handleChange = (e) => {
   
setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
console.log(formData)
  };


  const handleSubmit = async(e)=>{
   e.preventDefault()


   if(!formData.username ||  !formData.password){
    return seterorrMessage('please fill out all fields');
   }


   try {
    setloading(true)
    seterorrMessage(null)
    const data = await axios.post("http://localhost:3000/api/auth/signin",formData).then(res=>console.log(res.data))
    console.log(data)
      setloading(false)
      navigate('/')

   }catch(error){
    seterorrMessage(error.message)
   }
   
  
  }

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          {" "}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Kishi's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5"></p>
        </div>
        <div className="flex-1">
          <from className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput
                id="username"
                name="username"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                id="password"
                name="password"
                placeholder="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" onClick={handleSubmit} disabled={loading}>
              {
                loading ?(<>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ):("Sign In")
              }
            </Button>
          </from>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an acoount?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
            {
              erorrMessage && (
                <Alert className='mt-5' color='failure'>{erorrMessage}</Alert>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
