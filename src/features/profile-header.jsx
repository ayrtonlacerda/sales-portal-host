import { useState, useEffect } from "react";

const getModuleUrl = () => {
  const localStorageUrl = localStorage.getItem("moduleUrl");
  console.log("localStorageUrl -> ", localStorageUrl);
  return localStorageUrl || "https://salesportal.val.run/";
};

let cachedModule = null;

const loadModule = async () => {
  if (cachedModule) return cachedModule;

  const moduleUrl = getModuleUrl();
  try {
    const mod = await import(moduleUrl);
    cachedModule = mod.default;
    return cachedModule;
  } catch (error) {
    console.error("Erro ao importar o módulo:", error);
    return null; // Ou um componente de fallback
  }
};

const ProfileHeaderWrapper = () => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    loadModule().then((Mod) => {
      if (Mod) setComponent(() => Mod);
    });
  }, []);

  if (!Component) return <div>Loading...</div>; // Fallback enquanto carrega
  return <Component />;
};

export default ProfileHeaderWrapper;
