import React from 'react';
import Container from '../../Components/Container/Container';
import Logo from '../../Components/logo/Logo';

const Footer = () => {
    return (
        <>
        <div className='bg-base-200 rounded-tl-[60px] rounded-tr-[60px]'>
        <Container>
        <footer className="footer sm:footer-horizontal sm:footer-center  text-base-content p-10">
  <aside>
    <div className='ml-4'>
    <Logo></Logo>
    </div>
    
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title text-primary font-bold">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title text-primary font-bold">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title text-primary font-bold">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
</Container>
</div>
        </>
    );
};

export default Footer;