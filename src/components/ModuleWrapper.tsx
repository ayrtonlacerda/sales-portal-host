import { useState, useEffect } from "react";

type GetModuleUrl = (storageKey: string, defaultUrl: string) => string;

type LoadModule = (
  storageKey: string,
  defaultUrl: string,
) => Promise<React.ComponentType | null>;

interface ModuleWrapperProps {
  storageKey: string;
  defaultUrl: string;
  props?: any;
}

const getModuleUrl: GetModuleUrl = (storageKey, defaultUrl) => {
  const localStorageUrl = localStorage.getItem(storageKey);
  console.log(`${storageKey} -> `, localStorageUrl);
  return localStorageUrl || defaultUrl;
};

const loadModule: LoadModule = async (storageKey, defaultUrl) => {
  const moduleUrl = getModuleUrl(storageKey, defaultUrl);
  try {
    const mod = await import(moduleUrl);
    return mod.default;
  } catch (error) {
    console.error(`Erro ao importar o módulo para ${storageKey}:`, error);
    return null;
  }
};

const ModuleWrapper = ({
  storageKey,
  defaultUrl,
  props = {},
}: ModuleWrapperProps) => {
  const [ComponentReact, setComponent] = useState(null);

  useEffect(() => {
    loadModule(storageKey, defaultUrl).then((Mod) => {
      if (Mod) setComponent(() => Mod);
    });
  }, [storageKey, defaultUrl]);

  if (!ComponentReact) return <div>Carregando...</div>;

  console.log("props -> ", props);

  return <ComponentReact {...props} />;
};

export default ModuleWrapper;
