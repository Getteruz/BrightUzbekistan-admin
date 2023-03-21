import { useRef, useState } from 'react';
import Button from '../../Button';
import cls from './Circle.module.scss'

const Circle = ({ label = '', register = {}, setValue = () => {}, name = 'avatar' }) => {
    const inputRef = useRef()
    const [selectedFile, setSelectedFile] = useState(null)

    const handleChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            setValue(name, file)
            setSelectedFile({name: file.name, img: file})
        } else {
            setValue(name, null)
        }
    }

    return (
        <div className={cls.wrapper}>
            {label}
            <label className={cls.label}>
                <div className={cls.label__circle}>
                    {selectedFile ? (
                        <img 
                            onDoubleClick={() => {setSelectedFile(null); setValue(name, null)}}
                            className={cls.label__circle__avatar} 
                            src={URL.createObjectURL(selectedFile?.img)} 
                            alt={selectedFile?.name || ''} 
                        />
                    ) : <>
                        <Button />
                        <p className={cls.label__title}>Загрузить фото</p>
                        <p className={cls.label__name}>avatar</p>
                        <input ref={inputRef} type='file' accept='image/png, image/jpeg, image/jpg' {...register} onChange={(e) => handleChange(e)} />
                    </>}
                </div>
            </label>
        </div>
    );
}

export default Circle;
