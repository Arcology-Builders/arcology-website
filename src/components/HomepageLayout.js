import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { Link, Element } from 'react-scroll';
import ListingsSeg from './seg_listings';
import HostsSeg from './seg_hosts';
import AboutSeg from './seg_about';
import ContactSeg from './seg_contact';
import AmenitiesSeg from './seg_amenities';
import { connect } from 'react-redux';
import { activeItemAction } from '../actions/index';


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Arcology'
      inverted
      style={{
        fontSize: mobile ? '2em' : '3.6em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='a community home for creating and learning in NYC'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />

  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = { activeItem: 'home' }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { children } = this.props
    const { fixed } = this.state
    const { activeItem } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment className="colheading" inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>

            <Element name="about" />
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              className="colborder"
            >
              <Container>
                <Link to="about" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='about' as='a' active={activeItem === 'about'} onClick={this.handleItemClick} >About</Menu.Item>
                </Link>

                <Link to="hosts" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" className="coltext" name='hosts' as='a' active={activeItem === 'hosts'} onClick={this.handleItemClick}>Hosts</Menu.Item>
                </Link>

                <Link to="listings" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" className="coltext" name='listings' as='a' active={activeItem === 'listings'} onClick={this.handleItemClick}>Listings</Menu.Item>
                </Link>

                <Link to="amenities" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='amenities' as='a' active={activeItem === 'amenities'} onClick={this.handleItemClick}>Amenities</Menu.Item>
                </Link>

                <Link to="contact" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='contact' as='a' active={activeItem === 'contact'} onClick={this.handleItemClick}>Contact</Menu.Item>
                </Link>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = { activeItem: 'home' }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened },
      this.setState({ activeItem: name })
    )
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    const { activeItem } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} inverted vertical visible={sidebarOpened}>
            <Link to="about" spy={true} smooth={true} duration={500}>
              <Menu.Item className="coltext" name='about' as='a' active={activeItem === 'about'} onClick={this.handleItemClick} >About</Menu.Item>
            </Link>

            <Link to="hosts" spy={true} smooth={true} duration={500}>
              <Menu.Item className="coltext" className="coltext" name='hosts' as='a' active={activeItem === 'hosts'} onClick={this.handleItemClick}>Hosts</Menu.Item>
            </Link>

            <Link to="listings" spy={true} smooth={true} duration={500}>
              <Menu.Item className="coltext" className="coltext" name='listings' as='a' active={activeItem === 'listings'} onClick={this.handleItemClick}>listings</Menu.Item>
            </Link>

            <Link to="amenities" spy={true} smooth={true} duration={500}>
              <Menu.Item className="coltext" name='amenities' as='a' active={activeItem === 'amenities'} onClick={this.handleItemClick}>Amenities</Menu.Item>
            </Link>

            <Link to="contact" spy={true} smooth={true} duration={500}>
              <Menu.Item className="coltext" name='contact' as='a' active={activeItem === 'contact'} onClick={this.handleItemClick}>Contact</Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class HomepageLayout extends Component {
  render() {
    return (
      <ResponsiveContainer>
        <AboutSeg />
        <HostsSeg />
        <ListingsSeg />
        <AmenitiesSeg />
        <ContactSeg />
      </ResponsiveContainer>
    )
  }
}

function mapStateToProps(state) {
  return { activeItem: state.activeItem }
}

export default connect(mapStateToProps, { activeItemAction })(HomepageLayout);