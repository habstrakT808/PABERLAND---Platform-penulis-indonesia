import dynamic from "next/dynamic";

const TinyMCEEditor = dynamic(() => import("./TinyMCEEditor"), { ssr: false });

export default TinyMCEEditor;
