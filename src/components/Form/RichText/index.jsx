import JoditEditor from "jodit-react";

const config = {
    buttons: 'bold, italic, underline, strikethrough, eraser, ul, ol, fontsize, paragraph, classSpan, lineHeight, superscript, subscript, file, image, video, spellcheck, cut, copy, paste, selectall, copyformat, hr, table, link, symbols, indent, outdent, left, brush, undo, redo, find source, preview, print',
    uploader: {
        insertImageAsBase64URI: true
    },
    readonly: false,
    toolbar: true,
    spellcheck: true,
    //   language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    enableDragAndDropFileToEditor: true,
    width: '100%',
}

const RichText = () => {
    return (
        <JoditEditor
            config={config}
        />
    );
}

export default RichText;
