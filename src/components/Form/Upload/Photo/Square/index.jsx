import { useEffect } from 'react';
import { useState } from 'react';
import Flex from '../../../../Flex';
import Button from '../../Button';
import cls from './Square.module.scss'

const SquarePhotoUpload = ({
    register,
    value = '',
    setValue = () => { },
    name = ''
}) => {
    const [selectedfile, setSelectedFile] = useState(value)

    const handleChange = (e) => {
        const file = e.target.files[0]
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              const dataURL = reader.result;
              setSelectedFile({ name: file.name, url: dataURL, type: file.type })
            };
            setValue(name, file)
        } else {
            setValue(name, null)
        }
    }

    useEffect(() => {
        setSelectedFile(value)
    }, [value])

    return (
        <Flex gap='10' direction='column'>
            <label style={{ cursor: 'pointer' }}>
                <span className={cls.text}>Фото к зоголовку</span>
                <div className={cls.box}>
                    <div className={cls.box__preview} onDoubleClick={() => { setSelectedFile({}); setValue(name, null) }}>
                        {
                            selectedfile?.url ? (
                                <img
                                    src={selectedfile?.url}
                                    alt={selectedfile?.name || ''}
                                />
                            ) : (
                                <span>Нет фото</span>
                            )
                        }
                    </div>
                    <label>
                        {!selectedfile?.url && <input type="file" accept='image/png, image/jpeg, image/jpg' className={cls.input} {...register} onChange={handleChange} />}
                        <Button />
                        <Flex direction='column' gap='2'>
                            <p className={cls.box__title}>Загрузить фото</p>
                            <span className={cls.box__name}>{selectedfile.name}</span>
                        </Flex>
                    </label>
                </div>
            </label>
        </Flex>
    );
}

export default SquarePhotoUpload;
