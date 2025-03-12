# useImperativeHandle

1. ChildComponent 설계

````javascript

import {useImperatibeHandle, Ref} from 'react'

interface ChildComponentProps {
    ```
}

export interface ChildRef {
  focus: () => void
  value: string;
  hello: () => void
}
````

function ChildComponent (props:ChildComponentProps, ref: Ref <ChildRef>){
const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref,
        () => ({
            focus: () => inputRef.current?.focus()
            value: 'child'

hello: () => console.log('hello this is child')

return (<input ref={inputref}>)
})
)
}

import {useRef} from 'react'
import {ChildRef} from './ChildComponent'

fuction ParentComponent() {
const childRef = u
}

## custom Hook으로 input, select

1.rafce = > return {}

2.필요한 ref 선언하기

3.Component등의 이름으로 리액트 컴포넌트를 바깥이 아닌 안에 선언 위치:return {} 위

4.원하는 Component 만들기 필요한 props-drilling은 별로도 만들어서 사용

5. 상단에 ComponentProps 만들면 됨

6. return {ref.Component,...변수,함수}
