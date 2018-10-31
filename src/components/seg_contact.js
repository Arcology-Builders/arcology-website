import React, { Component } from 'react'
import { Container, List, Segment, Grid, Header, Button, Image, Icon } from 'semantic-ui-react'
import { Element } from 'react-scroll';


export default class ContactSeg extends Component {
    render() {
        return (
            <div>
                <Element name="contact">
                    <Segment inverted vertical style={{ padding: '5em 0em' }}>
                        <Container>
                            <Grid divided inverted stackable>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Header inverted as='h4' content='Contact' />
                                        <List link inverted>
                                            <List.Item as='a'>arcology.captain@gmail.com</List.Item>
                                            <List.Item as='a' href='https://github.com/invisible-college' target="_blank">GitHub</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={7}>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                </Element>
            </div>
        )
    }
}





