import { Editor } from "react-draft-wysiwyg"


type Props = {
    editorData: any,
    onEditorChange: any
}

function TextEditor({ editorData, onEditorChange }: Props) {
    return (
        <div>
            <Editor
                toolbarClassName={`toolbarClassName   dark-mode-toolbar border-transparent border-b-slate-200 dark:text-black dark:border-b-slate-600 dark:bg-darkmodalbg`}
                wrapperClassName={`border rounded-lg border-slate-200 dark:border-slate-600 `}
                editorClassName={`hideScroll max-h-[800px] dark:text-white bg-backgroundcolor`}

                editorState={editorData}
                onEditorStateChange={(v: any) => onEditorChange(v)}
                toolbar={{
                    options: ['inline', 'colorPicker', 'link', 'emoji', 'fontSize', 'history'],
                }}
            />
        </div>
    )
}

export default TextEditor