"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);

    // Dummy redirect
    router.push("/dashboard");
  };

  return (
    <div className="bg-white flex flex-col min-h-screen justify-center items-center p-5">
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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full md:w-[70%] lg:w-[30%] rounded-lg p-8 "
      >
        <h1 className="text-xl font-semibold">Login</h1>

        <TextField
          label="User Name"
          variant="standard"
          fullWidth
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
          slotProps={{
            input: {
              className: "text-xs",
            },
            inputLabel: {
              className: "text-xs",
            },
            formHelperText: {
              className: "text-xs",
            },
          }}
        />

        <FormControl variant="standard" fullWidth error={!!errors.password}>
          <InputLabel className="text-xs">Password</InputLabel>

          <Input
            className="text-sm"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdVisibilityOff size={18} />
                  ) : (
                    <MdVisibility size={18} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          <FormHelperText className="text-sm">
            {errors.password?.message}
          </FormHelperText>
        </FormControl>

        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <label className="text-sm">Remember me</label>
        </div>

        <button
          type="submit"
          className="bg-black text-md text-white cursor-pointer py-2.5 rounded-md hover:opacity-90 transition"
        >
          Login
        </button>

        <Link
          href="/reset-password"
          className="text-center text-sm cursor-pointer hover:text-gray-500"
        >
          Reset Password
        </Link>

        <div className="flex items-center w-full">
          {" "}
          <div className="grow border-b border-gray-300"></div>{" "}
          <span className="mx-2 text-gray-500">Or</span>{" "}
          <div className="grow border-b border-gray-300"></div>{" "}
        </div>
        <Link
          href="/signup"
          className="bg-black text-md text-white py-2.5 cursor-pointer rounded-md text-center hover:opacity-90 transition"
        >
          Register
        </Link>

        <div className="mt-4 text-center text-sm">© 2026 Your Company</div>
      </form>
    </div>
  );
};

export default Login;
