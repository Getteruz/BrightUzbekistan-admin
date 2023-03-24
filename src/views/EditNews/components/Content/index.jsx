import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate, useSearchParams } from 'react-router-dom';
import RedButton from '../../../../components/Buttons/RedButton'
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Filter from '../../../../components/Filter/Filter';
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
import cls from './Content.module.scss'
import { langs } from './data';

const Content = ({ register, handleSubmit, setValue }) => {
    const [params, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [cookie, setCookie] = useCookies(['user'])

    useEffect(() => {
        if (!params.get('lang')) {
            setSearchParams({ lang: 'uz' }, { replace: true })
        }
    }, [!!params.get('lang')])

    const func = async (data) => {
        try {
            const creator = cookie?.user?.id
            setIsLoading(true)
            const fd = new FormData()
            fd.append(params.get('lang') + '_img', data.img[0])
            fd.append('creator', creator)
            fd.append(params.get('lang'), JSON.stringify({
                title: data.title,
                description: data.description,
                shortDescription: data.shortDesc,
                shortLink: data.shortLink,
                tags: data.hashtags
            }))

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

    return (
        <ContentWrapper navbar={
            <div className={cls.content__group} id='news_nav'>
                <Flex gap='5' rowCount='2' alignItems='center'>
                    <RedButton onClick={handleSubmit(func)}>Сохранить</RedButton>
                    <RoundedButton><BookIcon /> Избранные</RoundedButton>
                </Flex>
                <SimpleButton><PlayIcon /> Быстрый просмотр</SimpleButton>
            </div>
        }>
            {isLoading && <Loader text='Идет создание новости' />}
            {openModal && <Modal title='Новость успешно создан' onClose={() => navigate('/news')} onOk={() => navigate('/news')} />}
            <div className={cls.content__form}>
                <BtnGroup>
                    {
                        langs?.length > 0 && langs.map(lang =>
                            <button
                                key={lang.id}
                                onClick={() => setSearchParams({ lang: lang.lang }, { replace: true })}
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
                        <Input placeholder='Загаловок новости' label='Загаловок новости' register={{ ...register('title') }} />
                        <TextArea placeholder='Краткое описание' label='Краткое описание' register={{ ...register('shortDesc') }} />
                        <Input placeholder='Короткий линк' label='Короткий линк' register={{ ...register('shortLink') }} />
                    </Flex>
                    <SquarePhotoUpload register={{ ...register('img') }} />
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
