import GreyButton from "../../../../components/Buttons/GreyButton";
import RedButton from "../../../../components/Buttons/RedButton";
import ContentWrapper from "../../../../components/ContentWrapper";
import Flex from "../../../../components/Flex";
import Checkbox from "../../../../components/Form/Checkbox";
import { ArchiveIcon, DeleteIcon, FolderIcon } from "../../../../components/icons";
import NewsList from "../../../../components/NewsList";


const Content = () => {
    return (
        <ContentWrapper navbar={
            <div style={{ width: '100%', display: 'flex', gap: '20px', alignItems: 'center'}}>
                <Flex gap='20' style={{width: 'auto'}}>
                    <Checkbox label="Выбрать все" />
                    <RedButton>
                        <FolderIcon />
                        Отправить
                    </RedButton>
                </Flex>
                <Flex gap='5' style={{width: 'auto'}}>
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
            <NewsList news={Array(10).fill(null)}/>
        </ContentWrapper>
    );
}

export default Content;
