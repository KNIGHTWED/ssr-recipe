import React from "react";
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const app = express();

// server side rendering 처리할 핸들러 함수
const serverRender = (req, res, next) => {
  // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 준다.
  
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  // 렌더링
  const root = ReactDOMServer.renderToString(jsx);
  // 클라이언트에게 결과물을 응답
  res.send(root);
}

app.use(serverRender);

// 5000 포트로 서버 가동
app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});

// const html = ReactDomServer.renderToString(
//   <div>Hello Server Side Rendering</div>
// );
// console.log(html);