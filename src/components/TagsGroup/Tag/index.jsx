import styled from "@emotion/styled";

const CTag = styled('span')`
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    color: #001AFF;
`

const Tag = ({ children }) => {
    return (
        <CTag>
            {children}
        </CTag>
    )
}

export default Tag;
