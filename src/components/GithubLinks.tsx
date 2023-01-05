import React from "react";

const GithubLinks = () => {
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <li>
        <a
          href="https://github.com/Meg-1126"
          className="github-link"
          target="blank"
        >
          Megumi Akama
        </a>
      </li>
      <li>
        <a
          href="https://github.com/Ayut0"
          className="github-link"
          target="blank"
        >
          Yuto Yamakita
        </a>
      </li>
      <li>
        <a
          href="https://github.com/Mauriciots"
          className="github-link"
          target="blank"
        >
          Maurício Tomaz
        </a>
      </li>
    </ul>
  );
};

export default GithubLinks;
