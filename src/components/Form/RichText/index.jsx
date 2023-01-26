import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import { _convertHtmlToPlainText } from "../../../utils/htmlToPlainText";

const config = {
    enter: Froalaeditor.ENTER_BR,
    tableStyles: {
        "no-border": "No border"
    },
    charCounterCount: true,
    useClasses: false,
    attribution: false,
    heightMin: 220,
    heightMax: 592,
    widthMax: '100%',
    linkInsertButtons: [],
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    videoResponsive: true,
    toolbarSticky: true,
    toolbarInline: false,
    toolbarVisibleWithoutSelection: true,
    toolbarButtons: {
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
        },
        'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
        },
        'moreRich': {
            'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
        },
        'moreMisc': {
            'buttons': ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help'],
            'align': 'right',
            'buttonsVisible': 2
        }
    },
    events: {
        initialized: function () {
            replyEditor = this;
        },
        blur: () => {
            console.log(replyEditor.html.get(true));
        },
        'image.beforeUpload': (e, editor) => {
            console.log('image upload');
            // console.log(e);
            // console.log(editor);
            replyEditor.image.insert('https://images.unsplash.com/photo-1661961110144-12ac85918e40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', null, null, replyEditor.image.get());
            return false
        },
        'video.beforeUpload': (e, editor) => {
            console.log(replyEditor.video);
            replyEditor.video.insert('https://youtu.be/w4lbJZ8OPMk', null, null, replyEditor.video.get());
            replyEditor.video.get()
            return false
        },
        'paste.beforeCleanup': function (clipboardHtml) {
            return _convertHtmlToPlainText(clipboardHtml);
        }
    }
}

let replyEditor = "";

const RichText = () => {
    return (
        <FroalaEditor
            config={config}
        />
    );
}

export default RichText;
