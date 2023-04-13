import { useEffect } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
// import 'froala-editor/js/plugins/image.min.js';
import { _convertHtmlToPlainText } from "../../../utils/htmlToPlainText";
import axios from "axios";

const config = (setValue, getValues) => ({
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
    placeholderText: false,
    linkInsertButtons: [],
    pastePlain: true,
    imageResize: true,
    imageDefaultWidth: '100%',
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    videoResponsive: true,
    toolbarSticky: true,
    toolbarInline: false,
    toolbarVisibleWithoutSelection: true,
    imageManagerDeleteMethod: false,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    toolbarButtons: {
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
        },
        'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
        },
        'moreRich': {
            'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
        },
        'moreMisc': {
            'buttons': ['undo', 'redo', 'selectAll', 'help'],
            'align': 'right',
            'buttonsVisible': 2
        }
    },
    events: {
        initialized: function () {
            replyEditor = this;
        },
        blur: () => {
            // console.log(replyEditor.html.get(true));
        },
        'image.beforeUpload': function (e, editor) {
            const fd = new FormData()
            fd.append('image', e[0])
            axios.post(`${import.meta.env.VITE_STORE_API}/upload/image`, fd, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }                
            }).then(res => replyEditor.image.insert(String(res?.data?.url), false, null, replyEditor.image.get()))
            
        },
        'image.inserted': function(img) {
            const values = getValues()
            let descImg = values?.descImg || []
            descImg?.push(img?.[0]?.src)
            setValue('descImg', descImg)
        },
        'image.removed': (img) => {
            const values = getValues()
            let descImg = values?.descImg || []
            descImg = descImg?.filter(e => e !== img?.[0]?.currentSrc)
            setValue('descImg', descImg)
            axios.delete(`${import.meta.env.VITE_STORE_API}/remove`, {data: {url: img[0]?.currentSrc}})
        },
        'image.error': () => {

        },
        'video.beforeUpload': (e, editor) => {
            const file = e[0];
            const fd = new FormData()
            fd.append('video', file)

            axios.post(`${import.meta.env.VITE_STORE_API}/upload/video`, fd, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            }).then(res => replyEditor.video.insert(String(res?.data?.url), null, null, replyEditor.video.get()))
        },
        'paste.beforeCleanup': function (clipboardHtml) {
            return replyEditor.html.setValue(clipboardHtml)
        },

    }
})

let replyEditor = "";

const RichText = ({ 
    register, 
    setValue = () => {}, 
    getValues = () => {},
    value = '' ,
    name = '',
    onChange = () => {}
}) => {
    useEffect(() => {
        if(import.meta.env.PROD) {
            return import('./removeLisence.scss')
        }
    }, [])
    return (
        <FroalaEditor
            model={value}
            onModelChange={(model) => {onChange(model); setValue(name, model)}}
            config={config(setValue, getValues)}
            {...register}
        />
    );
}

export default RichText;
