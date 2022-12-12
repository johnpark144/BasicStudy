// ###### 영화 정보 사이트 ####################################################################################################################################
// ##########################################################################################################################################################

// npx create-next-app@latest   // 자바스크립트용
// npx create-next-app@latest --typescript    // 타입스크립트용
// code (app이름)   // vscode로 가게함
// npm run dev

// ########### 삭제할 것들 ##################################################################################################################################
pages안에 폴더랑 파일들
public안에 파일들

// ########### 기본 라우팅 ########################################################################################################################################
// ############ components/NavBar.js
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter(); // 현재 route를 알수있음

  return (
    <nav>
      <Link href="/">
        <span style={{ color: router.pathname === "/" ? "red" : "blue" }}>
          Home
        </span>
      </Link>
      <Link href="/about">
        <span style={{ color: router.pathname === "/about" ? "red" : "blue" }}>
          About
        </span>
      </Link>
    </nav>
  );
}

export default NavBar;
// ############ pages/index.js (pages폴더안에 index.js는 기본 홈이됨) // ex) http://localhost:3000/
import NavBar from '../components/NavBar';
function index() {
  return (
    <>
      <NavBar />
      <div>"hi"</div>
    </>
  );
}

export default index
// ############ pages/about.js (pages폴더안에 index.js외에 파일들은 /~가됨 ) // ex) http://localhost:3000/about/
import NavBar from "../components/NavBar";
function about() {
  return (
    <>
      <NavBar />
      <div>zzzzzzzz</div>
    </>
  );
}

export default about

// ########### CSS (기존 리액트 .module.css 방법도 잘통함) #####################################################################################################
// vscode-styled-components 익스텐션 필요
// ext install vscode-styled-components

// ############ NavBar.js
// ... 생략 ...
return 
  <style jsx>{`
  nav {
      background-color: tomato;
  }
  span{
      text-decoration:none
  }
  .active{
      color: blue;
  }
`}</style>

// ############### Custom App #############################################################################################################################
// ############ _app.js (page들을 렌더링 할때 _app.js의 Component파라미터를 거쳐감 -> styled-components를 이용한 CSS를 전역으로 사용가능 , 네비바랑 footer 사용가능)

import NavBar from "./../components/NavBar";
import "../styles/globals.css"; // _app.js에서만 글로벌 CSS사용가능

function _app({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      {/* 모든 페이지*/}
      <Component {...pageProps} />  {/* pageProps은 서버사이드에서 보내준 props */}

      {/* 글로벌 스타일 컴포넌트 */}
      <style jsx global>{`
        .abc {
          font-size: 120px;
        }
      `}</style>
    </>
  );
}

export default _app;

// ########### Head Title Pattern #########################################################################################################################
// ############ components/Seo.js
import Head from 'next/head';

function Seo({ title }) {
  return (<>
    {/* 헤드 타이틀 바꾸기 */}
    <Head>
      <title>{title} | Next movies</title>
    </Head>
    </>)
}

export default Seo

// ############ components/Layout.js
import NavBar from "./NavBar"

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default Layout

// ############ _app.js
import Layout from './../components/Layout';

function _app({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default _app;

// ############ index.js
import Seo from '../components/Seo';

function index() {
  return (
    <>
      <Seo title='Home' /> {/* 타이틀 변경 가능 */}
      <div>"hi"</div>
    </>
  );
}

export default index;

// ########### Data fetch (useQuery사용) ###########################################################################################################
// ############ index.js

import { useQuery } from "react-query";
import Seo from "../components/Seo";

function index() {
  const fetchMovies = async () => {
    const response = await fetch(
      `/api/movies`
    );
    return response.json();
  };

  const { data, isLoading } = useQuery("movies", fetchMovies);

  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}
      {isLoading && <h4>Loading...</h4>}
      {data?.results.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default index;

// ########### Redirect and Rewrite (API_KEY숨기기) ###########################################################################################################
// ############ next.config.js  (변경시마다 서버재시작 해줘야함)
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact/:path*",      // 기존 주소 (:는 아무문자나, *는 뒤에 모든것을 캐치함)
        destination: "/form/:path*",    // 리디렉트할 주소
        permanent: false,
      },
    ]
  },
  
  async rewrites(){
    return [
      {
        source: "/api/movies",    // 기존 주소
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`    // 가져올 정보의 주소(즉 API_KEY를 보이지 않고 정보가져오기 가능)
      },
    ]
  }
}

module.exports = nextConfig

// ############ .env
API_KEY="453c0ea4912bfd2992005c0b2daf7663"

// ############ .gitignore  (.env의 정보를 업로드하지 않게 함)
# API_KEY
.env

// ########### Server Side Rendering (SSR) ###########################################################################################################
// ############ index.js

import Seo from "../components/Seo";

function index({ data }) {  // SSR props (pageProps)
  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}
      {data?.results.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}


export async function getServerSideProps(){ // 백엔드에서 작동되는 부분 (function이름 고정)
  const data = await (await fetch(`http://localhost:3000//api/movies`)).json();

  return {
    props: {
      data,   // 데이터를 props으로 전달
    },
  }
}

export default index;

// ########### Dynamic 라우팅 (폴더사용) ##########################################################################################################################
// pages/폴더명/index.js -> http://localhost:3000/폴더명
// pages/폴더명/all.js -> http://localhost:3000/폴더명/all
// pages/폴더명/[id].js -> http://localhost:3000/폴더명/:id
// pages/폴더명/[...params].js -> http://localhost:3000/폴더명/:params[0]/:params[1]/:params[2]...

// ############ pages/movies/[...params].js
import { useRouter } from "next/router";

function Detail() {
  const router = useRouter();
  
  return <div>{router.query.params}</div>;  // 파일명 [params] (주소창에 입력한 params) 와 같은값
}

export default Detail;

// ########### Detail 의 query, pathname 마킹 및 query정보 가져오기 ##############################################################################################
// ############ next.config.js

// ...생략...
async rewrites(){
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}` 
      },
      {
        source:"/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`  
      }
    ]
  }
}
// ...생략...

// ############ index.js (방법1)

import Seo from "../components/Seo";
import Link from "next/link";

function index({ data }) {
  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}

      {data?.results.map((movie) => (
        <Link href={{
          pathname: `/movies/${movie.id}`,
          query:{
            title: movie.original_title,   // ex) ?title=Black+Adam
          },
        }} as={`/movies/${movie.id}`} // 기존 pathname과 query를 가진 pathname을 as로 다시 만듬
        key={movie.id}>
        
          <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </Link>
      ))}
      
// ...생략...
      
// ############ index.js (방법2)
      
import Seo from "../components/Seo";
import Link from "next/link";

function index({ data }) {
  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}
      
      {data?.results.map((movie) => (
        <Link href={`/movies/${movie.original_title}/${movie.id}`} key={movie.id}>  
          <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </Link>
      ))}
// ...생략...
      
// ############ [...params].js
import { useRouter } from "next/router";

function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || []; // ...params 는 배열형태로 
  return (
  <div>
    <Seo title={title} />
    {title}
  </div>
)}

export async function getServerSideProps({ query:{params} }){ // 백엔드 (getServerSideProps context prop제공)
  return {
    props: {
      params
    },
  }
}

export default Detail;

// ########### Notfound Error (404) ##########################################################################################################################
// ############ pages/404.js (404.js에 매칭되지 않은 페이지들이 다감)
function NotFound() {
  return (
    <div>
      Not Found error
    </div>
  )
}
export default NotFound

