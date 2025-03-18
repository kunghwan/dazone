import { MY } from "../contextApi";
import AuthPage from "./Auth.page";
import MyBasicInfo from "./MyBasicInfo";
import MyPassword from "./MyPassword";
import MyTab from "./MyTab";

const MyAccount = () => {
  const { target, user } = MY.store(); // user 상태와 target 값을 받아옴

  // 로그인 여부에 따라 다른 화면을 표시
  return !user ? (
    <AuthPage />
  ) : (
    <div
      className="flex mx-auto max-w-300"
      style={{
        height: "calc(100vh - 61px)", // 높이를 화면 크기에 맞게 조정
      }}
    >
      <MyTab />
      <main className="border m-5 flex-1">
        {/* target 값에 따라 다른 컴포넌트를 렌더링 */}
        {target === "기본정보" && <MyBasicInfo {...user} />}
        {target === "비밀번호 변경" && <MyPassword {...user} />}
      </main>
    </div>
  );
};

export default MyAccount;
