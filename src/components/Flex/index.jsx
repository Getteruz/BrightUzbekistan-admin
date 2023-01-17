import styled from "@emotion/styled";

const Wrapper = styled('div')`
    display: flex;
    width: ${props => props.width ?? '100%'};
    heigth: ${props => props.height ?? '100%'};
    padding: ${props => props.padding ?? '0'};
    flex-direction: ${props => props.direction ?? 'row'} !important;
    align-items: ${props => props.alignItems ?? 'stretch'};
    justify-content: ${props => props.justifyContent ?? 'flex-start'};
    gap: ${props => props.gap ?? '12'}px;
    flex-wrap: ${props => props.wrap ?? 'wrap'};

    & > *{
        max-width: ${props => props.direction === 'row' 
        ? `calc((100% - ${props.gap * (props.rowCount ?? 3 - 1)}px) / ${props.rowCount ?? 3})` 
        : props.cardWidth || '100%'};
    }

    ${props => props.mediaQuery}
`;

const Flex = ({
    children,
    media = {},
    ...other
}) => {

    const mediaQuery = Object.entries(media).reduce((acc, [size, count]) => (
        `
        @media screen and (max-width:${size}px){
            & > * {
                max-width: calc((100% - ${gap * (count - 1)}px) / ${count});
            }
        }
        ${acc}
        `
    ), '')
    
    return (
        <Wrapper
            mediaQuery={mediaQuery}
            {...other}
        >
            {children}
        </Wrapper>
    );
}

export default Flex;
