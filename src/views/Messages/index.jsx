import { useRef } from "react";
import { useState, useEffect } from "react";
import ComponentsWrapper from "../../components/ComponentsWrapper";
import NewsDropdown from "../../components/Drobdowns/NewsDropdown";
import Wrapper from "../../components/Drobdowns/Wrapper";
import Content from "./components/Content";
import LeftAside from "./components/LeftAside";


const Messages = () => {
    const [open, setOpen] = useState(false)
    const drobPage = useRef()
    const btnref = useRef()
    const onClick = () => {
        if (open) {
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e) {
            if (btnref.current.contains(e.target)) {
                setOpen(true)
            } else if (!drobPage.current.contains(e.target)) {
                setOpen(false)
            }
        }
    }, []);
    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content ref={btnref} />
            <div style={{ position: 'relative' }} ref={drobPage}>
                {
                    open && (
                        <Wrapper>
                            <NewsDropdown onClickOutside={onClick} />
                        </Wrapper>
                    )
                }
            </div>
        </ComponentsWrapper>
    );
}

export default Messages;
