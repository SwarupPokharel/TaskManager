import './footerStyle.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <p>&copy; {new Date().getFullYear()} TaskManager. All Rights Reserved.</p>
        </footer>
    );
}
export default Footer;