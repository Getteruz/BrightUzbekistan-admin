import styled from "@emotion/styled";

const CTag = styled('span')`
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    color: #001AFF;
    cursor: pointer;
`

const Tag = ({ children, onClick = () => {} }) => {
    return (
        <CTag onClick={onClick}>
            {children}
        </CTag>
    )
}

export default Tag;
