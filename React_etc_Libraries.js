// ######## lodash debounce (타이머와 타이머캔슬기능) ######################################################################################
// npm i --save lodash.debounce

import React, { useState } from "react";
import { debounce } from "lodash";

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  const debouncedHandleMouseEnter = debounce(() => setIsHovered(true), 500);

  const handlOnMouseLeave = () => {
    setIsHovered(false);
    debouncedHandleMouseEnter.cancel();
  };

  return (
    <div
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handlOnMouseLeave}
    >
      hover me
    </div>
  );
}

// ######## React-icons (머티리얼아이콘이나 폰트어썸처럼 여러 아이콘들사용) ######################################################################################
// https://react-icons.github.io/react-icons/
// npm install react-icons --save

import { AiFillEdit } from 'react-icons/ai'; // Ai로 시작하기 때문에 from 'react-icons/ai'
import { MdDone } from 'react-icons/md';

<AiFillEdit /> // React-icons 사이트에서 복사한 컴포넌트
<AiFillDelete />
<MdDone />
  
// ######## Next-Themes (다크모드, 야간모드) //!! 리액트 warning이 여전히 있을수 있음 ################################################################################
// npm i next-themes
  
// ######## layout.tsx
'use client'  // 클라이언트 사이드에서만 사용가능
import '../styles/globals.css'  // globals.css에있는 TailwindCSS 전역 적용
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <ThemeProvider attribute='class'> // 사용범위 Provider 지정
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
  
// ######## page.tsx
function HomePage() {
  return (
    <section className="mt-16">
      <h1 className="text-7xl font-bold">
        Hi I'm <span className="dark:text-purple-600">John</span>
      </h1>
      <h3 className="text-4xl my-3">I am Web Designer</h3>
      <p className="text-gray-700 mb-8 dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        quibusdam autem doloremque beatae iure, nihil fugit doloribus cum soluta
        modi!
      </p>
      <button className={'p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-purple-600 text-white px-6'}>
        Hire Me!
      </button>
    </section>
  );
}

export default HomePage;

// ######## Header.tsx
import Link from "next/link";
import Button from "./Button";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/Bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Header() {
  const { systemTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []); // 다크모드떄 새로고침해도 태양모양 아이콘 유지시키려고

  // 다크모드 설정 및 아이콘
  const renderThemeChanger = () => {
    if (!mounted) return null; // 다크모드떄 새로고침해도 태양모양 아이콘 유지시킴

    const currentTheme = theme === "s" ? systemTheme : theme; // systemTheme은 항상 light (일반모드 light 디폴트)

    if (currentTheme === "dark") {
      // 다크모드인경우
      return (
        <button
          className={'p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200 dark:bg-gray-600'}
          onClick={() => setTheme("light")}
        >
          <BsFillSunFill />
        </button>
      );
    } else {
      // 일반모드인경우
      return (
        <button
          className={'p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200'}
          onClick={() => setTheme("dark")}
        >
          <BsFillMoonFill />
        </button>
      );
    }
  };

  // navigations 이름과 경로
  const navigations = [
    { label: "Home", path: "/" },
    { label: "About", path: "/" },
  ];

  return (
    <header className="h-16 flex items-center justify-between bg-red-300 dark:bg-gray-700">
      <ul className="flex gap-4">
        {navigations.map((nav) => (
          <Link
            key={nav.label}
            href={nav.path}
            className="font-semibold text-gray-400 hover:text-gray-500"
          >
            {nav.label}
          </Link>
        ))}
      </ul>
      {renderThemeChanger()}
    </header>
  );
}

export default Header;

// ######## tailwind.config.tsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',  // tailwind로 다크모드 사용 할 수 있도록
  theme: {
    extend: {},
  },
  plugins: [],
}

// ######## react-timeago (몇초전, 몇분전) ###################################################################################################################
// npm install react-timeago
// npm i --save-dev @types/react-timeago (타입스크립트)

// ######## MessageComponent.tsx  ({new Date(msg.created_at).toLocaleString()} 이부분을 대체함)
import TimeAgo from "react-timeago";
// ... 생략 ...
  <TimeAgo date={new Date(msg.created_at)} />   {/* // 참고로 msg.created_at = Date.now() // 기존 시간 나타날때는 new Date(msg.created_at).toLocaleString() */}  
