import { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import { removeFile, uploadImage } from '../../services/upload';
import { store } from '../../store';
import { useShowAlert } from '../../store/alert/alert.thunk';
import CircleLoader from '../Loaders/CircleLoader';
import cls from './CropImage.module.scss'

const aspect = 10 / 9
const showAlert = useShowAlert(store.dispatch)

function centerAspectCrop(
    mediaWidth = '100%',
    mediaHeight,
    aspect,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: 400,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

const CropImage = ({
    url = '',
    onCancel = () => { },
    onCrop = () => { },
    name = 'resized.png'
}) => {
    const [crop, setCrop] = useState({ unit: 'px' })
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState()
    const [fileUrl, setFileUrl] = useState()
    const timeoutRef = useRef()
    const modelRef = useRef()
    const imgRef = useRef()

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    const uploadCroppedImage = async () => {
        try {
            setIsLoading(true)
            const date = new Date(Date.now())
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            if (file) {
                const data = await uploadImage(file, `${year}/${month}/${day}`)
                if (data?.url) {
                    setFileUrl(data?.url)
                    onCrop(data?.url)
                } else {
                    showAlert({message: "Что-то пошло не так при загрузки картинки"})
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
            onCancel()
        }
    }

    const handelCancel = async() => {
        if(fileUrl) {
            await removeFile(file)
        }
        onCancel()
    }

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            try {
                const canvas = document.createElement("canvas");
                const imageElement = document.createElement("img");
                imageElement.src = url;
                imageElement.crossOrigin = "anonymous"
                const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
                const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
                canvas.width = crop.width;
                canvas.height = crop.height;
                const ctx = canvas.getContext("2d");
                const pixelRatio = 2;
                canvas.width = crop.width * pixelRatio;
                canvas.height = crop.height * pixelRatio;
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                ctx.imageSmoothingQuality = 'high';

                imageElement.onload = () => {
                    ctx.drawImage(
                        imageElement,
                        crop.x * scaleX,
                        crop.y * scaleY,
                        crop.width * scaleX,
                        crop.height * scaleY,
                        0,
                        0,
                        crop.width,
                        crop.height
                    );

                    canvas.toBlob(blob => {
                        try {
                            if (blob) {
                                const file = new File([blob], name, { type: 'image/png' });
                                setFile(file)
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }, 300)

        return () => clearTimeout(timeoutRef.current)
    }, [crop])

    return (
        <div className={cls.overlay}>
            <div className={cls.modal} ref={modelRef}>
                <div className={cls.modal__crop}>
                    {isLoading ? (
                        <CircleLoader />
                    ) : (
                        <ReactCrop
                            ruleOfThirds={true}
                            crop={crop}
                            aspect={aspect}
                            onChange={setCrop}
                        >
                            <img
                                ref={imgRef}
                                onLoad={onImageLoad}
                                src={url}
                                alt=""
                            />
                        </ReactCrop>
                    )}
                </div>

                {/* {croppedImage && <img src={croppedImage} />} */}

                <div className={cls.modal__btns}>
                    <button className={cls.modal__grey} onClick={handelCancel}>Cancel</button>
                    <button className={cls.modal__red} onClick={uploadCroppedImage}>Crop</button>
                </div>
            </div>
        </div >
    );
}

export default CropImage;
