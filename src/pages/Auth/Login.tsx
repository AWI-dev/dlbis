import { Button, Card, CardBody, Input } from "@nextui-org/react";
import imageOnRight from "../../assets/Images/imageOnRight.jpg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useFieldValidator from "../../hooks/useFieldValidator";
import useApiFetch from "../../hooks/useApiRequest";
import useToast from "../../hooks/useToast";
import useCookie from "../../hooks/useCookie";
import useEncryption from "../../hooks/useEncryption";
import SHARED_KEY from "../../global/sharedKey";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  //#region Type
  type TAuth = {
    employee_id: string;
    password: string;
  };
  //#endregion
  const { encryptData  } = useEncryption(SHARED_KEY);
  const { setCookie } = useCookie();
  const { setLogin } = useLogin();
 

  const { validateField, errors } = useFieldValidator();
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
    const isEmployeeIdValid = validateField(
      "employee id",
      formData.employee_id
    );
    const isPasswordValid = validateField("password", formData.password);
    if (!isEmployeeIdValid || !isPasswordValid) return;
    setIsLoading(true);
    useApiFetch(
      '',
      "login",
      formData,
      "POST"
    ).then((res: any) => {
      if (res?.success) {
        showToast(res?.success?.message, "success");
        navigate("/dashboard");
        const onLogin = setLogin(
        [
          {"url" : "http://127.0.0.1:8000/api/v1/", "system": "scm"},
          // {"url" : "https://mos-api-test.onemarygrace.com/api/v1/", "system": "scm"}
        ],
        {
          "employee_id": formData.employee_id,
          "position" : res.success.data.employment_details.position_id,
          "prefix" : res.success.data.user_details.prefix,
          "first_name" : res.success.data.user_details.first_name,
          "middle_name" : res.success.data.user_details.middle_name,
          "last_name" : res.success.data.user_details.last_name,
          "suffix" : res.success.data.user_details.suffix,
          "user_access" : ''
        });
     
        if(onLogin){
          setCookie("omg", encryptData(res.success.data.token));
          setCookie("user_details", encryptData(JSON.stringify(res.success.data)));
        }
      } else {
        showToast(res?.error?.message, "error");
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
                System Ni Daddy!~
              </div>
              <Card radius="sm" fullWidth>
                <CardBody className="p-10 w-full py-10">
                  <div className="font-body text-xl font-bold text-start mb-10">
                    Welcome Back Daddy!
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="font-body flex flex-col gap-y-5">
                    <Input
                      autoComplete="false"
                      autoFocus
                      size="md"
                      type="text"
                      label="Employee ID"
                      isRequired
                      isInvalid={!!errors.employee_id}
                      errorMessage={errors.employee_id}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setFormData({
                            ...formData,
                            employee_id: value,
                          });
                          validateField("employee_id", value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
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
                        isInvalid={!!errors.password}
                        errorMessage={errors.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                          validateField("password", e.target.value);
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
                © Copyright 2023. DLBIS. All rights reserved.
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
