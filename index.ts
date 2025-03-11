//1. 문자열, 숫자, 불리언, null, undefined
const a = "";

const b: string = "010";

console.log(b);

const c: boolean = false;

console.log(c);

//2. 배열, 객체
const a1 = [1, "asdfsdf", false, null];

const a2: number[] = [1, 2];

const o = { name: "", age: 12 };
const o2: { name: string; age: number } = { age: 12, name: "sdf" };

const a3: { name: string; age: number }[] = [
  { name: "dsfsdf", age: 12 },
  { name: "dsfssdfsdfdf", age: 18 },
];

const a4: Array<number> = [12, 2, 3, 4];
const a5: number[] = [12, 2, 3, 4];

type S = string;

const s1: S = "";
const s2: S[] = ["1", "1", "1"];

type Type<T = string> = T;

const t1: Type<number> = 1;
const t2: Type<string> = "1";
const t3: Type<number> = 12;

type OBJ<M = string> = {
  name: string;
  age: number;
  mobile: M;
};

const p1: OBJ = { age: 12, name: "sdfd", mobile: "01054542" };
const p2: OBJ<number> = { age: 12, name: "sdfd", mobile: 1231321 };
const p3: OBJ<number | string | boolean>[] = [p1, { ...p2, mobile: false }];

interface Animal<P = number> {
  name: string;
  id: number;
  price: P;
  age: number;
  isFemale: boolean;
}

const an1: Animal = {
  age: 12,
  id: 12,
  isFemale: false,
  price: 12131232,
  name: "12",
};

const an2: Animal<string> = {
  age: 12,
  id: 12,
  isFemale: false,
  price: "12131232",
  name: "12",
};

const an3: Animal<string | number>[] = [an1, an2];

const pr1 = Number(an3[0].price) * 12;
const pr2 = Number(an3[1].price) * 12;
