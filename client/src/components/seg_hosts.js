import React, { Component } from 'react'
import { Segment, Grid, Header, Image, Reveal } from 'semantic-ui-react'
import { Element } from 'react-scroll';


export default class HostsSeg extends Component {
    render() {
        return (
            <Element name="hosts">
                <Segment textAlign='center' style={{ padding: '3em 5em 0em 5em' }} vertical>
                    <Grid container verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header className="colcolor" as='h3' style={{ fontSize: '2em' }}>Meet Our Team</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            {/* {this._getHeadShot("images/melissa.png", "Melissa Nyomi", "Host desc")} */}
                            {this._getHeadShot("images/paul.png", "Paul Pham", "Chief Arcologist, Developer")}
                            {/* {this._getHeadShot("images/bob.png", "Host", "Host desc")} */}
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Element>
        )
    }
    _getHeadShot(image, name, description) {
        return (
            <Grid.Column>
                <Image src={image} size='small' circular centered />
                <Header as='h4' style={{ margin: '.5rem 0rem 0rem 0rem' }} >{name}</Header>
                <Header as='h6' style={{ margin: '0rem 0rem 0rem 0rem' }} >{description}</Header>
            </Grid.Column>
        )
    }
}





