import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <footer style={{ paddingTop: 75 }}>
      <Navbar
        className="shadow-sm justify-content-center"
        bg="light"
        variant="light"
        fixed="bottom"
      >
        <Navbar.Text>
          © 2023{' '}
          <a
            href="https://www.linkedin.com/in/asmit-dixit-a35981182/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Asmit Dixit
          </a>
        </Navbar.Text>
      </Navbar>
    </footer>
  );
};

export default Footer;
