/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  const navigate = useNavigate();
  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror(null);
    try {
      setloading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterror(data.message);
        return;
      }
      setloading(false);
      navigate("/");
    } catch (e) {
      setloading(false);
      seterror(e.message);
    }
  };
  console.log(error);
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
       
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handlechange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading.." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-4 mt-5 ">
        <p> Don't Have an Account?</p>
        <Link to={"/sign-up"}>
          <span className="text-red-600">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
