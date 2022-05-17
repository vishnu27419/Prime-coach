import React from "react";
import { Section, Article, list } from "./generic";
import ReactLoading from "react-loading";

function LoaderWrapper() {
  return (
    <div
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "0.8vh",
        height: "100vh",
      }}
    >
      <Section>
        {list.map((loading) => (
          <Article key={loading.prop}>
            <ReactLoading type={loading.prop} color="#fff" />
          </Article>
        ))}
      </Section>
    </div>
  );
}

export default LoaderWrapper;
