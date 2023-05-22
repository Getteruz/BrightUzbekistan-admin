import RedButton from "../../Buttons/RedButton";


const PublishNews = ({
    Button = RedButton,
    label = ''
}) => {
    return (
        <Button>
            {label}
        </Button>
    );
}

export default PublishNews;