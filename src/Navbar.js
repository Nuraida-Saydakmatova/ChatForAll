import Raect, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillChatDotsFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { LanguageContext, } from './Components/contexts';
import { AiOutlineGlobal } from "react-icons/ai";


const Main_Navbar = () => {
    const [language, setLanguage] = useContext(LanguageContext);
    const { t } = useTranslation();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <BsFillChatDotsFill style={{ color: 'white', width: '50px', fontSize: '35px' }} />
                <Navbar.Brand href="/">{t("Chat")}</Navbar.Brand>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/more">{t("More")}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div>
                        <AiOutlineGlobal style={{ fontSize: '20px', marginLeft: '15px' }} />
                        <select onChange={(e) => setLanguage(e.target.value)} as='select' value={language} className={'sellect'}>
                            <option value="en">English</option>
                            <option value="ru">Руский</option>
                        </select>
                    </div>
                    </Container>
            </Navbar>
        </>
    )
}
export default Main_Navbar;