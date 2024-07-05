import { Button, Card, CardBody, Input } from "@nextui-org/react";
import imageOnRight from "../../assets/Images/imageOnRight.jpg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useToast from "../../hooks/useToast";
import useCookie from "../../hooks/useCookie";
import useEncryption from "../../hooks/useEncryption";
import SHARED_KEY from "../../global/sharedKey";
import useCrud from "../../hooks/CrudHooks/useCrud";

export default function Login() {
  const endpoint = "login";
  //#region Type
  type TAuth = {
    employee_id: string;
    password: string;
  };
  //#endregion
  const { POST } = useCrud();
  const { encryptData } = useEncryption(SHARED_KEY);
  const { setCookie } = useCookie();
  const showToast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<TAuth>({
    employee_id: "",
    password: "",
  });
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await POST(endpoint, formData).then((res: any) => {
      console.log('res', res);
      if (res?.token) {
        showToast(res?.success?.message, "success");
        navigate("/dashboard");
        setCookie("rrf", encryptData(res.token));
        setCookie(
          "user_details",
          encryptData(JSON.stringify(res.employee_details))
        );
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="xl:flex">
        <div className="basis-7/12">
          <div className="flex h-screen max-h-screen items-center justify-center">
            <div className="flex flex-col items-center w-96 md:w-[48%]">
              <div className="text-customPrimary text-3xl 3xl:text-5xl font-bold font-header mt-2 mb-10">
                Requisition Recovery System
              </div>
              <Card radius="sm" fullWidth>
                <CardBody className="p-10 w-full py-10">
            
                  <form onSubmit={handleSubmit}>
                    <div className="font-body flex flex-col gap-y-5">
                      <Input
                        autoComplete="false"
                        autoFocus
                        size="md"
                        type="text"
                        label="Employee ID"
                        isRequired
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setFormData({
                              ...formData,
                              employee_id: value,
                            });
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                              "Tab",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      <Input
                        isRequired
                        autoComplete="false"
                        label="Password"
                        endContent={
                          <button
                            tabIndex={0}
                            className="my-2"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                      />
                      <div className="flex justify-end">
                        <Link
                          to="/password/forgot"
                          className="text-primary text-sm"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Button
                        isLoading={isLoading}
                        type="submit"
                        className="bg-customPrimary text-white py-6"
                      >
                        Sign In
                      </Button>
                    </div>
                  </form>
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
            <div className="absolute top-0 left-0 w-full h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
