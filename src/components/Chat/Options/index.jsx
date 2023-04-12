import { useLayoutEffect, useState } from 'react';
import { useRef } from 'react';
import cls from './Options.module.scss'

const Options = ({
    buttons = [],
}) => {
    const optionsRef = useRef()
    const [style, setStyle] = useState({})

    useLayoutEffect(() => {
        const parent = document.getElementById('chat')
        const button = optionsRef.current.parentNode
        const optionsPos = optionsRef.current.getBoundingClientRect()
        const parentPos = parent.getBoundingClientRect()
        const buttonPos = button.getBoundingClientRect()
        
        if((optionsPos?.x - parentPos?.x) + optionsPos.width > parentPos.width) {
            setStyle({left: (parentPos.width - optionsPos.width) - (buttonPos.x - parentPos.x) })
        }
    }, [])

    return (
        <div className={cls.options} ref={optionsRef} style={{[style?.left && 'left']: `${style.left}px`}}>
            {buttons?.length > 0 && buttons.map(btn => (
                <button 
                    key={btn.id}
                    onClick={btn.onClick}
                >
                    {btn.icon} {btn.label}
                </button>
            ))}
        </div>
    );
}

export default Options;
