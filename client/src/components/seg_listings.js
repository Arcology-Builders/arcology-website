import React, { Component } from 'react'
import { Image, Grid, Segment, Container, Header, Button, Divider } from 'semantic-ui-react'
import { Element } from 'react-scroll';
import AnimateHeight from 'react-animate-height';

export default class ListingssSeg extends Component {
    render() {
        return (
            <Element name="listings">
                <Segment textAlign='center' style={{ padding: '3em 5em 0em 5em' }} vertical>
                    <Grid container verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header className="colcolor" as='h3' style={{ fontSize: '2em', margin: '0rem 0rem 0rem 0rem' }} >View Our Listings</Header>
                                <Header className="colcolor" as='h5' style={{ margin: '0rem 0rem 0rem 0rem' }}>All listings are located at 303 Stockholm St, Apt 4F and 4B Brooklyn, NY</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={2}>
                        <Grid.Row>
                            {this._getRoomShot("images/download_3.png", "Private room, on the right-hand path (3P)", "https://www.airbnb.com/rooms/23838154")}
                            {this._getRoomShot("images/download_4.png", "Captain's room in a hacker loft (4P)")}
                            {this._getRoomShot("images/download_5.png", "Upper bunk (5U) and Lower Bunk (5L), shared room in a hacker loft", "https://www.airbnb.com/rooms/23862292")}
                            {this._getRoomShot("images/download_5.png", "Upper bunk (6U) and Lower bunk (6L) in two-person shared room", "https://www.airbnb.com/rooms/23308575")}
                            {this._getRoomShot("images/download_7.png", "Private room on the left-hand path (7P)", "https://www.airbnb.com/rooms/23811439")}
                            {this._getRoomShot("images/download_8.png", "Upper bunk (8U) and Lower bunk (8L) in two-person shared room")}
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Element>
        )
    }
    _getRoomShot(image, description, link) {
        return (
            <Grid.Column>
                <Image href={link} src={image} size='medium' rounded centered />
                <Header as='h5' style={{ margin: '.5rem 0rem 2rem 0rem' }}>{description}</Header>
            </Grid.Column>
        )
    }
}