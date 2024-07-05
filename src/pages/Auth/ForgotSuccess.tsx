import { useEffect, useState } from "react";
import {  Card, CardBody } from "@nextui-org/react";
import imageOnRight from "../../assets/Images/imageOnRight.jpg";
// import logo from "../../assets/img/logo.png";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import useCrud from "../../hooks/CrudHooks/useCrud";
import useCookie from "../../hooks/useCookie";

export default function ForgotSuccess() {
  //#region  Hooks
  const { POST } = useCrud();
  const { setCookie, getCookie } = useCookie();
  const params = useParams();

  //#endregion
  //#region useState
  const formData = {
    type: "reset",
    route: "password/reset",
    email: params.email ?? "",
  };
  const [seconds, setSeconds] = useState(() => {
    const timer = getCookie("resendLink");
    return timer ? parseInt(timer, 10) : 0;
  });
  //#endregion
  //#region Functions
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          setCookie("resendLink", newSeconds);
          return newSeconds;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const handleResendLink = () => {
    POST("password/forgot", formData);
    const newTime = 240;
    setSeconds(newTime);
    setCookie("resendLink", newTime);
  };

  const formatTime = (totalSeconds: any) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  //#endregion
  return (
    <>
      <div className="xl:flex">
        <div className="basis-7/12">
          <div className="flex h-screen max-h-screen items-center justify-center">
            <div className="flex flex-col items-center w-96 md:w-[48%]">
              {/* <img src={logo} className="2xs:w-16 sm:w-20 lg:w-10 3xl:w-24" /> */}
              <div className="text-customPrimary text-3xl 3xl:text-5xl font-bold font-header mt-2 mb-10">
                Requisition Recovery System
              </div>
              <Card radius="sm" fullWidth>
                <CardBody className="p-10 w-full py-10">
                  <div className="font-body text-xl font-bold text-start mb-2">
                    Reset Link Sent
                  </div>
                  <div className="font-body text-sm text-justify mb-5">
                    A password reset link has been sent to the email address
                    associated with your account. Please check your inbox and
                    follow the instructions in the email to reset your password.
                  </div>
                  <div className="flex gap-1 justify-center">
                    <p className="text-sm">Didn’t receive email? </p>
                    {seconds == 0 ? (
                      <p
                        className="text-sm text-red-800 underline cursor-pointer"
                        onClick={() => handleResendLink()}
                      >
                        Resend link
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <p className="text-sm">Resend in :</p>
                        <p className="text-sm font-semibold text-gray-500">
                          {formatTime(seconds)}
                        </p>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/"
                    className="mt-6 flex justify-center items-center text-sm font-body text-primary"
                  >
                    <ChevronLeft size={20} className="text-primary" /> Back to
                    Login
                  </Link>
                </CardBody>
              </Card>
              <div className="text-sm text-gray-400 italic mt-10 font-header">
                © Copyright 2023. AWI Solutions. All rights reserved.
              </div>
            </div>
          </div>
        </div>
        <div className="basis-5/12 hidden xl:block">
          <div className="h-screen max-h-screen relative">
            <img src={imageOnRight} className="object-fill w-full h-full" />
            <div className="absolute top-0 left-0 w-full h-full "></div>
          </div>
        </div>
      </div>
    </>
  );
}
