import React, { useEffect, useState } from 'react'
import { Table, Card, Segment, Button, Menu, Icon, Image,  Header, Popup, Grid } from 'semantic-ui-react';

const PopupGi = () => (
    <Popup trigger={<Button>Show flowing popup</Button>} flowing hoverable>
        <Grid centered divided columns={3}>
            <Grid.Column textAlign='center'>
                <Header as='h4'>Basic Plan</Header>
                <p>
                    <b>2</b> projects, $10 a month
                                </p>
                <Button>Choose</Button>
            </Grid.Column>
            <Grid.Column textAlign='center'>
                <Header as='h4'>Business Plan</Header>
                <p>
                    <b>5</b> projects, $20 a month
                                </p>
                <Button>Choose</Button>
            </Grid.Column>
            <Grid.Column textAlign='center'>
                <Header as='h4'>Premium Plan</Header>
                <p>
                    <b>8</b> projects, $25 a month
                                </p>
                <Button>Choose</Button>
            </Grid.Column>
        </Grid>
    </Popup>
)

export default PopupGi;