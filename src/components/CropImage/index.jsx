import { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import cls from './CropImage.module.scss'
import "react-image-crop/dist/ReactCrop.css";

const aspect = 225 / 139

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
    onCancel = () => {},
    onCrop = () => {},
    name = 'resized.png'
}) => {
    const [crop, setCrop] = useState({unit: 'px'})
    const [croppedImage, setCroppedImage] = useState(null);
    const [file, setFile] = useState()
    const timeoutRef = useRef()
    const modelRef = useRef()
    const imgRef = useRef()

    const handleClick = (e) => {
        // if(!modelRef.current.contains(e.target)) {
        //     onCancel()
        // }
    }

    const onImageLoad = (e) => { 
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
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
                    console.log(crop);
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
                            if(blob) {
                                const file = new File([blob], name, { type: 'image/png' });
                                const url = URL.createObjectURL(blob);
                                setCroppedImage(url)
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
        <div className={cls.overlay} onClick={handleClick}>
            <div className={cls.modal} ref={modelRef}>
                <div className={cls.modal__crop}>
                    <ReactCrop
                        ruleOfThirds={true}
                        crop={crop}
                        aspect={aspect}
                        onChange={setCrop}
                        maxWidth={400}
                    >
                        <img
                            ref={imgRef}
                            onLoad={onImageLoad}
                            src={url}
                            alt=""
                        />
                    </ReactCrop>
                </div>

                {croppedImage && <img src={croppedImage} />}

                <div className={cls.modal__btns}>
                    <button className={cls.modal__grey} onClick={onCancel}>Cancel</button>
                    <button className={cls.modal__red} onClick={() => {onCrop(file); onCancel()}}>Crop</button>
                </div>
            </div>
        </div>
    );
}

export default CropImage;
