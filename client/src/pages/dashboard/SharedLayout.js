import { useAppContext } from '../../context/appContext';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { SidebarSmallScreen, SidebarBigScreen, Navbar } from '../../components';

const SharedLayout = () => {
   const { user } = useAppContext();

   return (
      <Wrapper>
         <main className="dashboard">
            <SidebarSmallScreen />
            <SidebarBigScreen />

            <div>
               <Navbar />

               <div className="dashboard-page">
                  <Outlet />
               </div>
            </div>
         </main>
      </Wrapper>
   );
};
// el <Outlet /> es para q se rendericen las pags nesteadas

export default SharedLayout;

const Wrapper = styled.section`
   .dashboard {
      display: grid;
      grid-template-columns: 1fr;
   }
   .dashboard-page {
      width: 90vw;
      margin: 0 auto;
      padding: 2rem 0;
   }
   @media (min-width: 992px) {
      .dashboard {
         grid-template-columns: auto 1fr;
      }
      .dashboard-page {
         width: 90%;
      }
   }
`;
