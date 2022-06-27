import './App.css';
import {useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'html-react-parser';

function App() {

  const [Content, setContent] = useState({
    title:'',
    content:''
  })

  const [viewContent, setViewContent] = useState([]);

  const getValue = e => {
    const {name, value} = e.target;
    setContent({
      ...Content,
      [name]: value
    })
    console.log(Content);
  }

  const onRemove = title => {
    setContent(Content.filter(title => Content.title != title));
  }

  return (
    <div className="App">
      <h1>익명 게시판</h1>
      <div className='container'>
        {viewContent.map(element =>
          <div>
            <h2>{element.title}</h2>
            <div>
              {ReactHtmlParser(element.content)}
              </div>
              <button className='removvve-button' onClick={onRemove}>삭제</button>
            </div>
            )}
      </div>
      <div className='content'>
      <input className="input" type='text' placeholder='제목' onChange={getValue} name='title'/>
        <CKEditor
          editor={ClassicEditor}
          data="<p>내용을 입력하세요!</p>"
          onReady={editor => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setContent({
              ...Content,
              content: data
            })
            console.log(Content);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <button className='submit-button' onClick={() => {
        setViewContent(viewContent.concat({...Content}));
      }}>등록</button>
    </div>
  );
}

export default App;