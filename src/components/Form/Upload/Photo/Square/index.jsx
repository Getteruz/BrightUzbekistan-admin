import { useEffect } from 'react';
import { useState } from 'react';
import CircleLoader from '../../../../Loaders/CircleLoader';
import Flex from '../../../../Flex';
import Button from '../../Button';
import cls from './Square.module.scss'
import CropImage from '../../../../CropImage';

const SquarePhotoUpload = ({
    setValue = () => { },
    onChange = () => { },
    onDelete = () => { },
    url = '',
    loading = false,
    label = 'Фото к зоголовку'
}) => {
    const [isOpenModal, setIsOpenModal] = useState()
    const [file, setFile] = useState()

    const handleChange = (e) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files?.[0])
            setIsOpenModal(true)
        } else {
            setIsOpenModal(false)
        }
    }

    return (
        <Flex gap='10' direction='column'>
            {isOpenModal && (
                <CropImage
                    url={URL.createObjectURL(file)}
                    name={file?.name}
                    onCancel={() => setIsOpenModal(false)}
                    onCrop={(url) => {
                        setValue('imageForGenerate', url);
                        onChange({ target: { files: [file] }})
                    }}
                />
            )}
            <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {label && <span className={cls.text}>{label}</span>}
                <div className={cls.box}>
                    <div className={cls.box__preview} onDoubleClick={() => onDelete(url)}>
                        {
                            url ? (
                                <img
                                    src={url}
                                />
                            ) : (
                                loading ? <CircleLoader /> : <span>Нет фото</span>
                            )
                        }
                    </div>
                    <label>
                        {!url && <input type="file" accept='image/png, image/jpeg, image/jpg' className={cls.input} onChange={handleChange} />}
                        <Button />
                        <Flex direction='column' gap='2'>
                            <p className={cls.box__title}>Загрузить фото</p>
                            <span className={cls.box__name}>{''}</span>
                        </Flex>
                    </label>
                </div>
            </label>
        </Flex>
    );
}

export default SquarePhotoUpload;