import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

type SignUpForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function AuthPage() {
  const [tab, setTab] = React.useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [signIn, setSignIn] = React.useState<SignInForm>({
    email: "",
    password: "",
    remember: false,
  });

  const [signUp, setSignUp] = React.useState<SignUpForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SIGN IN:", signIn);
  };

  const onSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SIGN UP:", signUp);
  };

  return (
    // FIX: no scroll
    <div className="h-screen w-full bg-white">
      <div className="flex h-screen w-full">
        {/* LEFT (Burger) - hidden on mobile */}
        <div className="relative hidden flex-1 items-center justify-center md:flex">
          <img
            src="/images/common/burger.svg"
            alt="Burger"
            className="w-full object-contain"
            draggable={false}
          />
        </div>

        {/* RIGHT (Form) */}
        <div className="flex flex-1 items-center justify-center px-6 md:px-0">
          <div className="w-full max-w-md flex flex-col gap-4 md:gap-5 md:w-93.5">
            {/* Logo Row */}
            <div className="8 flex items-center gap-3 md:gap-3.75">
              <img
                src="/images/common/logo-foody.svg"
                alt="Foody"
                className="h-8 w-8 md:h-10.5 md:w-10.5"
                draggable={false}
              />
              <span className="text-[24.38px] md:text-[32px] md:leading-10.5 font-extrabold leading-8 text-neutral-950">
                Foody
              </span>
            </div>

            {/* Title + subtitle */}
            <div className="flex flex-col gap-0 md:gap-1">
              <h1 className="text-[24px] md:text-[28px] font-extrabold leading-9 md:leading-9.5 text-neutral-950">
                Welcome Back
              </h1>
              <p className=" text-[14px] md:text-[16px] leading-7 md:leading-7.5 -tracking-[0.03em] text-neutral-950">
                Good to see you again! Let’s eat
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="">
              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as "signin" | "signup")}
              >
                <TabsList className="h-14 w-full rounded-full bg-neutral-100 p-1">
                  <TabsTrigger
                    value="signin"
                    className="h-full w-1/2 rounded-full text-base font-semibold text-neutral-600 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm"
                  >
                    Sign in
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="h-full w-1/2 rounded-full text-base font-semibold text-neutral-600 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm"
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>

                {/* SIGN IN */}
                <TabsContent value="signin" className="mt-3">
                  <form
                    onSubmit={onSubmitSignIn}
                    className="flex flex-col gap-4 md:gap-5"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={signIn.email}
                      onChange={(e) =>
                        setSignIn((p) => ({ ...p, email: e.target.value }))
                      }
                      className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signIn.password}
                        onChange={(e) =>
                          setSignIn((p) => ({ ...p, password: e.target.value }))
                        }
                        className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 pr-14 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 active:scale-95"
                        aria-label="Toggle password visibility"
                      >
                        <img
                          src="/images/common/eye.svg"
                          alt="Show/Hide"
                          className="h-4 w-4"
                          draggable={false}
                        />
                      </button>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 select-none">
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={signIn.remember}
                          onChange={(e) =>
                            setSignIn((p) => ({
                              ...p,
                              remember: e.target.checked,
                            }))
                          }
                          className="peer h-6 w-6 appearance-none rounded-md border border-neutral-300 bg-white outline-none transition"
                        />
                        <span className="pointer-events-none absolute h-3 w-3 scale-0 rounded-[3px] bg-neutral-900 transition peer-checked:scale-100" />
                      </span>
                      <span className="text-[14px] leading-7 md:text-[16px] md:leading-7.5 -tracking-[0.03em] font-medium text-neutral-900">
                        Remember Me
                      </span>
                    </label>

                    <button
                      type="submit"
                      className=" h-12 w-full rounded-full px-2 py-2 bg-primary-100 text-[16px] leading-7.5 -tracking-[0.02em] font-bold text-neutral-25 shadow-[0_10px_20px_rgba(184,13,13,0.18)] transition active:scale-[0.99]"
                    >
                      Login
                    </button>
                  </form>
                </TabsContent>

                {/* SIGN UP */}
                <TabsContent value="signup" className="mt-3">
                  <form
                    onSubmit={onSubmitSignUp}
                    className="flex flex-col gap-4 md:gap-5"
                  >
                    {/* FIX: add Name + Number Phone */}
                    <input
                      type="text"
                      placeholder="Name"
                      value={signUp.name}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, name: e.target.value }))
                      }
                      className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={signUp.email}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, email: e.target.value }))
                      }
                      className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                    />

                    <input
                      type="tel"
                      placeholder="Number Phone"
                      value={signUp.phone}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signUp.password}
                        onChange={(e) =>
                          setSignUp((p) => ({ ...p, password: e.target.value }))
                        }
                        className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 pr-14 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 active:scale-95"
                        aria-label="Toggle password visibility"
                      >
                        <img
                          src="/images/common/eye.svg"
                          alt="Show/Hide"
                          className="h-5 w-5 opacity-80"
                          draggable={false}
                        />
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={signUp.confirmPassword}
                        onChange={(e) =>
                          setSignUp((p) => ({
                            ...p,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className="h-12 md:h-14 w-full rounded-2xl border border-neutral-200 bg-white px-3 pr-14 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] focus:border-neutral-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 active:scale-95"
                        aria-label="Toggle confirm password visibility"
                      >
                        <img
                          src="/images/common/eye.svg"
                          alt="Show/Hide"
                          className="h-5 w-5 opacity-80"
                          draggable={false}
                        />
                      </button>
                    </div>

                    {/* FIX: button label like design */}
                    <button
                      type="submit"
                      className=" h-12 w-full rounded-full px-2 py-2 bg-primary-100 text-[16px] leading-7.5 -tracking-[0.02em] font-bold text-neutral-25 shadow-[0_10px_20px_rgba(184,13,13,0.18)] transition active:scale-[0.99]"
                    >
                      Register
                    </button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
