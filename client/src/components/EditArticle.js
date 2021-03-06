import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const EditArticle = (props) => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const changeOnclick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("article", article);
    formData.append("authorname", authorname);
    formData.append("articleImage", fileName);
    /*
    const articles = {
      title,
      article,
      authorname,
    };
    */

    setTitle("");
    setArticle("");
    setAuthorname("");
    setFileName("");
    axios
      .put(`/articles/update/${props.match.params.id}`, formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/articles/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setArticle(res.data.article),
        setAuthorname(res.data.authorname),
        setFileName(res.data.articleImage),
      ])
      .catch((error) => console.log(error));
  }, []);

  return (
    <AddArticleContainer>
      <div className="container">
        <h1> Update Article</h1>
        <span className="message">{message}</span>
        <form onSubmit={changeOnclick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="authorname">Authorname</label>
            <input
              type="text"
              value={authorname}
              onChange={(e) => setAuthorname(e.target.value)}
              className="form-control"
              placeholder="Author Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="article">Article</label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Choose article iamge</label>
            <input
              type="file"
              filename="articleImage"
              className="form-control-file"
              onChange={onChangeFile}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Article
          </button>
        </form>
      </div>
    </AddArticleContainer>
  );
};

export default EditArticle;

// MAIN CONTAINER

const AddArticleContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 31.25rem;

  h1 {
    font-weight: 900;
    color: var(--dark-green);
  }

  .btn-primary {
    margin-top: 2rem;
    background: var(--dark-green);
    border: none;
    &:hover {
      background: var(--light-green);
    }
  }

  .message {
    font-weight: 900;
    color: tomato;
    padding: 1rem 1rem 1rem 0;
  }
`;
