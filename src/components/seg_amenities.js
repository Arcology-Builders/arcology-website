import React, { Component } from 'react'
import { Segment, Grid, Header, Button, Icon, List } from 'semantic-ui-react'
import { Element } from 'react-scroll';

export default class AmenitiesSeg extends Component {
    render() {
        return (
            <Element name="amenities">
                <Segment textAlign='center' style={{ padding: '3em 5em 0em 5em' }} vertical>
                    <Grid container verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header className="colcolor" as='h3' style={{ fontSize: '2em' }}>Amenities</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid style={{ padding: '0em 0em 0em 0em', margin: '0em 0em 0em 0em' }} columns={2}>
                        <Grid.Row>
                            {this._getAmenities("Basic", ["Wifi",
                                'Washer',
                                "Dryer",
                                "Iron",
                                "Laptop friendly workspace",
                                "Towels, bed sheets, soap, and toilet paper",
                                "Heating central heating or a heater in the listing",
                                "Air conditioning",
                                "Hot water"])}
                            {this._getAmenities("Heading", ["Kitchen",
                                "Space where guests can cook their own meals",
                                "Coffee maker",
                                "Cooking basics",
                                "Pots and pans, oil, salt and pepper",
                                "Dishes and silverware",
                                "Microwave",
                                "Refrigerator",
                                "Oven",
                                "Stove"])}
                            {this._getAmenities("Guest access", ["Lockbox"])}
                            {this._getAmenities("Bed and bath", ["Hangers",
                                "Hair dryer"])}
                            {this._getAmenities("Outdoor", ["Patio or balcony"])}
                            {this._getAmenities("Safety features", ["Carbon monoxide detector",
                                "Smoke detector",
                                "First aid kit"])}
                            {this._getAmenities("Facilites", ["Free street parking"])}

                        </Grid.Row>
                    </Grid>
                </Segment>
            </Element>

        )
    }
    _getAmenities(heading, items) {
        return (
            <Grid.Column textAlign='center'>
                <Header style={{ padding: '1em 0em 0em 0em', margin: '0em 0em 0em 0em' }} as='h4'>{heading}</Header>
                <List style={{ padding: 'em 0em 0em 0em', margin: '0em 0em 0em 0em' }} bulleted>
                    {items.map((item) => {
                        return <List.Item >{item}</List.Item>
                    })}
                </List>
            </Grid.Column>
        )
    }
}

