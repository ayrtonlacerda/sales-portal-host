import { useState } from "react";
import ModuleWrapper from "./ModuleWrapper";
// @ts-ignore
const { useSearch } = await import("http://localhost:3004/bundle.js");

export const Menu = () => {
  const [page, setPage] = useState("contacts");
  const { searchInput, setSearchInput, selectedFilter, setSelectedFilter } =
    useSearch();

  return (
    <div className="flex flex-row  col-span-5 gap-8 ">
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
        <>
          <div className="bg-blue-50 rounded-2xl px-6 py-4 mb-6 flex-col">
            <ModuleWrapper
              storageKey="moduleSearchUrl"
              defaultUrl="https://salesportal.val.run/?https://sales-portal-search-production.up.railway.app/bundle.js"
            />

            <ModuleWrapper
              storageKey="moduleContactsUrl"
              defaultUrl="https://salesportal.val.run/?bundleUrl=https://sales-portal-contacts-production.up.railway.app/bundle.js"
              props={{
                searchInput,
                selectedFilter,
                setSearch: setSearchInput,
              }}
            />
          </div>
        </>
      ) : (
        <div className="col-span-5">
          <ModuleWrapper
            storageKey="moduleSalesUrl"
            defaultUrl="https://salesportal.val.run/?bundleUrl=https://sales-sales-portal-production.up.railway.app/bundle.js"
          />
        </div>
      )}
    </div>
  );
};
