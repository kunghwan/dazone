import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import { TextInput, TextInputRef } from "../ui";
import { Form } from "react-router-dom";
import { db, FBCollection } from "../lib/firebase";

const MyBasicInfo = (user: User) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user?.address ?? "");

  const nameRef = useRef<TextInputRef>(null);
  const addressRef = useRef<TextInputRef>(null);

  const isNameDiff = useMemo(() => {
    if (name.length === 0) {
      return false;
    }

    if (name === user.name) {
      return false;
    }
  });

  const isAddrDiff = useMemo(() => {
    if (address.length === 0) {
      return false;
    }
    if (user.address === address) {
      return false;
    }
    return true;
  }, [user.address, address,updateUser]);

  const [isPending, startTransition] = useTransition();

const ref = useMemo(
    () => {
        (db.collection(FBCollection.USERS).doc(user?.uid).[user])
    },[]
)

  const onChangeName = useCallback(() => startTransition(
    async () => {
        try {
            
            await ref.update({name})
            alert('이름이 수정')
            setIsNameEditing(false)
        } catch (error:any) {
            alert(error.message)
        } 
    }
  ), []);

  const onChangeAddress = useCallback(
    () => startTransition(
        async () => {
          if(address.length === 0){
            alert('아무것도 입력되지 않았습니다')
            return addressRef.current?.focus()
          }
          if(!isAddrDiff){
            alert('변경사항이 없습니다')
            return addressRef.current?.focus()
          }

          try {
            await ref.update({address})
            updateUser('address',address)

            alert('주소가 변경되었습니다')
          } catch (error) {
            
          }
        }
    )
  ),[]

  return (
    <div className="border relative h-full">
      {isPending && <Loading className="border" />}
      {!isNameEditing ? (
        <button className="hover:shadow-none hover:bg-bg dark:hover:bg-darkBorder">
          {user.name}
        </button>
      ) : (
        <form>
          <div className="flex-1">
            <TextInput
              id="name"
              label="이름"
              onChangeText={setName}
              ref={nameRef}
              value={name}
              placeholder={user.name}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setName(user?.name && "");
            }}
          >
            취소
          </button>
          {isNameDiff && <button className="btn rounded-sm">저장</button>}
        </form>
      )}
      <p className="px-2.5 text-xl font-light">{user.email}</p>
      <button className="text-sm text-gray-500 hover:shadow-none hover:bg-bg dark:hover:bg-darkBorder">
        {user.uid}
      </button>
      {!isAddressEditing ? (
        <button
          className="bg-bg dark:bg-darkBorder"
          onClick={() => {
            setIsAddressEditing();
          }}
        >
          주소입력
        </button>
      ) : (
        <Form className="max-w-100" onSubmit={onChangeAddress}>
          <TextInput
            ref={addressRef}
            id="address"
            label="주소"
            onChangeText={setAddress}
            placeholder="내가 살던 고향은"
            value={address}
          />
          {isAddrDiff && (
            <div>
              <button
                className="flex gap-x-2.5 justify-end"
                onClick={() => {
                  setAddress(user?.address ?? "");
                  setIsAddressEditing(false);
                }}
              >
                취소
              </button>
              <button className="btn rounded-sm">저장</button>
            </div>
          )}
        </Form>
      )}
    </div>
  );
};

export default MyBasicInfo;
