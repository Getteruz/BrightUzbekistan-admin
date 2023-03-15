import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import { _convertHtmlToPlainText } from "../../../utils/htmlToPlainText";
import GetterFileUpload from "getter-fileupload-client";
import { Buffer } from "buffer";
import axios from "axios";

const fileServise = new GetterFileUpload('https://storage.bright.getter.uz')

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
        'image.beforeUpload': function(e, editor) {
            const fd = new FormData()
            fd.append('image', e[0])

            axios.post('https://storage.bright.getter.uz/upload/image', fd, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(res =>  replyEditor.image.insert(String(res?.data?.url), null, null, replyEditor.image.get()))
        },
        'video.beforeUpload': (e, editor) => {
            const file = e[0];
            const fd = new FormData()
            fd.append('video', file)

            axios.post('https://storage.bright.getter.uz/upload/video', fd, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(res => replyEditor.video.insert(String(res?.data?.url), null, null, replyEditor.video.get()))
            // .then(() => replyEditor.video.get());
            return false
        },
        'paste.beforeCleanup': function (clipboardHtml) {
            return _convertHtmlToPlainText(clipboardHtml);
        },

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
