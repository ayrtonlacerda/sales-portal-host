import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";

export const Admin = () => {
  // Estado para gerenciar toggles e URLs
  const [rows, setRows] = useState([
    { name: "sales", cdn: true, url: "", storageKey: "moduleSalesUrl" },
    { name: "contacts", cdn: true, url: "", storageKey: "moduleContactsUrl" },
    { name: "search", cdn: true, url: "", storageKey: "moduleSearchUrl" },
    {
      name: "header",
      cdn: true,
      url: "",
      storageKey: "moduleProfileHeaderUrl",
    },
  ]);

  const handleToggle = (index: number) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              cdn: !row.cdn,
              url: row.cdn ? row.url : "",
            }
          : row,
      ),
    );

    const row = rows[index];
    if (!row.cdn) {
      localStorage.removeItem(row.storageKey);
    }
  };

  const handleUrlChange = (index: number, value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, url: value } : row)),
    );

    const row = rows[index];
    localStorage.setItem(row.storageKey, value);
  };

  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>CDN</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell className="w-[150px]">{row.name}</TableCell>
              <TableCell className="w-[150px]">
                <Switch
                  checked={row.cdn}
                  onCheckedChange={() => handleToggle(index)}
                />
              </TableCell>
              <TableCell>
                {!row.cdn && (
                  <Input
                    value={row.url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder="Enter URL"
                    className="max-w-xs"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
