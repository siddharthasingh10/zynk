import React from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'sonner'

const Signup = () => {
    const [input,setInput]=useState({
        username:'',
        email:'',
        password:''
    })
    const [loading,setLoading]=useState(false)

    const  changeEventHandler=async(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const signupHandler = async (e) => {
        e.preventDefault(); // Move to the top
      
        try {
            setLoading(true)
          console.log(input);
      
          const res = await axios.post(
            'http://localhost:5000/api/v1/user/register', // ✅ Corrected API URL
            input,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
      
          if (res.data?.success) {
            toast.success(res.data.message);
            setInput({
                username:'',
                email:'',
                password:''
            })

          }
        } catch (error) {
          console.error("Signup error:", error);
      
          // Handle different error cases properly
          toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }finally{
            setLoading(false)
        }
      };
      
    return (

        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>ZYNK</h1>
                    <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='font-medium'>Username</span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}

                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        placeholder=""
                        value={input.password}
                        onChange={changeEventHandler}


                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <Button type='submit' >Create</Button>
                {/* <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span> */}
            </form>
        </div>

    )
}

export default Signup