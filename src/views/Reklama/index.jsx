import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import AdsItem from "../../components/AdsItem";
import GreyButton from "../../components/Buttons/GreyButton";
import ContentWrapper from "../../components/ContentWrapper";
import Flex from "../../components/Flex";
import { DeleteIcon, FolderDownIcon, FolderIcon } from "../../components/icons";
import Loader from "../../components/Loaders/Loader";
import Modal from "../../components/Modals/Modal";
import { changeStatus, getAds, removeAds } from "../../services/ads";
import cls from './Reklama.module.scss'

const Content = () => {
    const { data: ads } = useQuery(['ads'], getAds)
    const [checked, setChecked] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState({ isOpen: false })
    const queryClient = useQueryClient()

    const onCheckboxChange = (e, id) => {
        if (e.target.checked) {
            setChecked(state => [...state, id])
        } else {
            setChecked(state => state.filter(checkedId => checkedId !== id))
        }
    }

    const publishAds = async () => {
        try {
            setIsLoading(true)
            const res = await changeStatus({ ids: checked, isActive: true })
            if (!res?.error) {
                setModal({
                    isOpen: true,
                    title: 'Реклама успешно активирована'
                })
                setChecked([])
                queryClient?.invalidateQueries(['ads'])
            } 
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const deleteAds = async () => {
        try {
            setIsLoading(true)
            const res = await removeAds({ ids: checked })
            if (!res?.error) {
                setModal({
                    isOpen: true,
                    title: 'Реклама успешно удалена'
                })
                setChecked([])
                queryClient?.invalidateQueries(['ads'])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const deactiveAds = async () => {
        try {
            setIsLoading(true)
            const res = await changeStatus({ ids: checked, isActive: false })
            if (!res?.error) {
                setModal({
                    isOpen: true,
                    title: 'Реклама успешно деактивирована'
                })
                setChecked([])
                queryClient?.invalidateQueries(['ads'])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ContentWrapper
            navbar={<div className={cls.nav}>
                <GreyButton fill onClick={publishAds} disabled={checked?.length === 0}>
                    <FolderIcon />
                    Опубликовать
                </GreyButton>
                <div>
                    <GreyButton onClick={deactiveAds} disabled={checked?.length === 0}>
                        <FolderDownIcon />
                        Деактивировать
                    </GreyButton>
                    <GreyButton onClick={deleteAds} disabled={checked?.length === 0}>
                        <DeleteIcon />
                        Удалить
                    </GreyButton>
                </div>
            </div>}
        >
            {isLoading && <Loader />}
            {modal?.isOpen && <Modal title={modal?.title} onClose={() => setModal({ isOpen: false })} onOk={() => setModal({ isOpen: false })} />}
            <Flex direction='column' gap='5'>
                {
                    ads?.length > 0 && ads.map(ad => (
                        <AdsItem
                            key={ad.id}
                            title={ad?.title}
                            createdAt={ad?.date}
                            views={ad?.viewTotalCount}
                            uniqueViews={ad?.viewUniqueCount}
                            isActive={ad?.isActive}
                            link={'/reklama/' + ad?.id}
                            onCheckboxChange={(e) => onCheckboxChange(e, ad?.id)}
                            checked={checked?.includes(ad?.id)}
                            clicks={ad?.clickCount}
                            type={ad?.type}
                            creator={ad?.creator?.fullName}
                        />
                    ))
                }
            </Flex>
        </ContentWrapper>
    );
}

export default Content;
