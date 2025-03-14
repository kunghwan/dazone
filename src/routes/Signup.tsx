import { useCallback, useRef, useState } from "react";
import { Form, TextInput, TextInputRef } from "../ui";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [randomNumber, setRandomNumber] = useState("");

  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const confirmPasswordRef = useRef<TextInputRef>(null);
  const nameRef = useRef<TextInputRef>(null);
  const verificationCodeRef = useRef<TextInputRef>(null);

  const [isVerifying, setIsVerifying] = useState(false);

  // 랜덤 인증번호 생성
  const makeRandomNumber = useCallback(() => {
    const number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return number.toString(); // 숫자 반환
  }, []);

  const generateVerificationCode = useCallback(() => {
    const code = makeRandomNumber();
    setRandomNumber(code); // 랜덤 번호 저장
    console.log("Generated code:", code);
  }, [makeRandomNumber]);

  const onSubmit = useCallback(() => {
    // 인증을 위한 코드 생성 및 제출 로직
    if (!isVerifying) {
      // 입력값 유효성 검사
      if (name.trim() === "") {
        alert("이름을 확인해주세요.");
        return nameRef.current?.focus();
      }

      if (email.trim() === "") {
        alert("이메일을 확인해주세요.");
        return emailRef.current?.focus();
      }

      if (password.trim() === "") {
        alert("비밀번호를 확인해주세요.");
        return passwordRef.current?.focus();
      }

      if (confirmPassword.trim() === "") {
        alert("비밀번호 확인을 해주세요.");
        return confirmPasswordRef.current?.focus();
      }

      if (password !== confirmPassword) {
        return alert("비밀번호가 일치하지 않습니다.");
      }

      // 인증번호 생성 후 인증 화면으로 전환
      generateVerificationCode();
      setIsVerifying(true);
      return verificationCodeRef.current?.focus();
    }

    // 인증 코드 확인
    if (verificationCode === randomNumber) {
      alert("회원가입이 완료되었습니다.");
      // 여기서 회원가입 로직을 추가할 수 있습니다.
    } else {
      alert("잘못된 인증번호입니다.");
    }
  }, [
    isVerifying,
    name,
    email,
    password,
    confirmPassword,
    verificationCode,
    randomNumber,
    generateVerificationCode,
  ]);

  return (
    <div className="max-w-100 p-5 mt-5 mx-auto border dark:bg-darkBorder border-border rounded">
      <Form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">
          {!isVerifying ? "회원가입" : "인증하기"}
        </h1>
        {!isVerifying ? (
          <>
            <TextInput
              id="name"
              label="이름"
              onChangeText={setName}
              ref={nameRef}
              value={name}
              placeholder="홍길동"
            />
            <TextInput
              id="email"
              label="이메일"
              onChangeText={setEmail}
              ref={emailRef}
              value={email}
              placeholder="example@domain.com"
            />
            <TextInput
              id="password"
              label="비밀번호"
              onChangeText={setPassword}
              ref={passwordRef}
              value={password}
              placeholder="비밀번호 입력"
              type="password"
            />
            <TextInput
              id="confirmPassword"
              label="비밀번호 확인"
              onChangeText={setConfirmPassword}
              ref={confirmPasswordRef}
              value={confirmPassword}
              placeholder="비밀번호 확인"
              type="password"
            />
          </>
        ) : (
          <>
            <TextInput
              id="verificationCode"
              label="인증번호"
              onChangeText={setVerificationCode}
              ref={verificationCodeRef}
              value={verificationCode}
              placeholder="인증번호 입력"
            />
          </>
        )}
        <button className="btn">{isVerifying ? "회원가입" : "인증하기"}</button>

        {isVerifying && (
          <button
            type="button"
            className="btn border"
            onClick={generateVerificationCode}
          >
            RE-SEND
          </button>
        )}

        {randomNumber.length > 0 && !isVerifying && (
          <p className="opacity-10">{randomNumber}</p>
        )}
      </Form>
    </div>
  );
};

export default Signup;
