import { useEffect } from 'react';
import { useState } from 'react';
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
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './Content.module.scss'
import { langs } from './data';

const Content = ({ useForm = {} }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const {register, handleSubmit, setValue, watch, getValues} = useForm
    const watchedFiles = watch()
    
    const func = async (data, state) => {
        try {
            setIsLoading(true)
            const fd = new FormData()
            fd.append('state', state)
            if(data?.mainCtg) fd.append('mainCategory', data?.mainCtg)
            fd.append(params.get('lang') + '_img', data?.img)
            fd.append('categories', JSON.stringify(data?.categories || []))
            fd.append(params.get('lang'), JSON.stringify({
                title: data?.title, 
                description: data?.description, 
                shortDescription: data?.shortDesc,
                shortLink: data?.shortLink,
                tags: data?.hashtags || [],
                descImg: data?.descImg || []
            }))
            const res = await createNews(fd)
            
            if(!res?.error){
                setOpenModal(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setSearchParams({
            ...paramsToObject(params.entries()), 
            'categories': [...(getQueryInArray('categories') || []), import.meta.env.VITE_LAST_NEWS_ID]?.join(','),
            lang: 'uz'
        }, {replace: true})
    }, [])

    return (
        <ContentWrapper navbar={
            <div className={cls.content__group} id='news_nav'>
                <Flex gap='5' rowCount='2' alignItems='center'>
                    <RedButton onClick={handleSubmit((data) => func(data, 'general access'))}>Сохранить</RedButton>
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
                                onClick={() => setSearchParams({...paramsToObject(params.entries()), lang: lang.lang}, {replace: true})}
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
                    <SquarePhotoUpload setValue={setValue}  name='img' />
                </div>
                <RichText 
                    register={register} 
                    setValue={setValue}
                    getValues={getValues}
                    name='description'
                />
            </div>
        </ContentWrapper>
    );
}

export default Content;
