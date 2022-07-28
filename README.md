# 서버 사이드 렌더링

>장점: 검색 엔진이 우리가 만든 웹 애플리케이션의 페이지를 원활하게 수집할 수 있다.
>
>서버 사이드 렌더링을 통해 초기 렌더링 성능을 개선할 수 있다.


>단점: 브라우저의 일을 서버가 하기 때문에 서버 리소스 사용량이 많아진다. 이는 서버 과부하로 이어진다.
>
>서버 사이드 렌더링을 하면 프로젝트의 구조가 더 복잡해질 수 있다.
>
>데이터 불러오기, 코드 스플리팅과의 호환 등을 추가로 고려해야 하기 때문에 개발이 어려워질 수 있다.
>
>서버 사이드 렌더링과 코드 스플리팅을 함께 적용하면 **깜빡임 현상**이 생길 수도 있다


이러한 단점을 보완하기 위해 Loadable Components 라이브러리에서 제공하는 기능을 이용해

서버 사이드 렌더링 후 필요한 파일의 경로를 추출하여 렌더링 결과에 스크립트/스타일 태그를 삽입해줘야 한다.



`config/webpack.config.server.js` 웹팩 환경 설정 파일



---
## solved

`$ yarn eject` 
이후에 js파일 첫줄에 짧게 빨간줄이 생긴다.

package.json 
```json
"eslintConfig": {
    "env": {
      "NODE_ENV": "development"
    },
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```
env 속성을 추가해주면 해결된다.

---

```
$ node scripts/build.server.js
```
위의 명령어를 실행 후 생기는 에러
```
Error: Cannot find module 'url-loader'
```
해결 방법: `config/webpack.config.server.js` 안의 url-loader 설정 부분

`url-loader` -> `resolve-url-loader` 로 수정

>위와 같은 오류가 생겼을 때는 webpack.config.js를 확인해보고 다른 부분 찾으면 해결될 것 같다.

---

```
$ yarn build:server
```
실행중 에러가 생겼다.

에러 내용은

>Module build failed,
>
>ValidationError: Invalid options object. CSS Loader has been initialized using an options object that does notmatch the API schema.
>
>options has an unknown property 'onlyLocals' ~ ~ ~

모듈 빌드에 실패했고, onlyLocals 라는건 잘 모르겠다는 내용같다.

이미 exportOnlyLocals에서 onlyLocals로 수정한건데 에러가 나왔다.

onlyLocals가 또 바뀌어서 에러가 나왔다.

webpack.config.server.js 안에 css-loader 부분 options를 바꿔주면 된다.
```js
// 바뀌기 이전
options:{
  modules: true,
  onlyLocals: true,
  getLocalIdent: getCSSModuleLocalIdent
}

// 바뀐 후
options: {
  modules: {
    exportOnlyLocals: true
  },
  getLocalIdent: getCSSModuleLocalIdent
}
```

```js
// 바뀌기 이전
options: {
  onlyLocals: true
}

// 바뀐 후
options: {
  modules: {
    exportOnlyLocals: true
  }
}
```



