import Flex from '../../../../Flex';
import Button from '../../Button';
import cls from './Square.module.scss'

const SquarePhotoUpload = ({ }) => {
    return (
        <Flex gap='10' direction='column'>
            <span className={cls.text}>Фото к зоголовку</span>
            <div className={cls.box}>
                <div className={cls.box__preview}>
                    <span>Нет фото</span>
                    {/* <img src="https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" alt="" /> */}
                </div>
                <label>
                    <Button />
                    <Flex direction='column' gap='2'>
                        <p className={cls.box__title}>Загрузить фото</p>
                        <span className={cls.box__name}>img03.jpg</span>
                    </Flex>
                </label>
            </div>
        </Flex>
    );
}

export default SquarePhotoUpload;
