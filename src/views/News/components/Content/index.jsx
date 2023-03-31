import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RedButton from '../../../../components/Buttons/RedButton'
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import DateGroup from '../../../../components/DateGroup';
import Filter from '../../../../components/Filter/Filter';
import Flex from '../../../../components/Flex';
import BtnGroup from '../../../../components/Form/BtnGroup';
import Datapicker from '../../../../components/Form/Datapicker';
import Input from '../../../../components/Form/Input';
import RichText from '../../../../components/Form/RichText';
import TextArea from '../../../../components/Form/TextArea';
import SquarePhotoUpload from '../../../../components/Form/Upload/Photo/Square';
import { BookIcon, PlayIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loader';
import Modal from '../../../../components/Modal';
import { createNews } from '../../../../services/news';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './Content.module.scss'
import { langs } from './data';
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith';

const Content = ({ useForm = {} }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const { register, handleSubmit, setValue, watch } = useForm
    const watchedFiles = watch()
    const windowWidth = useGetWindowWidth()
    useEffect(() => {
        if (!params.get('lang')) {
            setSearchParams({ lang: 'uz' }, { replace: true })
        }
    }, [!!params.get('lang')])

    const func = async (data) => {
        try {
            setIsLoading(true)
            const fd = new FormData()
            console.log(data);
            // fd.append(params.get('lang') + '_img', data.img[0])
            // fd.append('categories', JSON.stringify(data?.categories))
            // fd.append(params.get('lang'), JSON.stringify({
            //     title: data.title, 
            //     description: data.description, 
            //     shortDescription: data.shortDesc,
            //     shortLink: data.shortLink,
            //     tags: data.hashtags
            // }))

            // const res = await createNews(fd)

            // if(!res?.error){
            //     setOpenModal(true)
            // }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ContentWrapper navbar={
            <>
                <div className={cls.content__group} id='news_nav'>
                    <Flex gap='5' rowCount='2' alignItems='center'>
                        <RedButton onClick={handleSubmit(func)}>Сохранить</RedButton>
                        <RoundedButton><BookIcon /> Избранные</RoundedButton>
                    </Flex>
                    <SimpleButton><PlayIcon /> {windowWidth > 390 ? "Быстрый просмотр " : "Просмотр"} </SimpleButton>
                </div>

            </>

        }>
            {isLoading && <Loader text='Идет создание новости' />}
            {openModal && <Modal title='Новость успешно создан' onClose={() => navigate('/news')} onOk={() => navigate('/news')} />}



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
                        <Input placeholder='Загаловок новости' label='Загаловок новости' register={{ ...register('title') }} />
                        <TextArea placeholder='Краткое описание' label='Краткое описание' register={{ ...register('shortDesc') }} />
                        <Input placeholder='Короткий линк' label='Короткий линк' register={{ ...register('shortLink') }} />
                    </Flex>
                    <SquarePhotoUpload setValue={setValue} name='img' />
                </div>
                <RichText
                    register={register}
                    setValue={setValue}
                    name='description'
                />
            </div>
        </ContentWrapper>
    );
}

export default Content;
