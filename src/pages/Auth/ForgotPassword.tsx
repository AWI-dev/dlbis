import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import imageOnRight from "../../assets/Images/imageOnRight.jpg";
// import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import useFieldValidator from "../../hooks/useFieldValidator";
import useCrud from "../../hooks/CrudHooks/useCrud";

export default function ForgotPassword() {
  //#region Type
  type TForm = {
    type: string;
    route: string;
    email: string;
    phone_number: number | null;
  };
  //#endregion

  //#region useState
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TForm>({
    type: "reset",
    route: "password/reset",
    email: "",
    phone_number: null,
  });

  //#endregion
  //#region  Hooks

  const { POST } = useCrud();
  const { validateField, errors } = useFieldValidator();
  const navigate = useNavigate();

  //#endregion

  //#region Functions

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const isEmailValid = validateField("email", formData.email);
    if (!isEmailValid) return;

    setIsLoading(true);
    POST("password/forgot", formData).then(() => {
    setIsLoading(false);
    navigate(`/password/forgot/${formData.email}/success`);
    });
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
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="font-body text-xl font-bold text-start mb-2">
                      Forgot Password?
                    </div>
                    <div className="font-body text-sm text-justify mb-5">
                      To assist you in recovering your password, enter your
                      active email address or phone number, and the system will
                      send you a link to reset your password.
                    </div>
                    <div className="font-body flex flex-col gap-y-5">
                      <Input
                        autoFocus
                        isRequired
                        label="Email Address"
                        type="email"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                        onChange={(e: any) => {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            email: e.target.value,
                          }));
                        }}
                        className="w-full"
                        classNames={{
                          inputWrapper: "pr-0",
                        }}
                      />
                    </div>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      className="bg-customPrimary text-white py-6"
                    >
                      Send
                    </Button>
                    <Link
                      to="/"
                      className="mt-6 flex justify-center items-center text-sm font-body text-primary"
                    >
                      <ChevronLeft size={20} className="text-primary" /> Back to
                      Login
                    </Link>
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
