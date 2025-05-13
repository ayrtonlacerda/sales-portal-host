import { useState } from "react";
import ModuleWrapper from "./ModuleWrapper";

export const Menu = () => {
  const [page, setPage] = useState("contacts");

  return (
    <>
      <div className="h-full col-span-1 border-2 border-black-400 rounded-4xl p-6">
        <div
          onClick={() => setPage("contacts")}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
        >
          <span className="text-xl">📇</span>
          <span className="text-gray-800 font-medium">Contatos</span>
        </div>

        <div
          onClick={() => setPage("sales")}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
        >
          <span className="text-xl">🛒</span>
          <span className="text-gray-800 font-medium">Vendas</span>
        </div>
      </div>
      {page === "contacts" ? (
        <ModuleWrapper
          storageKey="moduleContactsUrl"
          defaultUrl="https://salesportal.val.run/?bundleUrl=https://sales-portal-contacts-production.up.railway.app/bundle.js"
        />
      ) : (
        <ModuleWrapper
          storageKey="moduleSalesUrl"
          defaultUrl="https://salesportal.val.run/?bundleUrl=https://sales-sales-portal-production.up.railway.app/bundle.js"
        />
      )}
    </>
  );
};
