import { useEffect, useState } from "react";
import { Button, Card, CardBody, Checkbox, Input } from "@nextui-org/react";
import imageOnRight from "../../assets/Images/imageOnRight.jpg";
// import logo from "../../assets/img/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../../hooks/CrudHooks/useCrud";

export default function CreatePassword() {
  //#region Type
  type TForm = {
    employee_id: string;
    password: string;
    password_confirmation: string;
  };
  //#endregion

  //#region Hooks
  const params = useParams();
  const navigate = useNavigate();
  const { GET, POST } = useCrud();
  //#endregion

  //#region useState
  const [isLengthValidState, setIsLengthValidState] = useState<boolean>(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCombinationValidState, setIsCombinationValidState] =
    useState<boolean>(false);
  const [isNumericValidState, setIsNumericValidState] =
    useState<boolean>(false);
  const [isPasswordMatchValidState, setIsPasswordMatchValidState] =
    useState<boolean>(false);

  const [type, setType] = useState("");

  const [formData, setFormData] = useState<TForm>({
    employee_id: "",
    password: "",
    password_confirmation: "",
  });
  //#endregion

  //#region Functions

  const validatePassword = (password: string): [boolean, boolean, boolean] => {
    const hasValidLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return [hasValidLength, hasUppercase && hasLowercase, hasNumber];
  };

  const handleNewPasswordChange = (e: any) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: value,
    }));
    const [isLengthValid, isCombinationValid, isNumericValid] =
      validatePassword(value);
    setIsLengthValidState(isLengthValid);
    setIsCombinationValidState(isCombinationValid);
    setIsNumericValidState(isNumericValid);
    const hasMatch = formData.password_confirmation === value;
    setIsPasswordMatchValidState(hasMatch);
  };

  const handleConfirmPasswordChange = (e: any) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password_confirmation: value,
    }));
    const hasMatch = formData.password === value;
    setIsPasswordMatchValidState(hasMatch);
  };

  const handleCheckToken = async () => {
    try {
      const res = await GET(`signed-url/check/${params.token}`, "");
      if (!res) {
        return navigate("/");
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        employee_id: res?.employee_id,
      }));
    } catch (error) {
      console.error("Error checking token:", error);
      navigate("/");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    POST("password/reset", formData).then(() => {
      setIsLoading(false);
      navigate("/");
    });
  };
  //#endregion

  useEffect(() => {
    if (!params.token) return navigate("/");
    const splitToken = params.token.split("|");
    setType(splitToken[0]);
    handleCheckToken();
  }, []);

  return (
    <>
      <div className="xl:flex">
        <div className="basis-7/12">
          <div className="flex h-screen max-h-screen items-center justify-center">
            <div className="flex flex-col items-center w-96 md:w-[48%]">
              {/* <img src={logo} className="2xs:w-16 sm:w-20 lg:w-10 3xl:w-24" /> */}
              <div className="text-customPrimary text-3xl 3xl:text-5xl font-bold font-header mt-2 mb-10">
               System Ni Daddy!~
              </div>
              <Card radius="sm" fullWidth>
                <CardBody className="p-10 w-full py-10">
                  <div className="font-body text-xl font-bold text-start ">
                    {type == "create" ? "Create " : "Reset "} Password
                  </div>
                  <div className="font-body text-sm text-justify my-2">
                    {type == "create"
                      ? `We're thrilled to have you on board. To enhance the security
                    of your account, you are required to change your password on
                    your first login.`
                      : ""}
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <p className="text-md font-medium">
                      Your new password must contain
                    </p>
                    <ul className="pl-4 ">
                      <li>
                        <Checkbox
                          classNames={{
                            label: `text-sm  ${
                              isLengthValidState
                                ? "text-black"
                                : "text-gray-500"
                            }`,
                          }}
                          isSelected={isLengthValidState}
                          isReadOnly={true}
                          radius="full"
                          color="success"
                        >
                          At least 6 characters long.
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          classNames={{
                            label: `text-sm  ${
                              isCombinationValidState
                                ? "text-black"
                                : "text-gray-500"
                            }`,
                          }}
                          isSelected={isCombinationValidState}
                          isReadOnly={true}
                          radius="full"
                          color="success"
                        >
                          A combination of uppercase and lowercase letters.
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          classNames={{
                            label: `text-sm  ${
                              isNumericValidState
                                ? "text-black"
                                : "text-gray-500"
                            }`,
                          }}
                          isSelected={isNumericValidState}
                          isReadOnly={true}
                          radius="full"
                          color="success"
                        >
                          At least one numerical digit (0-9).
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          classNames={{
                            label: `text-sm  ${
                              isPasswordMatchValidState
                                ? "text-black"
                                : "text-gray-500"
                            }`,
                          }}
                          isSelected={isPasswordMatchValidState}
                          isReadOnly={true}
                          radius="full"
                          color="success"
                        >
                          New and confirmed password must be identical.
                        </Checkbox>
                      </li>
                    </ul>
                  </div>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                      autoFocus
                      isRequired
                      label="New Password"
                      endContent={
                        <button
                          tabIndex={-1}
                          className="my-2"
                          type="button"
                          onClick={() => setIsNewVisible(!isNewVisible)}
                        >
                          {isNewVisible ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      }
                      type={isNewVisible ? "text" : "password"}
                      onChange={(e) => {
                        handleNewPasswordChange(e);
                      }}
                    />
                    <Input
                      isRequired
                      label="Confirm Password"
                      endContent={
                        <button
                          tabIndex={-1}
                          className="my-2"
                          type="button"
                          onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                        >
                          {isConfirmVisible ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      }
                      type={isConfirmVisible ? "text" : "password"}
                      onChange={(e) => {
                        handleConfirmPasswordChange(e);
                      }}
                    />
                    <Button
                      isDisabled={
                        !isLengthValidState ||
                        !isCombinationValidState ||
                        !isNumericValidState ||
                        !isPasswordMatchValidState
                      }
                      isLoading={isLoading}
                      type="submit"
                      className="bg-customPrimary text-white py-6"
                    >
                      Set New Password
                    </Button>
                  </form>
                </CardBody>
              </Card>
              <div className="text-sm text-gray-400 italic mt-10 font-header">
                © Copyright 2024. Mary Grace Foods Inc. All rights reserved.
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
