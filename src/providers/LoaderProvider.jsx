import Loaders from "../components/Loaders";

const LoaderProvider = ({children}) => {
    return (
        <>
            <Loaders />
            {children}
        </>
    );
}

export default LoaderProvider;
