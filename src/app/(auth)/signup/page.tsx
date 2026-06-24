"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TextField,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dummy submit
    router.push("/dashboard");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center p-5">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xl">
            H
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-wide text-slate-900">
              HACKSPRINT
            </h1>
            <p className="text-sm text-slate-500">
              Hackathon Management Platform
            </p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] lg:w-[30%] flex flex-col gap-3 p-4  rounded-lg"
      >
        <h1 className="text-2xl font-semibold">Create Account</h1>

        <TextField
          label="Full Name"
          variant="standard"
          size="small"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          fullWidth
          slotProps={{
            input: {
              className: "text-sm",
            },
            inputLabel: {
              className: "text-sm",
            },
            formHelperText: {
              className: "text-sm",
            },
          }}
        />

        <TextField
          label="Email"
          variant="standard"
          type="email"
          size="small"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fullWidth
          slotProps={{
            input: {
              className: "text-sm",
            },
            inputLabel: {
              className: "text-sm",
            },
            formHelperText: {
              className: "text-sm",
            },
          }}
        />

        <TextField
          label="Mobile Number"
          variant="standard"
          size="small"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          fullWidth
          slotProps={{
            input: {
              className: "text-sm",
            },
            inputLabel: {
              className: "text-sm",
            },
            formHelperText: {
              className: "text-sm",
            },
          }}
        />

        <FormControl variant="standard" fullWidth>
          <InputLabel>Password</InputLabel>

          <Input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField
          size="small"
          label="Confirm Password"
          variant="standard"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
          fullWidth
          slotProps={{
            input: {
              className: "text-sm",
            },
            inputLabel: {
              className: "text-sm",
            },
            formHelperText: {
              className: "text-sm",
            },
          }}
        />

        <button
          type="submit"
          className="bg-black text-md cursor-pointer text-white py-2.5 mt-5 rounded-md"
        >
          Register
        </button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-sm hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
