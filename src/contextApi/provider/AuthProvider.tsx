import { auth, db, FBCollection } from "../../lib/firebase";
import Loading from "../../shared/Loading";
import { AUTH } from "../context";
import { useState, useEffect, useCallback, PropsWithChildren } from "react";
import {
  createUserWithEmailAndPassword, // Firebase로 이메일과 비밀번호로 사용자 생성
  signInWithEmailAndPassword, // Firebase로 이메일과 비밀번호로 로그인
  signOut, // Firebase에서 로그아웃
  onAuthStateChanged, // 인증 상태 변경을 감지하는 함수
  User, // 사용자 객체 타입 정의
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore에서 문서를 읽는 함수
const ref = db.collection(FBCollection.USERS);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState(AUTH.initialState.user);
  const docRef = doc(db, "users", "L8JHdNo5LmfCm0XsBaYF");

  const getDeta = async () => {
    const docSnap = await getDoc(docRef); // 문서 참조를 통해 데이터를 읽음
    if (docSnap.exists()) {
      console.log(docSnap.data()); // 문서가 존재하면 데이터를 출력
    } else {
      console.log("No such document!"); // 문서가 존재하지 않으면 메시지 출력
    }
  };

  useEffect(() => {
    getDeta(); // 컴포넌트가 처음 렌더링될 때 Firestore 데이터 읽기

    // 사용자의 인증 상태를 구독 (로그인 여부 체크)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // 사용자의 로그인 상태 변경 시 user 상태 업데이트
    });

    return () => unsubscribe(); // 컴포넌트가 unmount 될 때 구독을 해제
  }, []); // 빈 배열을 넣어서 한 번만 실행되도록 설정
  const fetchUser = useCallback(async (uid: string) => {
    // const snap = await ref.get();
    // const data = snap.docs.map(
    //   (doc) => ({ ...doc.data(), uid: doc.id } as User)
    // ); //! 많은 유저들을 한번에 불러올 때 씀 불러올 때는 컬렉션만 잡아서 씀
    const snap = await ref.doc(uid).get();
    const data = snap.data() as User | null;

    //! 한 명의 유저를 가져오는 법: doc에 해당 아이템의 아이디를 전달하면 됨

    if (!data) {
      alert("존재하지 않는 유저입니다.");
      return setUser(null);
    }
    setUser(data);
  }, []);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((fbUser) => {
      console.log(fbUser);
      if (fbUser) {
        console.log("fetch user data from database");
        fetchUser(fbUser.uid);
      } else {
        setUser(null);
      }
      setTimeout(() => {
        setInitialized(true);
        setIsPending(false);
      }, 1000);
    });

    subscribe;

    return subscribe;
  }, [fetchUser]);

  const signin = useCallback(
    async (email: string, password: string): Promise<PromiseResult> => {
      try {
        console.log("signin process started");
        setIsPending(true);

        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user) {
          await fetchUser(user.uid);
        }
      } catch (error: any) {
        console.log(error);
        return { message: error.message };
      } finally {
        console.log("singin process done");
        setIsPending(false);
      }

      return { success: true };
    },
    [fetchUser]
  );

  const signup = useCallback(
    async (newUser: User, password: string): Promise<PromiseResult> => {
      try {
        setIsPending(true);
        const { user } = await auth.createUserWithEmailAndPassword(
          newUser.email,
          password
        );
        if (!user) {
          return { success: false, message: "회원가입에 실패했습니다." };
        }
        const storedUser: User = { ...newUser, uid: user.uid };

        await db.collection(FBCollection.USERS).doc(user.uid).set(storedUser);

        setUser(storedUser);

        return { success: true };
      } catch (error: any) {
        return { success: false, message: error.message };
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  const signout = useCallback(async (): Promise<PromiseResult> => {
    auth.signOut();
    setUser(null);

    return { success: true };
  }, []);

  const updateUser = useCallback((target: keyof User, value: any) => {
    setUser((prev) => (prev ? { ...prev, [target]: value } : null));
  }, []);

  return (
    <AUTH.context.Provider
      value={{
        initialized,
        isPending,
        user,
        signin,
        signup,
        signout,
        updateUser,
      }}
    >
      {!initialized || isPending ? (
        <Loading>
          <h1 className="text-[100px] font-black text-theme">대존</h1>
        </Loading>
      ) : (
        children
      )}
    </AUTH.context.Provider>
  );
};

export default AuthProvider;
