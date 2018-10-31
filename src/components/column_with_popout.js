import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

const ColumnWithPopout = ({ heading, firstImage, firstDescription, ...rest }) => {
    return (
        <Grid.Column className='column pointer' {...rest} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header className='coltext' as='h3' style={{ fontSize: '2em' }}>{heading}</Header>
            <p style={{ fontSize: '1.33em' }}>
                <Image src={firstImage} size='mini' spaced />
                {firstDescription}
            </p>
        </Grid.Column>
    );
}

export default ColumnWithPopout;

