import React, { Component } from 'react'
import { Segment, Grid, Header, Button, Image, Icon, Step } from 'semantic-ui-react'
import { Element } from 'react-scroll';

export default class AboutSeg extends Component {
    render() {
        return (
            <div>
                <br />
                <Element name="about">
                    <Segment textAlign='center' style={{ padding: '3em 5em 0em 5em' }} vertical>
                        <Grid container verticalAlign='middle'>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header className="colcolor" as='h3' style={{ fontSize: '2em' }}>About Arcology</Header>
                                    <div className="colcolor" style={{ fontSize: '1.33em' }}>
                                        <p>Live, play, and work with a community of entrepreneurs, artists, musicians, hackers, makers, crafters, scientists, researchers, and engineers.</p>
                                        <p>Named after Paolo Soleri's integrated architecture and ecology at <a href='https://arcosanti.org/' target="_blank">Arcosanti</a>, Arcology draws inspiration from a
                                        <a href='http://tep.mit.edu/' target="_blank"> magical purple nerd castle at MIT</a>, <a href='https://burningman.org/' target="_blank">Black Rock City</a>,
                                        <a href='http://www.woodardlanecoho.org/' target="_blank"> Woodard Lane Cohousing</a>,
                                        the <a href='https://en.wikipedia.org/wiki/Nahalal' target="_blank"> Israeli moshav at Nahalal</a>, the Buddhist community home <a href='https://marpa-house.org/' target="_blank">Marpa House</a>, and the great work from <a href='https://www.youtube.com/watch?v=kBMMRzK8KqE' target="_blank">SimCity</a>.</p>
                                        <p>Our goal is an inter-generational landship to cultivate tribes of happy humans.e bit of body text</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row >
                                <Step.Group widths={4}>
                                    <Step>
                                        <Step.Content>
                                            <Step.Title>Phase One</Step.Title>
                                            <Step.Description>
                                                (completed)
                                                <p>15 June 2016 - 30 April 2018</p>
                                                <p style={{ fontSize: '.75em' }}>Minimum liveable product in Bushwick, one year prototype. 2 bunks in a shared room, 1 private room. Workspace for two. Internet-controlled door buzzer.</p>
                                            </Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step active>
                                        <Step.Content>
                                            <Step.Title>Phase Two</Step.Title>
                                            <Step.Description>
                                                (in progress)
                                                <p>1 April 2018 - 30 April 2019</p>
                                                <p style={{ fontSize: '.75em' }}>One year transitional space. 8 bunk beds, 3 private rooms. Three common workspaces. Door locks, rent payments, expenses, and future housemates governed by an Ethereum DAO. Rooftop garden and apiary.</p>
                                            </Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step >
                                        <Step.Content>
                                            <Step.Title>Phase Three</Step.Title>
                                            <Step.Description>
                                                (imminent landship)
                                                <p>1 December 2018 - indefinitely</p>
                                                <p style={{ fontSize: '.75em' }}>L train closes. The DAO now owns a 4-story building. 10 bunks in shared rooms, 8 private rooms, 4 family apartments. Food co-op, coffeeshop, school, event space on ground floor. Equity and dividends in the arcology paid on Ethereum.</p>
                                            </Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step >
                                        <Step.Content>
                                            <Step.Title>Phase Four</Step.Title>
                                            <Step.Description>
                                                (self-governance)
                                            <p style={{ fontSize: '.75em' }}>Building achieves energy sustainability and self-governance, with a system for training the next generation of leaders.</p>
                                            </Step.Description>
                                        </Step.Content>
                                    </Step>
                                </Step.Group>
                            </Grid.Row>

                        </Grid>
                    </Segment>
                </Element>
            </div>
        )
    }
}



