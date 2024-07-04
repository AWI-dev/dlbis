
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import UserLogoMale from "../../assets/Images/avatars/avatar_male.jpg";
import UserLogoFemale from "../../assets/Images/avatars/avatar_female.jpg";
import useCookie from "../../hooks/useCookie";
import { useNavigate } from "react-router-dom";
import useDecryptedUserData from "../../hooks/useDecryptedUserData";


export default function DropdownUser() {
  const userData = useDecryptedUserData();

  const { deleteCookie } = useCookie();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    const cookies: string[] = [
      "omg", 
      "ros", 
      "user_details", 
    ];
  
    cookies.forEach(cookie => deleteCookie(cookie));
    navigate("/");
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: false,
              src: userData("gender") == 'Male' ? UserLogoMale : UserLogoFemale,
            }}
            className="transition-transform"
            // description="Job Title"
            name={userData("first_name")} 
          />
        </DropdownTrigger>
        <DropdownMenu className="font-body" aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-medium">Signed in as</p>
            <p className="font-bold">{`${userData("prefix") ?? ''} ${userData("first_name")} ${userData("middle_name")} ${userData("last_name")} ${userData("suffix") ?? ''}`}</p>
          </DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger"
          onClick={() =>handleLogout() }>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
