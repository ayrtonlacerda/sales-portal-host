import React, { useEffect, useState } from "react";
import "../styles/global.css";

async function load() {
  //const debugUrl = "http://localhost:5173/src/App.tsx";
  const localUrl = "http://localhost:3003/bundle.js";
  const remoteUrl = "https://likebutton-beryl.vercel.app/bundle.js";

  try {
    const response = await fetch(localUrl, { method: "HEAD" });
    if (response.ok) {
      console.log("Carregando SalesWrapper localmente");
      return (await import(localUrl)).default;
    }
    throw new Error("Módulo SalesWrapper local não encontrado");
  } catch (e) {
    console.error("error local load", e);
    console.log("Carregando SalesWrapper remoto");
    return (await import(remoteUrl)).default;
  }
}

const SalesWrapper = () => {
  const [ComponentReact, setComponent] = useState(null);

  useEffect(() => {
    load().then((Component) => {
      setComponent(() => Component);
    });
  }, []);

  if (!ComponentReact) return <div>Carregando...</div>;

  return <ComponentReact />;
};

export default SalesWrapper;
