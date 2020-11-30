import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import spinner from "../spinner.gif";
import { Link } from "react-router-dom";

const Article = (props) => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [fileName, setFileName] = useState("");

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
  }, [props]);

  return (
    <MainContainer>
      {!title || !article || !authorname ? (
        <img src={spinner} alt="loading..." />
      ) : (
        <>
          <img
            src={`/uploads/${fileName}`}
            alt="..."
            style={{ width: "40%", margin: "0 auto", display: "flex" }}
          />
          <h2>{title}</h2>
          <p>{article}</p>
          <p className="badge badge-secondary">{authorname}</p>
          <br />
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </>
      )}
    </MainContainer>
  );
};

export default Article;

// MAIN CONTAINER

const MainContainer = styled.div`
  margin: 6rem auto;
  padding: 3rem 14rem;

  h2 {
    text-align: center;
    font-weight: 900;
    color: var(--dark-green);
  }

  img {
    display: block;
    margin: auto;
  }

  .btn-primary {
    background: var(--dark-green);
    border: none;
    &:hover {
      background: var(--light-green);
    }
  }
`;
