import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RedButton from '../../../../components/Buttons/RedButton'
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import NewsDropdown from '../../../../components/Drobdowns/NewsDropdown';
import Wrapper from '../../../../components/Drobdowns/Wrapper';
import Flex from '../../../../components/Flex';
import BtnGroup from '../../../../components/Form/BtnGroup';
import Input from '../../../../components/Form/Input';
import RichText from '../../../../components/Form/RichText';
import TextArea from '../../../../components/Form/TextArea';
import SquarePhotoUpload from '../../../../components/Form/Upload/Photo/Square';
import { BookIcon, PlayIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loader';
import Modal from '../../../../components/Modal';
import { createNews } from '../../../../services/news';
import { removeFile, uploadImage } from '../../../../services/upload';
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import { langs } from './data';
import cls from './Content.module.scss'
import useSocket from '../../../../hooks/useSocket';

const Content = ({ useForm = {} }) => {
    const socket = useSocket()
    const {id} = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const { register, handleSubmit, setValue, watch, getValues, formState } = useForm
    const watchedFiles = watch()
    
    const func = async (data, state) => {
        try {
            setIsLoading(true)
            const fd = new FormData()
            fd.append('state', state)
            if (data?.mainCtg) fd.append('mainCategory', data?.mainCategory)
            fd.append(params.get('lang') + '_img', data?.img)
            fd.append('categories', JSON.stringify(data?.categories || []))
            fd.append(params.get('lang'), JSON.stringify({
                title: data?.title,
                description: data?.description,
                shortDescription: data?.shortDescription,
                shortLink: data?.shortLink,
                tags: data?.hashtags || [],
                descImg: data?.descImg || []
            }))
            // const res = await createNews(fd)
            alert(JSON.stringify(data, null, 4))
            // if (!res?.error) {
            //     setOpenModal(true)
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const uploadSelectedImage = async (e) => {
        const file = e.target?.files?.[0]
        if (file) {
            const data = await uploadImage(file)
            if(data?.url){
                setValue(`${params.get('lang')}.file`, data?.url)
            }
        }
    }

    const deleteImage = async (url) => {
        await removeFile(url)
        setValue(`${params.get('lang')}.file`, null)
    }

    useEffect(() => {
        socket.on('input_change', data => {
            setValue(data?.inputName, data?.value)
        })
    }, [])

    useEffect(() => {
    }, [formState.isDirty])
    
    
    return (
        <ContentWrapper navbar={
            <div className={cls.content__group} id='news_nav'>
                <Flex gap='5' rowCount='2' alignItems='center'>
                    <RedButton onClick={handleSubmit((data) => func(data, 'general access'))} disabled={!watchedFiles?.ru?.title}>Сохранить</RedButton>
                    <RoundedButton onClick={handleSubmit((data) => func(data, 'favorites'))}><BookIcon /> Избранные</RoundedButton>
                </Flex>
                <SimpleButton><PlayIcon /> Быстрый просмотр</SimpleButton>
            </div>
        }>
            {isLoading && <Loader text='Идет создание новости' />}
            {openModal && <Modal title='Новость успешно создан' onClose={() => navigate('/news')} onOk={() => navigate('/news')} />}
            {/* {<div style={{position: 'relative'}}><Wrapper><NewsDropdown news={[getValues()]} /></Wrapper></div>} */}
            <div className={cls.content__form}>
                <BtnGroup>
                    {
                        langs?.length > 0 && langs.map(lang =>
                            <button
                                key={lang.id}
                                onClick={() => setSearchParams({ ...paramsToObject(params.entries()), lang: lang.lang }, { replace: true })}
                                className={lang?.lang === params.get('lang') ? cls.active__btn : ""}
                            >
                                {lang?.label}
                            </button>
                        )
                    }
                </BtnGroup>
                <div className={cls.content__form__wrapper}>
                    <Flex direction='column' gap='20'>
                        <Input
                            placeholder='Загаловок новости'
                            label='Загаловок новости'
                            value={watchedFiles?.[params?.get('lang')]?.title || ''}
                            register={{ ...register(`${params.get('lang')}.title`) }}
                            onChange={(e) => socket.emit('change', {roomId: id, inputName: `${params.get('lang')}.title`, value: e.target.value})}
                        />
                        <TextArea
                            placeholder='Краткое описание'
                            label='Краткое описание'
                            value={watchedFiles?.[params.get('lang')]?.['shortDescription'] || ''}
                            register={{ ...register(`${params.get('lang')}.shortDescription`) }}
                            onChange={(e) => socket.emit('change', {roomId: id, inputName: `${params.get('lang')}.shortDescription`, value: e.target.value})}
                        />
                        <Input
                            placeholder='Короткий линк'
                            label='Короткий линк'
                            value={watchedFiles?.[params.get('lang')]?.['shortLink'] || ''}
                            register={{ ...register(`${params.get('lang')}.shortLink`) }}
                            onChange={(e) => socket.emit('change', {roomId: id, inputName: `${params.get('lang')}.shortLink`, value: e.target.value})}
                        />
                    </Flex>
                    <SquarePhotoUpload
                        setValue={setValue}
                        onChange={uploadSelectedImage}
                        onDelete={deleteImage}
                        url={watchedFiles?.[params.get('lang')]?.file}
                    />
                </div>
                <RichText
                    value={watchedFiles?.[params.get('lang')]?.['description'] || ''}
                    register={{ ...register(`${params.get('lang')}.description`) }} 
                    onChange={(e) => socket.emit('change', {roomId: id, inputName: `${params.get('lang')}.description`, value: e})}
                    setValue={setValue}
                    getValues={getValues}
                    name={`${params.get('lang')}.description`}
                />
            </div>
        </ContentWrapper>
    );
}

export default Content;
