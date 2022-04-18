import { LogoBig } from '../components';
import { Link } from 'react-router-dom';

import fondo from '../assets/images/fondo2.svg';
import Fondo2 from '../components/Fondo2.js';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import { animationOne, transition } from '../animations';

const Landing = () => {
   return (
      <motion.div
         variants={animationOne}
         initial="out"
         animate="in"
         exit="out"
         transition={transition}
      >
         <Wrapper>
            <nav>
               <LogoBig />
            </nav>

            <div className="container page">
               <div className="info">
                  <h1>
                     soci<span>oil</span> media
                  </h1>
                  <p>
                     Tus recetas, posts y el estilo de vida que estabas
                     buscando.
                  </p>

                  <motion.div
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 1.05 }}
                     transition={{
                        type: 'spring',
                        stiffness: 150,
                        ease: 'easeInOut',
                     }}
                  >
                     <Link to="/register" className="btn btn-hero">
                        Login / Registro
                     </Link>
                  </motion.div>
               </div>

               {/* <img
                  src={fondo}
                  alt="fondo de la página"
                  className="img main-img"
               /> */}
               <div className="main-img">
                  <Fondo2 className="img" />
               </div>
            </div>
         </Wrapper>
      </motion.div>
   );
};

/* 
type: "spring", stiffness: 100


<motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  />


  whileHover={{ scale: 2, rotate: 90 }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: "100%"
      }}
*/

export default Landing;

// const StyledLink = styled(Link)`
//    justify-self: start;
// `;

const Wrapper = styled.main`
   .info {
      display: flex;
      flex-direction: column;
      align-items: start;
   }
   nav {
      width: var(--fluid-width);
      max-width: var(--max-width);
      margin: 0 auto;
      height: var(--nav-height);
      display: flex;
      align-items: center;
   }
   .page {
      min-height: calc(100vh - var(--nav-height));
      display: grid;
      align-items: center;
      justify-content: center; ////
      margin-top: -3rem;
   }
   h1 {
      font-weight: 700;
      span {
         color: var(--primary-500);
      }
   }
   p {
      color: var(--grey-600);
   }
   .main-img {
      display: none;
   }
   .logo {
      max-width: 25vh;
      position: absolute;
      top: 10vh;
   }
   @media (min-width: 992px) {
      .page {
         grid-template-columns: 1fr 1fr;
         column-gap: 3rem;
      }
      .main-img {
         display: block;
         width: 100%;
      }
   }
`;
