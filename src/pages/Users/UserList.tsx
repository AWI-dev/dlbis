import Breadcrumb from '../../components/common/Breadcrumb'

function UserList() {
  return (
    <div>
        <Breadcrumb
            pageName="User List"
            items={[{ name: "Dashboard", path: "../dashboard" }, { name: "User List" }]}
          />
    </div>
  )
}

export default UserList