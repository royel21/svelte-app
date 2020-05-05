export function formatTime(time) {
  if (time === 0) return "00:00";

  var h = Math.floor(time / 3600);
  var min = Math.floor((time / 3600 - h) * 60);
  var sec = Math.floor(time % 60);
  return (
    (h === 0 ? "" : h + ":") +
    String(min).padStart(2, "0") +
    ":" +
    String(sec).padStart(2, "0")
  );
}

const isMobile = /(android)|(iphone)/i.test(navigator.userAgent);
const scrollW = isMobile ? 15 : 0;
const itemW = isMobile ? 170 : 200;

export const getFilesPerPage = (i) => {
  let fwidth = document.body.offsetWidth;
  let items = parseInt((fwidth - scrollW) / itemW);
  return items * i;
};

export const genUrl = (page, { order, items }, filter, type, id) => {
  let itemsperpage = (items || 0) === 0 ? getFilesPerPage(3) : items;
  if (type.includes("content")) {
    type = `folder-content/${id}`;
  }

  filter = (filter || "").replace("%", " ");
  return `/api/files/${type}/${order || "nu"}/${page || 1}/${itemsperpage}/${filter}`;
};

export const PageTitles = {
  mangas: "Mangas",
  videos: "Videos",
  folders: "Folders",
  favorites: "Favorites",
  "folder-content": "Folder-content",
};

export const FileTypes = {
  Manga: {
    type: "mangas",
    class: "book-open",
    formatter(a, b) {
      return `${parseInt(a || 0) + 1}/${b}`;
    },
  },
  Video: {
    type: "videos",
    class: "play-circle",
    formatter(a, b) {
      return `${formatTime(a)}/${formatTime(b)}`;
    },
  },
  Folder: {
    type: "folders",
    class: "folder-open",
    formatter() {
      return "";
    },
  },
};

export const map = function (value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
import { navigate } from "svelte-routing";

export const ProcessFile = (file) => {
  const curPath = location.pathname;
  let Type = curPath.replace(/(^\/+|\/+$)/g, "").split("/")[0];
  switch (file.dataset.type) {
    case "Manga":
    case "Video": {
      let segment = curPath
        .replace(/(^\/+|\/+$)/g, "")
        .split("/")
        .slice(0, 3);
      segment[1] = "viewer";
      let url = `/${segment.join("/")}/${file.id}`;
      localStorage.setItem("content", curPath);
      localStorage.setItem("fileId", file.Id);
      navigate(url);
      break;
    }
    default: {
      localStorage.setObject("folder", {
        folder: file.id,
        pathname: curPath,
      });
      navigate(`/${Type}/content/${file.id}/`);
    }
  }
};
