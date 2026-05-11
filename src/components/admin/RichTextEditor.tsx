"use client";

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-lg border px-2 py-1 text-slate-700 transition ${
        active ? "border-sky-200 bg-sky-50 text-sky-800" : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Write content…",
  minHeight = 120,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  minHeight?: number;
}) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
      }),
      Underline,
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content: defaultValue || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none px-3 py-2 text-slate-800",
        style: `min-height:${minHeight}px;`,
        "data-placeholder": placeholder,
      } as any,
    },
  });

  // Keep editor synced if defaultValue changes
  useEffect(() => {
    if (!editor) return;
    if (defaultValue && editor.getHTML() !== defaultValue) {
      editor.commands.setContent(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, editor]);

  const html = editor?.getHTML() || "";

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-2 py-2">
        <ToolbarButton
          label="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor?.isActive("underline")}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <div className="ml-auto text-xs text-slate-500">Bold / Underline supported</div>
      </div>

      <EditorContent editor={editor} />

      {/* Submit value via normal form post */}
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

