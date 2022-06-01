import React from "react";
import { nanoid } from "nanoid";
import { useState } from "react";

const PAGES = [{ title: "Untitled", id: nanoid() }];

export default function Sidebar() {
  const [pages, setPages] = useState(PAGES);
  return (
    <section className="w-[250px] text-sidebarBlack font-medium flex flex-col pointer-events-auto	bg-sidebarBg">
      <div className="h-[45px] flex items-center	justify-center">Profile</div>
      <ul className="pt-[14px] pb-[20px] overflow-hidden	">
        {pages.map((page) => (
          <li
            key={page.id}
            className="cursor-pointer	flex items-center py-0.5	px-3.5 text-sm	 min-h-[27px]"
          >
            <p>{page.title}</p>
          </li>
        ))}
        <li className="cursor-pointer	flex items-center py-0.5	px-3.5 text-sm	 min-h-[27px]">
          <button
            type="button"
            onClick={() =>
              setPages((prevPages) => [
                ...prevPages,
                { title: "Untitled", id: nanoid() },
              ])
            }
          >
            Add a page
          </button>
        </li>
      </ul>
    </section>
  );
}
