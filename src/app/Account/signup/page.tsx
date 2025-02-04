/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import axios from "axios";
import { redirect } from "next/navigation";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";

export default function Home() {
const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const UploadUser= async function(data:any) {
        try {
          const  response = await  axios.post("http://localhost:3000/api/user/signup",data);
          console.log(response);
          if(response.status===200) redirect("/login")
         
        } catch (error:any) {
            console.log("unable to register",error.respone?error.response.data: error.message)
        }
      }  
  const onSubmit =(data:any)=>{
        UploadUser(data);
      console.log(data);
          }
       
    
  

      
return(
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    <div>
                        <h1 className="text-2xl font-Roboto Flex font-bold">Create a new account</h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-lg leading-6 space-y-4 text-black sm:text-lg sm:leading-7">

                            

                            {/* Username Input */}
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="username"
                                    {...register("username")}
                                    type="text"
                                    required
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 text-lg font-semibold"
                                    placeholder="Username"
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Username
                                </label>
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    required
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 text-lg font-semibold"
                                    placeholder="Email address"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Email Address
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="gender"
                                    {...register("gender")}
                                    type="text"
                                    required
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 text-lg font-semibold"
                                    placeholder="Gender"
                                />
                                <label
                                    htmlFor="gender"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Gender
                                </label>
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="password"
                                    {...register("password")}
                                    type="password"
                                    required
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                    placeholder="Password"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Password
                                </label>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="password_confirmation"
                                    {...register("password_conf")}
                                    type="password"
                                    required
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                    placeholder="Confirm Password"
                                />
                                <label
                                    htmlFor="password_confirmation"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Confirm Password
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="relative">
                                <button className="bg-[#00BA7C] text-white rounded-md px-2 py-1">Create account</button>
                            </div>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <div className="w-full flex justify-center mt-4">
                        <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48">
                                <title>Google-color</title>
                                <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                        <g id="Google" transform="translate(401.000000, 860.000000)">
                                            <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05"></path>
                                            <path d="M23.7136364,10.1333333 C27 .025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335"></path>
                                            <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853"></path>
                                            <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36. 3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//     <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
//         <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
//             Create a new account
//         </h2>
//         <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
//             Or
//             <a href="#" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
//                 login to your account
//             </a>
//         </p>
//     </div>

//     <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//         {/* <form onSubmit={handleSubmit(onSubmit )}>
//                 <div>
//                     <label htmlFor="name" className="block text-sm font-medium leading-5 text-black">Gender</label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                         <input
//                            placeholder="gender"
//                             type="text"
//                             required
//                            { ...register('gender')}
//                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-black "
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <label htmlFor="username" className="block text-sm font-medium leading-5 text-black">Username</label>
//                     <div className="mt-1 flex rounded-md shadow-sm">
                        
//                         <input
//                             id="username"
                           
//                             placeholder="john"
//                             type="text"
//                               {...register('username')}
//                             className="flex-1 border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <label htmlFor="email" className="block text-sm font-medium leading-5 text-black">Email address</label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                         <input
//                             id="email"
//                             placeholder="user@example.com"
//                             type="email"
//                             {...register('email')}
                           
//                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <label htmlFor="password" className="block text-sm font-medium leading-5 text-black">Password</label>
//                     <div className=" mt-1 rounded-md shadow-sm">
//                         <input
//                             id="password"
                           
//                             type="password"
//                             required
//                             {...register('password')}
//                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-black">Confirm Password</label>
//                     <div className="mt-1 rounded-md shadow-sm">
//                         <input
//                             id="password_confirmation"
                           
//                             type="password"
//                             required
//                             {...register('password conf')}
//                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <span className="block w-full rounded-md shadow-sm">
//                         <button
//                             type="submit"
//                             className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
//                         >
//                             Create account
//                         </button>
//                     </span>
//                 </div>
//             </form> */}
//         </div>
//     </div>
// </div>
)

}
  