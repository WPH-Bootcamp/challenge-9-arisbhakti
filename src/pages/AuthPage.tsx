import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
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

type SignInErrors = {
  email?: string;
  password?: string;
  form?: string;
};

type SignUpErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = React.useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [signInLoading, setSignInLoading] = React.useState(false);
  const [signUpLoading, setSignUpLoading] = React.useState(false);
  const [signInErrors, setSignInErrors] = React.useState<SignInErrors>({});
  const [signUpErrors, setSignUpErrors] = React.useState<SignUpErrors>({});
  const [signInAnimate, setSignInAnimate] = React.useState(false);
  const [signUpAnimate, setSignUpAnimate] = React.useState(false);

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

  React.useEffect(() => {
    const stateTab = (location.state as { tab?: string } | null)?.tab;
    const searchTab = new URLSearchParams(location.search).get("tab");
    const nextTab = stateTab ?? searchTab;

    if (nextTab === "signin" || nextTab === "signup") {
      setTab(nextTab);
    }
  }, [location.search, location.state]);

  const triggerSignInAnimation = () => {
    setSignInAnimate(true);
    window.setTimeout(() => setSignInAnimate(false), 400);
  };

  const triggerSignUpAnimation = () => {
    setSignUpAnimate(true);
    window.setTimeout(() => setSignUpAnimate(false), 400);
  };

  const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as
        | { message?: string; errors?: string[] }
        | undefined;
      if (data?.errors?.length) return data.errors.join(", ");
      if (data?.message) return data.message;
    }
    return "Terjadi kesalahan. Coba lagi.";
  };

  const validateSignIn = (data: SignInForm) => {
    const next: SignInErrors = {};
    const email = data.email.trim();
    const password = data.password;

    if (!email) next.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Format email tidak valid.";

    if (!password) next.password = "Password wajib diisi.";
    else if (password.length < 6)
      next.password = "Password minimal 6 karakter.";

    return next;
  };

  const validateSignUp = (data: SignUpForm) => {
    const next: SignUpErrors = {};
    const name = data.name.trim();
    const email = data.email.trim();
    const phoneDigits = data.phone.replace(/\D/g, "");
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (!name) next.name = "Nama wajib diisi.";
    else if (name.length < 2) next.name = "Nama minimal 2 karakter.";

    if (!email) next.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Format email tidak valid.";

    if (!data.phone) next.phone = "Nomor telepon wajib diisi.";
    else if (phoneDigits.length < 8 || phoneDigits.length > 15)
      next.phone = "Nomor telepon harus 8-15 digit.";

    if (!password) next.password = "Password wajib diisi.";
    else if (password.length < 6)
      next.password = "Password minimal 6 karakter.";

    if (!confirmPassword)
      next.confirmPassword = "Konfirmasi password wajib diisi.";
    else if (confirmPassword !== password)
      next.confirmPassword = "Password tidak sama.";

    return next;
  };

  const onSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInErrors({});
    const errors = validateSignIn(signIn);
    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      triggerSignInAnimation();
      return;
    }

    try {
      setSignInLoading(true);
      const response = await api.post("/api/auth/login", {
        email: signIn.email.trim(),
        password: signIn.password,
      });

      const token = response.data?.data?.token;
      const user = response.data?.data?.user;

      if (token) {
        if (signIn.remember) {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("auth_user", JSON.stringify(user ?? {}));
          sessionStorage.removeItem("auth_token");
          sessionStorage.removeItem("auth_user");
        } else {
          sessionStorage.setItem("auth_token", token);
          sessionStorage.setItem("auth_user", JSON.stringify(user ?? {}));
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
        navigate("/");
      } else {
        setSignInErrors({ form: "Login gagal. Silakan coba lagi." });
        triggerSignInAnimation();
      }
    } catch (error) {
      setSignInErrors({ form: getErrorMessage(error) });
      triggerSignInAnimation();
    } finally {
      setSignInLoading(false);
    }
  };

  const onSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpErrors({});
    const errors = validateSignUp(signUp);
    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      triggerSignUpAnimation();
      return;
    }

    try {
      setSignUpLoading(true);
      const response = await api.post("/api/auth/register", {
        name: signUp.name.trim(),
        email: signUp.email.trim(),
        phone: signUp.phone.trim(),
        password: signUp.password,
      });

      const token = response.data?.data?.token;
      const user = response.data?.data?.user;

      if (token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user ?? {}));
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_user");
        navigate("/");
      } else {
        setSignUpErrors({ form: "Register gagal. Silakan coba lagi." });
        triggerSignUpAnimation();
      }
    } catch (error) {
      setSignUpErrors({ form: getErrorMessage(error) });
      triggerSignUpAnimation();
    } finally {
      setSignUpLoading(false);
    }
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
                onValueChange={(v) => {
                  setTab(v as "signin" | "signup");
                  setSignInErrors({});
                  setSignUpErrors({});
                }}
              >
                <TabsList className="h-14 w-full rounded-full bg-neutral-100 p-1 cursor-pointer">
                  <TabsTrigger
                    value="signin"
                    className="h-full w-1/2 rounded-full text-base font-semibold text-neutral-600 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm cursor-pointer"
                  >
                    Sign in
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="h-full w-1/2 rounded-full text-base font-semibold text-neutral-600 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm cursor-pointer"
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
                      className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                        signInErrors.email
                          ? "border-red-400 focus:border-red-400"
                          : "border-neutral-200 focus:border-neutral-300"
                      } ${signInAnimate && signInErrors.email ? "animate-shake" : ""}`}
                    />
                    {signInErrors.email ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signInAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signInErrors.email}
                      </p>
                    ) : null}

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signIn.password}
                        onChange={(e) =>
                          setSignIn((p) => ({ ...p, password: e.target.value }))
                        }
                        className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 pr-14 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                          signInErrors.password
                            ? "border-red-400 focus:border-red-400"
                            : "border-neutral-200 focus:border-neutral-300"
                        } ${
                          signInAnimate && signInErrors.password
                            ? "animate-shake"
                            : ""
                        }`}
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
                    {signInErrors.password ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signInAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signInErrors.password}
                      </p>
                    ) : null}

                    <label className="flex cursor-pointer items-center gap-3 select-none">
                      <Checkbox
                        checked={signIn.remember}
                        onCheckedChange={(checked) =>
                          setSignIn((p) => ({
                            ...p,
                            remember: Boolean(checked),
                          }))
                        }
                        className="h-6 w-6 rounded-md border-neutral-300 data-[state=checked]:bg-primary-100 data-[state=checked]:border-primary-100 cursor-pointer"
                      />
                      <span className="text-[14px] leading-7 md:text-[16px] md:leading-7.5 -tracking-[0.03em] font-medium text-neutral-900">
                        Remember Me
                      </span>
                    </label>

                    {signInErrors.form ? (
                      <p
                        className={`-mt-2 text-sm text-red-600 ${
                          signInAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signInErrors.form}
                      </p>
                    ) : null}

                    <Button
                      type="submit"
                      variant="destructive"
                      disabled={signInLoading}
                      className="
    h-12 w-full rounded-full px-2 py-2
    bg-primary-100
    text-[16px] leading-7.5 -tracking-[0.02em]
    font-bold text-neutral-25
    shadow-[0_10px_20px_rgba(184,13,13,0.18)]
    transition active:scale-[0.99]
    cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                    >
                      {signInLoading ? "Loading..." : "Login"}
                    </Button>
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
                      className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                        signUpErrors.name
                          ? "border-red-400 focus:border-red-400"
                          : "border-neutral-200 focus:border-neutral-300"
                      } ${signUpAnimate && signUpErrors.name ? "animate-shake" : ""}`}
                    />
                    {signUpErrors.name ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signUpAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signUpErrors.name}
                      </p>
                    ) : null}

                    <input
                      type="email"
                      placeholder="Email"
                      value={signUp.email}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, email: e.target.value }))
                      }
                      className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                        signUpErrors.email
                          ? "border-red-400 focus:border-red-400"
                          : "border-neutral-200 focus:border-neutral-300"
                      } ${signUpAnimate && signUpErrors.email ? "animate-shake" : ""}`}
                    />
                    {signUpErrors.email ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signUpAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signUpErrors.email}
                      </p>
                    ) : null}

                    <input
                      type="tel"
                      placeholder="Number Phone"
                      value={signUp.phone}
                      onChange={(e) =>
                        setSignUp((p) => ({ ...p, phone: e.target.value }))
                      }
                      className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                        signUpErrors.phone
                          ? "border-red-400 focus:border-red-400"
                          : "border-neutral-200 focus:border-neutral-300"
                      } ${signUpAnimate && signUpErrors.phone ? "animate-shake" : ""}`}
                    />
                    {signUpErrors.phone ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signUpAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signUpErrors.phone}
                      </p>
                    ) : null}

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signUp.password}
                        onChange={(e) =>
                          setSignUp((p) => ({ ...p, password: e.target.value }))
                        }
                        className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 pr-14 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                          signUpErrors.password
                            ? "border-red-400 focus:border-red-400"
                            : "border-neutral-200 focus:border-neutral-300"
                        } ${
                          signUpAnimate && signUpErrors.password
                            ? "animate-shake"
                            : ""
                        }`}
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
                    {signUpErrors.password ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signUpAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signUpErrors.password}
                      </p>
                    ) : null}

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
                        className={`h-12 md:h-14 w-full rounded-2xl border bg-white px-3 pr-14 text-base outline-none placeholder:text-neutral-500 placeholder:-tracking-[0.02em] ${
                          signUpErrors.confirmPassword
                            ? "border-red-400 focus:border-red-400"
                            : "border-neutral-200 focus:border-neutral-300"
                        } ${
                          signUpAnimate && signUpErrors.confirmPassword
                            ? "animate-shake"
                            : ""
                        }`}
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
                    {signUpErrors.confirmPassword ? (
                      <p
                        className={`-mt-3 text-xs text-red-600 ${
                          signUpAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signUpErrors.confirmPassword}
                      </p>
                    ) : null}

                    {/* FIX: button label like design */}
                    {signUpErrors.form ? (
                      <p
                        className={`-mt-2 text-sm text-red-600 ${
                          signUpAnimate ? "animate-shake" : ""
                        }`}
                      >
                        {signUpErrors.form}
                      </p>
                    ) : null}

                    <Button
                      type="submit"
                      variant="destructive"
                      disabled={signUpLoading}
                      className="
    h-12 w-full rounded-full px-2 py-2
    bg-primary-100
    text-[16px] leading-7.5 -tracking-[0.02em]
    font-bold text-neutral-25
    shadow-[0_10px_20px_rgba(184,13,13,0.18)]
    transition active:scale-[0.99]
    cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                    >
                      {signUpLoading ? "Loading..." : "Register"}
                    </Button>
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
