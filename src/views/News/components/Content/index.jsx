import axios from 'axios';
import { useState } from 'react';
import RedButton from '../../../../components/Buttons/RedButton'
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Flex from '../../../../components/Flex';
import BtnGroup from '../../../../components/Form/BtnGroup';
import Input from '../../../../components/Form/Input';
import RichText from '../../../../components/Form/RichText';
import TextArea from '../../../../components/Form/TextArea';
import SquarePhotoUpload from '../../../../components/Form/Upload/Photo/Square';
import { BookIcon, PlayIcon } from '../../../../components/icons';
import Loader from '../loader';
import cls from './Content.module.scss'

const Content = ({ register, handleSubmit }) => {
    const [isLoading, setIsLoading] = useState(false)

    const func = async (data) => {
        try {
            setIsLoading(true)
            const fd = new FormData()
            fd.append('img', data.img[0])
            fd.append('title', data.title)
            fd.append('shortDesc', data.shortDesc)
            fd.append('shortLink', data.shortLink)
            fd.append('hastags', data.hashtags)

            data.categories && data.categories?.forEach(el => {
                fd.append('categories', el)
            })

            let res = await axios.post(('https://bright-test.onrender.com/news' || "http://localhost:8080/news"), fd)

            if(res.status === 200) {
                alert('News created')
            }
        } catch (error) {
            console.log(error);
        } finally{
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
            {isLoading && <Loader />}
            <div className={cls.content__form}>
                <BtnGroup>
                    <button type='button'>O‘zbekcha</button>
                    <button type='button'>Ўзбекча</button>
                    <button type='button'>Русский</button>
                    <button type='button'>English</button>
                </BtnGroup>
                <div className={cls.content__form__wrapper}>
                    <Flex direction='column' gap='20'>
                        <Input placeholder='Загаловок новости' label='Загаловок новости' register={{ ...register('title') }} />
                        <TextArea placeholder='Краткое описание' label='Краткое описание' register={{ ...register('shortDesc') }} />
                        <Input placeholder='Короткий линк' label='Короткий линк' register={{ ...register('shortLink') }} />
                    </Flex>
                    <SquarePhotoUpload register={{ ...register('img') }} />
                </div>
                <RichText />
            </div>
        </ContentWrapper>
    );
}

export default Content;
