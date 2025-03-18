import { useCallback, useRef, useState, useTransition } from "react";
import { Form, TextInput, TextInputRef } from "../ui";
import { auth } from "../lib/firebase";
import Loading from "../shared/Loading";

const MyPassword = (user: User) => {
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const pwRef = useRef<TextInputRef>(null);
  const newRef = useRef<TextInputRef>(null);

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const onCheckPassword = useCallback(() =>
    startTransition(async () => {
      try {
        if (!user) {
          return alert("로그인하지 않았습니다");
        }
        const res = await auth.signInWithEmailAndPassword(user.email, password);
        if (!res.user || !res.user.uid) {
          return alert("비밀번호가 일치하지 않습니다");
        }

        setIsPasswordCorrect(true);

        await auth.currentUser?.updatePassword();
      } catch (error: any) {
        alert(error.message);
      }
    })
  );

  const onChangePassword = useCallback(
    () =>
      startTransition(async () => {
        try {
          if (!user) {
            return alert("로그인하지 않았습니다");
          }
          const res = await auth.signInWithEmailAndPassword(
            user.email,
            password
          );
          if (!res.user || !res.user.uid) {
            return alert("비밀번호가 일치하지 않습니다");
          }

          await auth.currentUser?.updatePassword();
          alert("비밀번호가 변경되었습니다");
          setIsPasswordCorrect(false);
          setPassword("");
          setNewPassword("");
        } catch (error: any) {
          alert(error.message);
        }
      }),
    [user, newPassword, password]
  );

  return (
    <div className="border h-full relative">
      {isPending && <Loading className="absolute h-full" />}
      {!isPasswordCorrect ? (
        <Form>
          <TextInput
            type="password"
            id="pw"
            label="현재 비밀번호"
            ref={pwRef}
            placeholder="********"
            onChangeText={setPassword}
          />
        </Form>
      ) : (
        <Form>
          <TextInput
            type="password"
            value={newPassword}
            label="새로운 비밀번호"
            onChangeText={setNewPassword}
            ref={newRef}
          />
        </Form>
      )}
    </div>
  );
};

export default MyPassword;
