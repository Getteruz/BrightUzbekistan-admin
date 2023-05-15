import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import RedButton from "../../components/Buttons/RedButton";
import RoundedButton from "../../components/Buttons/RoundedButton";
import ContentWrapper from "../../components/ContentWrapper";
import Flex from "../../components/Flex";
import BtnGroup from "../../components/Form/BtnGroup";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import AdsUpload from "../../components/Form/Upload/Ads";
import Loader from "../../components/Loaders/Loader";
import Modal from "../../components/Modals/Modal";
import { createAds } from "../../services/ads";
import { removeFile, uploadImage } from "../../services/upload";
import { useShowAlert } from "../../store/alert/alert.thunk";
import paramsToObject from "../../utils/paramsToObject";
import { getCategories } from "../../services/category";
import { adsType } from "./data";
import cls from './AddReklama.module.scss'

const expression = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const urlRegex = new RegExp(expression);

const AddReklama = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showAlert = useShowAlert(dispatch)
    const [isLoading, setIsLoading] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const [isLoadingCreate, setIsLoadingCreate] = useState(false)
    const { data: categories } = useQuery('categories', getCategories, { placeholderData: [] })
    const [size, setSize] = useState(adsType.find(type => type.type === params.get('type')))
    const { register, setValue, watch, handleSubmit, formState: { isValid }, control } = useForm({ mode: 'onChange' })
    const watchedFiles = watch()

    useEffect(() => {
        if (!adsType.map(type => type.type)?.includes(params.get('type'))) {
            setSearchParams({ ...paramsToObject(params.entries()), type: 'vip' }, { replace: true })
        } else {
            setValue('type', params.get('type'))
            setSize(adsType.find(type => type.type === params.get('type')))
        }
    }, [params.get('type')])

    const onChange = async (e, key) => {
        try {
            setIsLoading({ [key]: true })
            if (e.target.files?.[0]) {
                const date = new Date(Date.now())
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const res = await uploadImage(e.target.files[0], `${year}/${month}/${day}`, false)
                if (res?.error === false && res?.url) {
                    setValue(key, res?.url)
                } else {
                    return
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading({ [key]: false })
        }
    }

    const onDelete = async (key) => {
        const url = watchedFiles?.[key]
        await removeFile(url)
        setValue(key, null)
    }

    const submitForm = async (data) => {
        try {
            setIsLoadingCreate(true)
            if (!data?.imgUrl || !data?.imgMobileUrl) {
                showAlert({ type: 'error', message: 'Вы не загрузили картинку' })
                return
            } else if(params.get('type') === 'mid'){ 
                if(!data?.categoryId){
                    showAlert({ type: 'error', message: 'Выберите категорию' })
                    return
                }
            }
            const res = await createAds(data)
            if (res?.identifiers) {
                setOpenModal(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingCreate(false)
        }
    }

    return (
        <ContentWrapper
            navbar={
                <div className={cls.nav}>
                    <RedButton onClick={handleSubmit(submitForm)} disabled={!isValid}>Сохранить</RedButton>
                    <RoundedButton onClick={() => navigate('/reklama')}> Отмена</RoundedButton>
                </div>
            }
        >
            {isLoadingCreate && <Loader title='Идёт создание рекламы' />}
            {openModal && <Modal title='Реклама успешно создан' onClose={() => navigate('/reklama')} onOk={() => navigate('/reklama')} />}
            <Flex direction='column' gap='20'>
                <Input label="Название компании" placeholder="Название компании" register={{ ...register('title', { required: true }) }} />
                <Input label="Ссылка" placeholder="Ссылка" register={{ ...register('link', { pattern: urlRegex }) }} />
                <BtnGroup label='Тип баннера'>
                    {
                        adsType?.length > 0 && adsType.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setSearchParams({ ...paramsToObject(params.entries()), type: type.type }, { replace: true })}
                                className={type?.type === params.get('type') ? cls.active__btn : ""}
                            >
                                {type?.label}
                            </button>
                        ))
                    }
                </BtnGroup>
                {params.get('type') === 'mid' && (
                    <Select
                        name="categoryId"
                        label='Выберите категорию над которым хотите показать рекламу'
                        placeholder="Категории"
                        options={categories.map(ctg => ({ label: ctg?.ru, value: ctg?.id }))}
                        control={control}
                    />
                )}
                <div style={{ display: 'flex', flexWrap: params.get('type') === 'vip' ? 'nowrap' : 'wrap', gap: '20px' }}>
                    <AdsUpload
                        label={`Рекламный баннер:  ${params.get('type')}`}
                        width={size?.width}
                        height={size?.height}
                        onChange={e => onChange(e, 'imgUrl')}
                        onDoubleClick={() => onDelete('imgUrl')}
                        url={watchedFiles?.imgUrl}
                        isLoading={isLoading?.['imgUrl']}
                    />
                    <AdsUpload
                        label={`Рекламный баннер: Mobile ${params.get('type')}`}
                        width={size?.mobileWidth}
                        height={size?.mobileHeight}
                        onChange={e => onChange(e, 'imgMobileUrl')}
                        onDoubleClick={() => onDelete('imgMobileUrl')}
                        url={watchedFiles?.imgMobileUrl}
                        isLoading={isLoading?.['imgMobileUrl']}
                    />
                </div>
            </Flex>
        </ContentWrapper>
    );
}

export default AddReklama;
