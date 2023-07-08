import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import latinCrill from 'latin-crill'
import RedButton from '../../../../components/Buttons/RedButton'
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import NewsDropdown from '../../../../components/Drobdowns/NewsDropdown';
import Wrapper from '../../../../components/Drobdowns/Wrapper';
import Filter from '../../../../components/Filter/Filter';
import Flex from '../../../../components/Flex';
import BtnGroup from '../../../../components/Form/BtnGroup';
import Input from '../../../../components/Form/Input';
import RichText from '../../../../components/Form/RichText';
import TextArea from '../../../../components/Form/TextArea';
import SquarePhotoUpload from '../../../../components/Form/Upload/Photo/Square';
import { BookIcon, PlayIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loaders/Loader';
import Modal from '../../../../components/Modals/Modal';
import { editNews } from '../../../../services/news';
import { removeFile, uploadImage } from '../../../../services/upload';
import paramsToObject from '../../../../utils/paramsToObject';
import { langs } from './data';
import cls from './Content.module.scss'

const Content = ({ useForm = {} }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const { register, handleSubmit, setValue, watch, getValues } = useForm
    const watchedFiles = watch()

    const func = async (data, state) => {
        try {
            setIsLoading(true)
            const res = await editNews(data, id)

            if (res?.status === 203) {
                setOpenModal(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const uploadSelectedImage = async (e) => {
        try {
            setImageLoading(true)
            const file = e.target?.files?.[0]
            const date = new Date(Date.now())
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            if (file) {
                const data = await uploadImage(file, `${year}/${month}/${day}`)
                if (data?.url) {
                    setValue(`file`, data?.url)
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setImageLoading(false)
        }
    }

    const deleteImage = async (url) => {
        await removeFile(url)
        setValue(`file`, null)
    }

    useEffect(() => {
        setValue('уз.title', latinCrill(watchedFiles?.uz?.title || ''))
        setValue('уз.shortDescription', latinCrill(watchedFiles?.uz?.shortDescription || ''))
        setValue('уз.shortLink', latinCrill(watchedFiles?.uz?.shortLink || ''))
        setValue('уз.description', latinCrill(watchedFiles?.uz?.description || '', true))
    }, [
        watchedFiles?.uz?.title,
        watchedFiles?.uz?.shortDescription,
        watchedFiles?.uz?.shortLink,
        watchedFiles?.uz?.description
    ])

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
            {isLoading && <Loader text='Идёт изменение новости' />}
            {openModal && <Modal title='Новость успешно изменён' onClose={() => navigate('/news')} onOk={() => navigate('/news')} />}
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
                <Filter />
                <div className={cls.content__form__wrapper}>
                    <Flex direction='column' gap='20'>
                        <Input
                            placeholder='Загаловок новости'
                            label='Загаловок новости'
                            value={watchedFiles?.[params?.get('lang')]?.['title'] || ''}
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
                    <Flex gap='20'>
                        <SquarePhotoUpload
                            setValue={setValue}
                            onChange={uploadSelectedImage}
                            onDelete={deleteImage}
                            loading={imageLoading}
                            url={watchedFiles?.file}
                        />
                        <Input
                            label='Описание для фото'
                            placeholder='Описание для фото'
                            value={watchedFiles?.[params.get('lang')]?.['photoDesc'] || ''}
                            register={{ ...register(`${params.get('lang')}.photoDesc`) }}
                        />
                    </Flex>
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
