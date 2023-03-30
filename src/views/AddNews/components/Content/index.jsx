import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { saveToLocalStorage } from '../../../../utils/localStorageService';
import { langs } from './data';
import cls from './Content.module.scss'

const Content = ({ useForm = {} }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const { register, handleSubmit, setValue, watch, getValues } = useForm
    const watchedFiles = watch()

    const func = async (data, state) => {
        try {
            console.log(data);
            setIsLoading(true)
            const fd = new FormData()
            fd.append('state', state)
            if (data?.mainCategory) fd.append('mainCategory', data?.mainCategory)
            // fd.append(params.get('lang') + '_img', data?.img)
            fd.append('categories', JSON.stringify(data?.categories || []))
            fd.append('ru', JSON.stringify(data?.ru))
            fd.append('uz', JSON.stringify(data?.uz))
            fd.append('en', JSON.stringify(data?.en))
            fd.append('уз', JSON.stringify(data?.уз))
            const res = await createNews(fd)

            if (!res?.error) {
                setOpenModal(true)
            }
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
        console.log(watchedFiles);
        saveToLocalStorage('new_news', watchedFiles)
    }, [watchedFiles])

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
                            value={watchedFiles?.[params.get('lang')]?.['title'] || ''}
                            register={{ ...register(`${params.get('lang')}.title`) }}
                        />
                        <TextArea
                            placeholder='Краткое описание'
                            label='Краткое описание'
                            value={watchedFiles?.[params.get('lang')]?.['shortDescription'] || ''}
                            register={{ ...register(`${params.get('lang')}.shortDescription`) }}
                        />
                        <Input
                            placeholder='Короткий линк'
                            label='Короткий линк'
                            value={watchedFiles?.[params.get('lang')]?.['shortLink'] || ''}
                            register={{ ...register(`${params.get('lang')}.shortLink`) }}
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
                    setValue={setValue}
                    getValues={getValues}
                    name={`${params.get('lang')}.description`}
                />
            </div>
        </ContentWrapper>
    );
}

export default Content;
