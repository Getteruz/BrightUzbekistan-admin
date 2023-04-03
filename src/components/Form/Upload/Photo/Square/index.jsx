import { useEffect } from 'react';
import { useState } from 'react';
import CircleLoader from '../../../../CircleLoader';
import Flex from '../../../../Flex';
import Button from '../../Button';
import cls from './Square.module.scss'

const SquarePhotoUpload = ({
    onChange = () => {},
    onDelete = () => {},
    url = '',
    loading = false
}) => {

    return (
        <Flex gap='10' direction='column'>
            <label style={{ cursor: 'pointer' }}>
                <span className={cls.text}>Фото к зоголовку</span>
                <div className={cls.box}>
                    <div className={cls.box__preview} onDoubleClick={() => onDelete(url)}>
                        {
                            url ? (
                                <img
                                    src={url}
                                />
                            ) : (
                                loading ? <CircleLoader /> :  <span>Нет фото</span>
                            )
                        }
                    </div>
                    <label>
                        {!url && <input type="file" accept='image/png, image/jpeg, image/jpg' className={cls.input} onChange={onChange} />}
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
