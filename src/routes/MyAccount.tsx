import { MY } from "../contextApi";
import AddProduct from "./AddProduct";
import AuthPage from "./Auth.page";
import MyBasicInfo from "./MyBasicInfo";
import MyPassword from "./MyPassword";
import MyProducts from "./MyProducts";
import MyTab from "./MyTab";

<<<<<<< HEAD
const MyAccount = ({ user }: { user: User | null }) => {
=======
const MyAccount = (user: User) => {
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d
  const { target } = MY.store();
  return !user ? (
    <AuthPage />
  ) : (
    <div
      className="flex max-w-300 mx-auto px-2.5"
      style={{
<<<<<<< HEAD
        minHeight: "calc(100vh - 61px)",
=======
        height: "calc(100vh - 61px)",
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d
      }}
    >
      <MyTab />
      <main className="m-5 flex-1">
        {
          {
            기본정보: <MyBasicInfo {...user} />,
            비밀번호변경: <MyPassword {...user} />,
<<<<<<< HEAD
            상품등록: <AddProduct {...user} />,
            나의상품: <MyProducts {...user} />,
=======
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d
          }[target]
        }
      </main>
    </div>
  );
};

export default MyAccount;
