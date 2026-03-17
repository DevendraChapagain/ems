import { useState } from "react";

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex gap-20 mt-[80px]">
      <div className="bg-[#4C62B3] w-1/2 flex items-center justify-center text-white text-xl">
        EMS
      </div>
      <div className="border border-amber-50/10 px-8 py-12 w-1/2 rounded-2xl">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-left">Login to EMS</h1>
          <p className="text-left text-[14px]">
            Login to your personal account.
          </p>
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-col gap-7 w-full"
        >
          <div className="flex flex-col gap-2 w-full text-[#4C62B3] text-[10px] uppercase font-semibold">
            Email Address
            <input
           value={email}  onChange={(e)=>{setEmail(e.target.value)}}
              className="border border-amber-50/12 rounded-[0.5rem] px-4 py-3 text-[12px] placeholder:text-white/48 placeholder:text-normal focus:outline-none focus:ring-1 focus:ring-[#4C62B3] focus:border-[#4C62B3]"
              type="email"
              placeholder="Enter your Email"
            />
          </div>

          <div className="flex flex-col gap-2 w-full text-[#4C62B3] text-[10px] uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-[#4C62B3] focus:border-[#4C62B3]">
            Password
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}}
              className="border border-amber-50/12 rounded-[0.5rem] px-4 py-3 text-[12px] placeholder:text-white/48 placeholder:text-normal focus:outline-none focus:ring-1 focus:ring-[#4C62B3] focus:border-[#4C62B3]"
              type="password"
              placeholder="Enter your Password"
            />
          </div>

          <button className="w-full bg-[#4C62B3] text-white py-2 rounded-md mt-2 text-[16px]">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