// ... 생략 ...

// ######## React-beautiful-dnd (박스 끌어다놓기) ###########################################################################################################
// https://www.npmjs.com/package/react-beautiful-dnd
// npm i react-beautiful-dnd
// npm i @types/react-beautiful-dnd
  
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd' // DropResult는 onDragEnd함수 매개변수의 타입(타입스크립트용)
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);
const [completedTodos, setCompletedTodos] = useState([]);

// 드래그앤 드롭됬을때 함수
  const onDragEnd = (result: DropResult) => {  // 콘솔로 result확인하면 로직구현하기 쉬울 것
    const { source, destination } = result; // source는 어디서 왔는지, destination은 어느 Droppable 공간으로 가는지

    // 아무대나 드롭하거나, 같은 Droppable 공간에 같은 index에 드롭하면 아무변화 X
    if(!destination || 
      (destination.droppableId === source.droppableId && destination.index === source.index)) return; 

      // 드롭 로직을 위한 변수들
      let add,  // 이동할 내용 복사용
      active = todos, // Active Tasks 리스트 공간 복사본
      complete = completedTodos; // Completed Task 리스트 공간 복사본

      // 재대로된 드롭 (source부분)
      if(source.droppableId === 'TodosList' ){  // Active Tasks가 source인경우 add에 내용복사 후, 그곳 index에서 지워버림
        add = active[source.index];
        active.splice(source.index, 1)
      } else {  // Completed Tasks가 source인경우 add에 내용복사 후, 그곳 index에서 지워버림
        add = complete[source.index];
        complete.splice(source.index, 1)
      }

      // 재대로된 드롭 (destination부분)
      if(destination.droppableId === 'TodosList' ){ // Active Tasks가 destination인경우 그곳에 드롭된 index에 내용(add)를 삽입
        active.splice(destination.index, 0, add)
      } else {  // Completed Tasks가 destination인경우 그곳에 드롭된 index에 내용(add)를 삽입
        complete.splice(destination.index, 0, add)
      }

      // 복사본을 원본에 삽입
      setCompletedTodos(complete);
      setTodos(active);

  
return (
<DragDropContext onDragEnd={onDragEnd}> {/* DragDropContext 사용 전체범위, (onDragEnd는 드롭했을때 발생) */}

  <Droppable droppableId="TodosList">   // Droppable 떨굴 수 있는 범위 1 (그 안은 콜백함수)
    {(provided, snapshot) => (
      <div ref={provided.innerRef}{...provided.droppableProps}> //  Droppable Zone
        {todos.map((todo, idx) => (
          
          <Draggable draggableId={todo.id.toString()} index={idx}> // Draggable 드래그 할 수있는 범위
            {(provided, snapshot) => (
              <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}> // Draggable Zone
              
              </div>
            )}
          </Draggable>

        ))}
        {provided.placeholder} {/* 드래그해도 draggable한 영역을 그대로 유지하게함 */}
      </div>
     )}
  </Droppable>

  <Droppable droppableId="TodosRemove"> // Droppable 떨굴 수 있는 범위 2 (그 안은 콜백함수)
    {(provided, snapshot) => (
      <div ref={provided.innerRef}{...provided.droppableProps}> //  Droppable Zone (snapshot.isDraggingOver 사용가능)
        {completedTodos.map((todo, idx) => (
          
          <Draggable draggableId={todo.id.toString()} index={idx}> // Draggable 드래그 할 수있는 범위
            {(provided, snapshot) => (
              <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}> // Draggable Zone (snapshot.isDragging 사용가능)
              
              </div>
            )}
          </Draggable>

        ))}
        {provided.placeholder} {/* 드래그해도 draggable한 영역을 그대로 유지하게함 */}
      </div>
     )}
  </Droppable>

</DragDropContext>
)

// snapshot.isDraggingOver 는 Droppable존에 클래스변화 시켜줄때 주로 사용
// snapshot.isDragging 는 Draggable안에 박스에 클래스변화 시켜줄때 주로 사용

// ######## Framer Motion #################################################################################################################
