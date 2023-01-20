import JoditEditor from "jodit-react";
import Flex from "../../Flex";

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
        <Flex direction='column' gap='10' style={{flexGrow: 1}}>
            <span style={{fontSize: '11px', lineHeight: '15px'}}>Содержание</span>
            <JoditEditor
                config={config}
            />
        </Flex>
    );
}

export default RichText;
