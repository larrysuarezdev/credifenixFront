import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

//UI
import Sidebar from '../components/Layout/Sidebar'
import Navbar from '../components/Layout/Navbar'
import Loading from '../components/Common/Loading'
// import BoxButton from '../components/Common/BoxButton'
// import FontAwesome from 'react-fontawesome'

//Acciones
import { toggleModal } from '../actions/common'
import { clearMessage } from '../actions/index'
import { signOut } from '../actions/auth'


class Layout extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.renderBreadCrumb = this.renderBreadCrumb.bind(this);

    this.state = {
      isOpen: true,
      sidebarItems: [
        {
          icon: 'cog', caption: 'Administración', isActive: false, isOpen: false,
          subitems: [
            { caption: 'Clientes', isActive: false, title: 'Clientes', url: '/administracion/clientes', icon: 'user' },
            { caption: 'Personas', isActive: false, title: 'Personas', url: '/administracion/personas', icon: 'user-friends' },
            { caption: 'Maestras', isActive: false, title: 'Maestras', url: '/administracion/maestras', icon: 'list-ol' },
            { caption: 'Roles', isActive: false, title: 'Maestras', url: '/administracion/roles', icon: 'user-cog' }
          ]
        },
        {
          icon: 'credit-card', caption: 'Cobros', isActive: false, isOpen: false,
          subitems: [
            { caption: 'Rutas', isActive: false, title: 'Rutas', url: '/cobros/rutas', icon: 'route' },
            { caption: 'Flujo de caja', isActive: false, title: 'Flujo de caja', url: '/cobros/flujoCaja', icon: 'hand-holding-usd' },
            { caption: 'Flujo de utilidades', isActive: false, title: 'Flujo de utilidades', url: '/cobros/flujoUtilidades', icon: 'funnel-dollar' },
          ]
        },
        {
          icon: 'chart-line', caption: 'Reportes', isActive: false, isOpen: false,
          subitems: [
            { caption: 'Pendientes', isActive: false, title: 'Clientes', url: '/reportes/reporte1' }
          ]
        }
      ]
    };
  }

  componentWillMount() {
    const currentLocation = this.props.location.pathname
    let sidebarItems = [...this.state.sidebarItems]

    sidebarItems.forEach((item) => {
      if (item.url) {
        if (currentLocation === item.url) {
          item.isActive = true
        }
      } else {
        item.subitems.forEach((item1) => {
          if (currentLocation === item1.url) {
            item.isActive = true
            item.isOpen = true
            item1.isActive = true
          }
        })
      }
    })

    this.setState({ sidebarItems })
  }

  sidebarItemsNoActive = (sidebarItems) => {
    sidebarItems = sidebarItems.map((itm) => { itm.isActive = false; return itm })
    sidebarItems = sidebarItems.map((itm) => { itm.subitems.map((itm1) => itm1.isActive = false); return itm })
  }

  hasSidebarSubItemActive = (sidebaritem) => {
    return (sidebaritem.subitems.filter((itm) => itm.isActive).length > 0)
  }

  handleChangeSelectedItem = (e, item) => {
    let sidebarItems = [...this.state.sidebarItems]
    this.sidebarItemsNoActive(sidebarItems);
    
    let index = sidebarItems.findIndex((itm) => itm.caption === item)
    if (sidebarItems[index].subitems.length === 0) {
      this.sidebarItemsNoActive(sidebarItems)
      sidebarItems[index].isActive = true
    } else {
      if (this.hasSidebarSubItemActive(sidebarItems[index])) {
        sidebarItems[index].isActive = true
      }
      sidebarItems[index].isOpen = !sidebarItems[index].isOpen
    }
    this.setState({ sidebarItems })
  }

  handleChangeSelectedSubItem = (e, item) => {
    let sidebarItems = [...this.state.sidebarItems]
    let index = sidebarItems.findIndex((itm) => itm.subitems.filter((itm1) => itm1.caption === item).length > 0)
    
    if (index === -1) {
      index = sidebarItems.findIndex((itm) => itm.caption === item)
    }

    if (sidebarItems[index].subitems.length === 0) {
      this.sidebarItemsNoActive(sidebarItems)
      sidebarItems[index].isActive = true
    } else {
      if (this.hasSidebarSubItemActive(sidebarItems[index])) {
        sidebarItems[index].isActive = true
      }
      sidebarItems[index].isOpen = !sidebarItems[index].isOpen
      sidebarItems[index].subitems.forEach((element) => {
        if (element.caption === item)
          element.isOpen = !element.isOpen

        return (element)
      })
    }
    this.setState({ sidebarItems })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderBreadCrumb = () => {
    const currentSelectedOption = this.state.sidebarItems.filter(item => item.isActive === true)
    // console.log(currentSelectedOption)
    if (currentSelectedOption.length === 0 || currentSelectedOption[0].caption === 'Dashboard') {
      return null
    }

    if (currentSelectedOption[0].url) {
      return (
        <li className="breadcrumb-item">
          <a href={currentSelectedOption[0].url}>{currentSelectedOption[0].caption}</a>
        </li>
      )
    }

    const currentSelectedSubOption = currentSelectedOption[0].subitems.filter(item => item.isActive === true)
    // console.log('currentSelectedOption ', currentSelectedOption, 'currentSelectedSubOption', currentSelectedSubOption)

    if (currentSelectedSubOption.length === 0) {
      return null
    }

    if (currentSelectedSubOption[0].url) {
      return [
        <li key={`li0[0]`} className="breadcrumb-item">
          <span>{currentSelectedOption[0].caption}</span>
        </li>,
        <li key={`li0[1]`} className="breadcrumb-item">
          <a href={currentSelectedSubOption[0].url}>{currentSelectedSubOption[0].caption}</a>
        </li>
      ]
    }
  }

  componentDidUpdate() {
    this.props.clearMessage()
  }

  render() {

    if (this.props.messages) {
      const { messages } = this.props
      switch (messages.type) {
        case 'danger':
          toast.error(messages.message)
          break
        case 'warning':
          toast.warn(messages.message)
          break
        case 'success':
          toast.success(messages.message)
          break
        default:
          toast.info(messages.message)
      }
    }

    const { user, signOut, rol } = this.props;
    const { isOpen, sidebarItems } = this.state
    
    return (
      <div id="wrapper">
        <Sidebar
          isOpen={isOpen}
          toggle={this.toggle}
          sidebarItems={sidebarItems}
          permission={rol}
          onClick={this.handleChangeSelectedItem}
          onClick1={this.handleChangeSelectedSubItem}
        />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar user={user} signOut={signOut} renderBreadCrumb={this.renderBreadCrumb} />
            <div className="container-fluid">
              {
                this.props.children
              }
            </div>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>&copy; Larry suarez, Software Development 2019</span>
              </div>
            </div>
          </footer>

          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
        <Loading />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    rol: state.auth.rol,
    messages: state.messages.get('message'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(toggleModal()),
    clearMessage: () => dispatch(clearMessage()),
    signOut: () => dispatch(signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

