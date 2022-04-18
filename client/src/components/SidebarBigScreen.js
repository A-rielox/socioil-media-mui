import styled from 'styled-components';
import NavLinks from './NavLinks';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const SidebarBigScreen = () => {
   const { showSidebar } = useAppContext();

   return (
      <Wrapper>
         <div
            className={
               showSidebar
                  ? 'sidebar-container '
                  : 'sidebar-container show-sidebar'
            }
         >
            <div className="content">
               <header>
                  <Logo />
               </header>

               <NavLinks />
            </div>
         </div>
      </Wrapper>
   );
};

export default SidebarBigScreen;

const Wrapper = styled.aside`
   display: none;

   @media (min-width: 992px) {
      display: block;
      box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

      .logo {
         margin-right: 30px;
         max-width: 120px;
      }

      .sidebar-container {
         /* background: var(--white); */
         background: var(--grey-50);
         min-height: 100vh;
         height: 100%;
         width: 250px;
         margin-left: -250px;
         transition: var(--transition);
      }
      .content {
         position: sticky;
         top: 0;
      }
      .show-sidebar {
         margin-left: 0;
      }
      header {
         height: 6rem;
         display: flex;
         align-items: center;
         padding-left: 2.5rem;
      }
      .nav-links {
         padding-top: 2rem;
         display: flex;
         flex-direction: column;
      }

      .nav-link {
         display: flex;
         align-items: center;
         color: var(--grey-text);
         padding: 1rem 0;
         padding-left: 2.5rem;
         text-transform: capitalize;
         transition: var(--transition);
      }
      .nav-link:hover {
         background: var(--primary-300);
         padding-left: 3rem;
         color: var(--white);
      }
      .nav-link:hover .icon {
         color: var(--white);
      }
      .icon {
         font-size: 1.5rem;
         margin-right: 1rem;
         display: grid;
         place-items: center;
         transition: var(--transition);

         color: var(--primary-500);
      }
      .active {
         background: var(--primary-500);
         color: var(--white);
      }
      .active .icon {
         color: var(--white);
      }
   }
`;
