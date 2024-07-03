
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import UserLogo from "../../assets/Images/avatar_male.jpg";

export default function DropdownUser() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start" >
        <DropdownTrigger >
          <User
            as="button"
            avatarProps={{
              className:"ring-customPrimary ring-2",
              isBordered: true,
              src:  UserLogo ,
            }}
            className="transition-transform "
            description="Software Engineer"
            name="Juan Miguel"
          />
        </DropdownTrigger>
        <DropdownMenu className="font-body " aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-medium">Signed in as</p>
            <p className="font-bold">Juan Miguel Garcia</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
