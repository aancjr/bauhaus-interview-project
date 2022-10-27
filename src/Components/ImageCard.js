import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    border:none;
`;

export default function ImageCard(props) {
    const { description, idx, imageURL, title } = props;


    return (
        <StyledCard key={idx}>
            <img
                className='card-image'
                alt={`${title} - ${description}`}
                src={imageURL}
                title={title}
            />
            <h2>{title}</h2>
            <div>
                <p>{description}</p>
            </div>
        </StyledCard>
    )
}
