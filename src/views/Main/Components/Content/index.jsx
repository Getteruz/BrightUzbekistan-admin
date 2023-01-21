import GreyButton from '../../../../components/Buttons/GreyButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Flex from '../../../../components/Flex';
import Checkbox from '../../../../components/Form/Checkbox';
import { ArchiveIcon, DeleteIcon } from '../../../../components/icons';
import NewsList from '../../../../components/NewsList';
import cls from './Content.module.scss'

const Content = () => {
    return (
        <ContentWrapper navbar={
            <div className={cls.content__menu} id='content-menu'>
                <Checkbox label='Выбрать все' />
                <Flex gap='5'>
                    <GreyButton>
                        <DeleteIcon />
                        Удалить
                    </GreyButton>
                    <GreyButton>
                        <ArchiveIcon />
                        В архив
                    </GreyButton>
                </Flex>
            </div>
        }>
            <NewsList news={Array(10).fill(null)} />
        </ContentWrapper>
    );
}

export default Content;
