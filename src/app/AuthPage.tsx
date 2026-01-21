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
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* Logo Row */}
            <div className="mb-8 flex items-center gap-3">
              <img
                src="/images/common/logo-foody.svg"
                alt="Foody"
                className="h-10 w-10"
                draggable={false}
              />
              <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
                Foody
              </span>
            </div>

            {/* Title + subtitle */}
            <h1 className="text-[40px] font-extrabold leading-[1.05] text-neutral-900">
              Welcome Back
            </h1>
            <p className="mt-3 text-lg text-neutral-700">
              Good to see you again! Let’s eat
            </p>

            {/* Toggle Tabs */}
            <div className="mt-7">
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
                <TabsContent value="signin" className="mt-6">
                  <form onSubmit={onSubmitSignIn} className="space-y-5">
                    <input
                      type="email"
                      placeholder="Email"
                      value={signIn.email}
                      onChange={(e) =>
                        setSignIn((p) => ({ ...p, email: e.target.value }))
                      }
                      className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signIn.password}
                        onChange={(e) =>
                          setSignIn((p) => ({ ...p, password: e.target.value }))
                        }
                        className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 pr-14 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
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
                      <span className="text-base text-neutral-900">
                        Remember Me
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="mt-2 h-14 w-full rounded-full bg-[#B80D0D] text-lg font-extrabold text-white shadow-[0_10px_20px_rgba(184,13,13,0.18)] transition active:scale-[0.99]"
                    >
                      Login
                    </button>
                  </form>
                </TabsContent>

                {/* SIGN UP */}
                <TabsContent value="signup" className="mt-6">
                  <form onSubmit={onSubmitSignUp} className="space-y-5">
                    {/* FIX: add Name + Number Phone */}
                    <input
                      type="text"
                      placeholder="Name"
                      value={signUp.name}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, name: e.target.value }))
                      }
                      className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={signUp.email}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, email: e.target.value }))
                      }
                      className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
                    />

                    <input
                      type="tel"
                      placeholder="Number Phone"
                      value={signUp.phone}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signUp.password}
                        onChange={(e) =>
                          setSignUp((p) => ({ ...p, password: e.target.value }))
                        }
                        className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 pr-14 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
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
                        className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 pr-14 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-300"
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
                      className="mt-2 h-14 w-full rounded-full bg-[#B80D0D] text-lg font-extrabold text-white shadow-[0_10px_20px_rgba(184,13,13,0.18)] transition active:scale-[0.99]"
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
