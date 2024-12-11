import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LOGO from './main-logo.png'
import { SearchOutlined } from '@mui/icons-material'
import { ShoppingCartOutlined } from '@mui/icons-material'
import { Menu } from '@mui/icons-material'
import { CloseRounded } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { Favorite } from '@mui/icons-material'
import { ShoppingCart } from '@mui/icons-material'
import { Notifications } from '@mui/icons-material'
import { EditNotifications } from '@mui/icons-material'
import { SupportAgent } from '@mui/icons-material'
import { HelpCenter } from '@mui/icons-material'
import { Policy } from '@mui/icons-material'
import { Login } from '@mui/icons-material'
import { PersonAdd } from '@mui/icons-material'
import { useSearch } from './SearchContext'
import { useUserLoginContext } from './UserLoginContext'
import { useCart } from './AddToCart'
import { Logout } from '@mui/icons-material'

function Navbar() {

    const [sidebarshow, setsidebarshow] = useState(false)

    const navigate = useNavigate()

    // For search functionality
    const [inputValue, setinputValue] = useState('')
    const { setsearchQuery } = useSearch()

    // For changing user name on sidebar
    const { loggedInUser, setloggedInUser } = useUserLoginContext()

    // For counting items in cart
    const { cart } = useCart()

    const handleSearch = () => {
        setsearchQuery(inputValue)
    }

    const openmenu = () => {
        setsidebarshow(!sidebarshow)

        const sidebar = document.getElementsByClassName('sidebar')[0]

        if (sidebar) {
            sidebar.style.display = sidebarshow ? "none" : "block";
            if (sidebar.style.display === "block") {
                document.body.style.overflowY = "hidden"
            }
            else {
                document.body.style.overflowY = "visible"
            }
        }
        else {
            console.error("Sidebar not found")
        }

        // Overlay
        const overlay = document.getElementById('overlay')

        overlay.classList.toggle('active')
        // overlay.addEventListener("",function() {
        //     sidebar.classList.remove('active');
        //     this.classList.remove('active');
        //   });
    }

    const UserLogout = (e) => {
        e.preventDefault()
        setloggedInUser(null)
        localStorage.removeItem('loggedInUser')
        navigate('/')

        // Closing sidebar by onclick
        setsidebarshow(!sidebarshow)

        const sidebar = document.getElementsByClassName('sidebar')[0]

        if (sidebar) {
            sidebar.style.display = sidebarshow ? "none" : "block";
            if (sidebar.style.display === "block") {
                document.body.style.overflowY = "hidden"
            }
            else {
                document.body.style.overflowY = "visible"
            }
        }
        else {
            console.error("Sidebar not found")
        }

        // Overlay
        const overlay = document.getElementById('overlay')

        overlay.classList.toggle('active')
    }

    // Handeling the logo
    const handleLogo = (e) => {
        e.preventDefault();
        navigate('/')

        if (window.scrollTo) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            // Fallback for mobile
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    }

    // Calculate total quantity and total price
    const totalQuantity = cart
        .reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <div className='overlay' id='overlay'></div>
            {/* Sidebar nav start */}
            <nav className='sidebar'>
                <div id='sidebar-div' className='d-flex justify-content-between'>
                    <div id='sidebar-new-signup-div' className='d-flex justify-content-between'>
                        {loggedInUser ? (
                            <div className="LoggedInGreeting">
                                <p>Hello, {loggedInUser}</p>
                            </div>
                        ) :
                            (<>
                                <p>New Customer?</p>
                                <Link to="/SignUp" id='sidebar-sign-up' onClick={openmenu}>
                                    Sign Up
                                </Link>
                            </>)
                        }

                    </div>

                    <div onClick={openmenu}>
                        <CloseRounded id="close-menu-icon" />
                    </div>
                </div>
                <div id='underline'></div>

                <ul id='sidebar-first-ul'>
                    <li id='Categories-li'>Shop by categories</li>
                    <li onClick={openmenu}><Link to="/MensFashion">Men's Fashion</Link></li>
                    <li onClick={openmenu}><Link to="/WomensFashion">Women's Fashion</Link></li>
                    <li onClick={openmenu}><Link to="/Electronics">Electronics</Link></li>
                    <li onClick={openmenu}><Link to="/HomeKitchenFurniture">Home, Kitchen, Furniture</Link></li>
                    <li onClick={openmenu}><Link to="/MobileAccessories">Mobile Accessories</Link></li>
                    <li onClick={openmenu}><Link to="/BeautySkinCareGrocery">Beauty, Skin Care, Grocery</Link></li>
                    <li onClick={openmenu}><Link to="/PerfumesJewellery">Perfumes, Jewellery</Link></li>
                    <li onClick={openmenu}><Link to="/SportsSunglasses">Sports, Sunglasses</Link></li>
                    <li onClick={openmenu}><Link to="/VehicleMotorcycle">Vehicle, Motorcycle</Link></li>
                    <div id='underline'></div>
                </ul>


                <ul>
                    <li onClick={openmenu}><Link to="/"><Person id="sidebar-import-icons" />My account</Link></li>
                    <li onClick={openmenu}><Link to="/"><span className="material-symbols-outlined" id='sidebar-icons'>orders</span>My Orders</Link></li>
                    <li onClick={openmenu}><Link to="/Wishlist"><Favorite id="sidebar-import-icons" />My Wishlist</Link></li>
                    <li onClick={openmenu}><Link to="/Cart"><ShoppingCart id="sidebar-import-icons" />My Cart</Link></li>
                    <li onClick={openmenu}><Link to="/"><Notifications id="sidebar-import-icons" />My Notification</Link></li>
                </ul>
                <div id='underline'></div>

                <ul>
                    <li onClick={openmenu}><Link to="/"><EditNotifications id="sidebar-import-icons" />Notification Preferences</Link></li>
                    <li onClick={openmenu}><Link to="/"><SupportAgent id="sidebar-import-icons" />Customer Service</Link></li>
                    <li onClick={openmenu}><Link to="/"><HelpCenter id="sidebar-import-icons" />Help Centre</Link></li>
                    <li onClick={openmenu}><Link to="/"><Policy id="sidebar-import-icons" />Legal</Link></li>
                </ul>

                <div id='underline'></div>
                <ul>
                    {loggedInUser ? (
                        <li onClick={UserLogout}><Link><Logout id="sidebar-import-icons" />Logout</Link></li>
                    )
                        : (<>
                        </>)
                    }
                </ul>

            </nav>
            {/* Sidebar nav end */}

            {/* Main nav start */}
            <nav className='main-nav'>
                <div id="menu-icon-div" onClick={openmenu}>
                    <Menu id="menu-icon" />
                </div>

                <div id='logo-div' onClick={handleLogo}>
                    <img src={LOGO} alt="LOGO" id='logo' />
                </div>

                <ul>
                    <input className='' type="text" placeholder='Search...' id='search-bar'
                        value={inputValue}
                        onChange={(e) => setinputValue(e.target.value)} />
                    <button id='nav-search-btn' onClick={handleSearch}><SearchOutlined id="nav-search-icon" /></button>
                    {loggedInUser ?
                        ("") :
                        (<>
                            <li className='NavLoginClass'><Link to="/Login"><Login id="login-icon" />Login</Link></li>
                            <li className='NavSignUpClass'><Link to="/SignUp"><PersonAdd id="signup-icon" />Sign Up</Link></li>
                        </>)
                    }
                    {cart.length > 0 ? (
                        <>
                            <li className='Disappearat430px'><Link to="/Cart"><sup className='Cartnumber'>{totalQuantity}</sup><ShoppingCartOutlined id="nav-cart-icon" />Cart</Link></li>
                            {/* For smaller devices 430px */}
                            <li className='Disappeartill1600px'><Link to="/Cart"><sup className='Cartnumber'>{totalQuantity}</sup><ShoppingCartOutlined id="nav-cart-icon430px" /></Link></li>
                        </>)
                        : (
                            <>
                                <li className='Disappearat430px'><Link to="/Cart"><ShoppingCartOutlined id="nav-cart-icon" />Cart</Link></li>
                                {/* For smaller devices 430px */}
                                <li className='Disappeartill1600px'><Link to="/Cart"><ShoppingCartOutlined id="nav-cart-icon430px" /></Link></li>
                            </>
                        )
                    }

                </ul>
            </nav>

            {/* Main nav end */}

            {/* Second navbar start */}
            <nav className='second-navbar'>
                <ul>
                    <li onClick={openmenu}><Link><Menu id="all-categories-icon" /> All Categories</Link></li>
                    <li><Link to="/MensFashion">Men's Fashion</Link></li>
                    <li><Link to="/WomensFashion">Women's Fashion</Link></li>
                    <li><Link to="/MobileAccessories">Mobile Accessories</Link></li>
                    <li><Link to="/Electronics">Electronics</Link></li>

                    <input className='' type="text" placeholder='Search...' id='search-barsmallerdevices'
                        value={inputValue}
                        onChange={(e) => setinputValue(e.target.value)} />
                    <button id='nav-search-btnsmallerdevices' onClick={handleSearch}><SearchOutlined id="nav-search-icon" /></button>
                </ul>
            </nav>
            {/* Second navbar end */}
        </>
    )
}

export default Navbar