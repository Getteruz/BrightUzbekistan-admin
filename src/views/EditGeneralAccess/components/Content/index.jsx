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
import { editNews } from '../../../../services/news';
import { removeFile, uploadImage } from '../../../../services/upload';
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import { langs } from './data';
import cls from './Content.module.scss'
import useSocket from '../../../../hooks/useSocket';
import { useSelector } from 'react-redux';

const Content = ({ useForm = {} }) => {
    const socket = useSocket()
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [users, setUsers] = useState({})
    const [params, setSearchParams] = useSearchParams()
    const { register, handleSubmit, setValue, watch, getValues } = useForm
    const watchedFiles = watch()

    const func = async (data) => {
        try {
            setIsLoading(true)
            const res = await editNews(data, id)
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
        try {
            setImageLoading(true)
            const file = e.target?.files?.[0]
            if (file) {
                const data = await uploadImage(file)
                if (data?.url) {
                    setValue(`${params.get('lang')}.file`, data?.url)
                    socket.emit('change', { roomId: id, inputName: `${params.get('lang')}.file`, value: data?.url, userId: user?.id })
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
        setValue(`${params.get('lang')}.file`, null)
        socket.emit('change', { roomId: id, inputName: `${params.get('lang')}.file`, value: null, userId: user?.id })
    }

    useEffect(() => {
        socket.on('input_change', data => {
            setValue(data?.inputName, data?.value)
            // if (data?.inputName === 'categories') {
            //     setSearchParams({
            //         ...paramsToObject(params?.entries()),
            //         'categories': data?.value?.join(',')
            //     }, { replace: true })
            // } else if (data?.inputName === 'mainCategory') {
            //     setSearchParams({
            //         ...paramsToObject(params?.entries()),
            //         'mainCategory': data?.value || ''
            //     }, { replace: true })
            // }
        })
        socket.on('input_focus', data => {
            setUsers(state => {
                const users = state?.[data?.inputName] || []
                return {
                    ...state,
                    [data?.inputName]: [...users, data?.user]
                }
            })
        })
        socket.on('input_blur', data => {
            setUsers(state => {
                const users = state?.[data?.inputName] || []
                return {
                    ...state,
                    [data?.inputName]: users?.filter(user => user?.id !== data?.userId)
                }
            })
        })
    }, [])


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
            {isLoading && <Loader text='Идет изменение новостя' />}
            {openModal && <Modal title='Новость успешно изменен' onClose={() => navigate('/news')} onOk={() => navigate('/news')} />}
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
                            register={{
                                ...register(`${params.get('lang')}.title`, {
                                    onChange: (e) => socket.emit('change', { roomId: id, inputName: `${params.get('lang')}.title`, value: e.target.value, userId: user?.id })
                                })
                            }}
                            onFocus={() => socket.emit('focus', { roomId: id, userId: user?.id, inputName: `${params.get('lang')}.title` })}
                            onBlur={() => socket.emit('blur', { roomId: id, userId: user?.id, inputName: `${params.get('lang')}.title` })}
                            users={users?.[`${params.get('lang')}.title`]}
                        />
                        <TextArea
                            placeholder='Краткое описание'
                            label='Краткое описание'
                            value={watchedFiles?.[params.get('lang')]?.['shortDescription'] || ''}
                            register={{ ...register(`${params.get('lang')}.shortDescription`, {
                                onChange: (e) => socket.emit('change', { roomId: id, inputName: `${params.get('lang')}.shortDescription`, value: e.target.value, userId: user?.id }),
                            }) }}
                            onFocus={() => socket.emit('focus', { roomId: id, userId: user?.id, inputName: `${params.get('lang')}.shortDescription` })}
                            onBlur={() => socket.emit('blur', { roomId: id, userId: user?.id, inputName: `${params.get('lang')}.shortDescription` })}
                            users={users?.[`${params.get('lang')}.shortDescription`]}
                        />
                        <Input
                            placeholder='Короткий линк'
                            label='Короткий линк'
                            value={watchedFiles?.[params.get('lang')]?.['shortLink'] || ''}
                            register={{ ...register(`${params.get('lang')}.shortLink`, {
                                onChange: (e) => socket.emit('change', { roomId: id, inputName: `${params.get('lang')}.shortLink`, value: e.target.value, userId: user?.id }),
                            }) }}
                            onFocus={() => socket.emit('focus', { roomId: id, inputName: `${params.get('lang')}.shortLink`, userId: user?.id })}
                            onBlur={() => socket.emit('blur', { roomId: id, inputName: `${params.get('lang')}.shortLink`, userId: user?.id })}
                            users={users?.[`${params.get('lang')}.shortLink`]}
                        />
                    </Flex>
                    <SquarePhotoUpload
                        setValue={setValue}
                        onChange={uploadSelectedImage}
                        onDelete={deleteImage}
                        loading={imageLoading}
                        url={watchedFiles?.[params.get('lang')]?.file}
                    />
                </div>
                <RichText
                    value={watchedFiles?.[params.get('lang')]?.['description'] || ''}
                    onChange={(e) => socket.emit('change', { roomId: id, inputName: `${params.get('lang')}.description`, value: e, userId: user?.id })}
                    setValue={setValue}
                    getValues={getValues}
                    name={`${params.get('lang')}.description`}
                />
            </div>
        </ContentWrapper>
    );
}

export default Content;
