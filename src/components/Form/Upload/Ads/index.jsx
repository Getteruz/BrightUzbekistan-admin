import CircleLoader from '../../../Loaders/CircleLoader';
import Button from '../Button';
import cls from './Ads.module.scss'

const AdsUpload = ({
    label = '',
    width = 0,
    height = 0,
    onChange = () => { },
    onDoubleClick = () => { },
    url = '',
    isLoading = false
}) => {
    const style = {
        maxWidth: width,
        aspectRatio: `${width}/${height}`,
        height,
    }

    return (
        <label className={cls.label}>
            {label && <span>{label}</span>}
            {!url && <input type="file" onChange={onChange} />}
            <div className={cls.label__upload} style={style} onDoubleClick={onDoubleClick}>
                {!url ? (
                    isLoading ? <CircleLoader /> : (
                        <>
                            <Button />
                            <span>Загрузить фото</span>
                            {width} x {height}
                        </>
                    )
                ) : (
                    <img src={url} alt="ads" />
                )}
            </div>
        </label>
    );
}

export default AdsUpload;
