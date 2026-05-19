"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Code } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface RichTextEditorProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="bg-light border-b border-border px-3 py-2 flex items-center gap-1 flex-wrap sticky top-0 z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("heading", { level: 1 }) ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("heading", { level: 2 }) ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-border mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("bold") ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("italic") ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-border mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("bulletList") ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("orderedList") ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-border mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("blockquote") ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={clsx("p-1.5 rounded transition-colors", editor.isActive("codeBlock") ? "bg-primary/10 text-primary" : "text-muted hover:text-dark hover:bg-gray-200")}
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>
    </div>
  );
};

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ label, value, onChange, error, helperText, required }, ref) => {
    
    const editor = useEditor({
      extensions: [
        StarterKit,
      ],
      content: value || '',
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        if (onChange) {
          // Send HTML string back
          onChange(editor.getHTML());
        }
      },
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none min-h-[300px] p-4',
        },
      },
    });

    // Sync external value changes to the editor (like when initialData loads)
    useEffect(() => {
      if (editor && value && editor.getHTML() !== value) {
        editor.commands.setContent(value);
      }
    }, [value, editor]);

    return (
      <div className="w-full" ref={ref}>
        <label className="block text-sm font-medium text-dark mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className={clsx(
          "bg-white border rounded-xl overflow-hidden transition-all",
          error ? "border-red-500" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
        )}>
          <MenuBar editor={editor} />
          
          <EditorContent editor={editor} />
        </div>
        
        {error && <p className="text-sm text-red-500 mt-1.5">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted mt-1.5">{helperText}</p>}
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
