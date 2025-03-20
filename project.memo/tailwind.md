# 모던 css 솔루션

기본 css 지식이 있어야 함

중복되는 스타일 저장해놓고 쓰기

1. @theme {}

## @layer

@apply 라는 키워드 뒤에 테일윈드 스타일링 방법을 그대로 적용할 수 있음

```javascript
div{
    @apply flex; //tailwind rule
    flex-direction: column;
}



```

기본 css와 같이 사용할 수 있음

1. base
   --변수이름:var(--color-red-500);

   div, a,button, section => flex flex-col
   고정된 형태로 많이 쓰는 태그들을 미리 기본 값을 설정하면 좋음

2. component
   특수 목적을 가지고 만든 컴포넌트에 사용하는 클래스
   테일윈드에서 사용하고 있는 태그를 사용하면 안됨

   .ti-i

3. utilities

twMerge를 쓰기전에 컴포넌트에서 미리 선언해둔 스타일을 무시하고 새로운 스타일을 입히고 싶을 때 사용
.ti-i-u

**단점** 2,3은 자동완성 안됨

### 나만의 값을 넣고 싶을 때

text-[나만의값]
p-[]
m-[]
w-[]
bg-[]

변수와 섞어서 쓰고 싶다면 twMerge 설치해서 사용해야 함

### 반응형 (Responsive)

sm, md, lg, xl, 2xl 5가지 반응형 화면지원
640px보다 작은 화면을 어떻게 함?
-> 기본스타일이 제일 작은 화면 기준이 됨

### 특수상황 (:dark, :focus, :active, etc.)

dark:style
focus:style

sm:dark:style
md:focus:style

**검색키워드 + css**
** + js**
