import { Editor } from "react-draft-wysiwyg"


type Props = {
    editorData: any,
    onEditorChange: any
}

function TextEditor({ editorData, onEditorChange }: Props) {
    return (
        <div>
            <Editor
                toolbarClassName={`toolbarClassName border-transparent border-b-slate-200`}
                wrapperClassName={`border rounded-lg border-slate-200`}
                editorClassName={`hideScroll max-h-[800px] bg-backgroundcolor`}

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